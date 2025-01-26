import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompressService {
  async compressPdf(inputFilePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const outputFilePath = path.join(process.cwd(), 'uploads', `compressed-${uuidv4()}.pdf`);

        const args = [
          '-sDEVICE=pdfwrite',
          '-dCompatibilityLevel=1.4',
          '-dPDFSETTINGS=/ebook',
          '-dNOPAUSE',
          '-dQUIET',
          '-dBATCH',
          `-sOutputFile=${outputFilePath}`,
          inputFilePath,
        ];

        const gs = spawn('gs', args);

        gs.on('error', (err) => {
          reject(new InternalServerErrorException(`Ghostscript error: ${err.message}`));
        });

        gs.on('close', (code) => {
          if (code === 0) {
            resolve(outputFilePath);
          } else {
            reject(new InternalServerErrorException(`Ghostscript exited with code ${code}`));
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async createZip(filePaths: string[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const archive = archiver('zip', { zlib: { level: 9 } });
      const chunks: Buffer[] = [];

      archive.on('error', (err) => reject(err));
      archive.on('data', (data) => chunks.push(data));
      archive.on('end', () => resolve(Buffer.concat(chunks)));

      filePaths.forEach((filePath) => {
        archive.file(filePath, { name: path.basename(filePath) });
      });

      archive.finalize();
    });
  }
}
