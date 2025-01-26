import { Controller, Post, UseInterceptors, UploadedFiles, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, unlink } from 'fs';
import { CompressService } from './compress.service';

@Controller('compress')
export class CompressController {
  constructor(private readonly compressService: CompressService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5 }]))
  async compressFiles(@UploadedFiles() files: { files?: Express.Multer.File[] }, @Res() res: Response) {
    try {
      /* Input Validation */
      const uploadedFiles = files.files || [];
      if (!uploadedFiles.length) {
        throw new HttpException('No PDF files provided', HttpStatus.BAD_REQUEST);
      }

      /* PDF Compression */
      const compressedPaths: string[] = [];
      for (const file of uploadedFiles) {
        const compressedPath = await this.compressService.compressPdf(file.path);
        compressedPaths.push(compressedPath);
      }

      /* Multiple Files: Create and Send ZIP */
      if (compressedPaths.length > 1) {
        const zipBuffer = await this.compressService.createZip(compressedPaths);
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="compressed_files.zip"');
        res.send(zipBuffer);

        // Cleanup temporary files after response
        res.on('finish', () => {
          compressedPaths.forEach((p) => unlink(p, () => {}));
          uploadedFiles.forEach((f) => unlink(f.path, () => {}));
        });
      } else {
        /* Single File: Send PDF Directly */
        const pdfPath = compressedPaths[0];
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="compressed.pdf"');

        const readStream = createReadStream(pdfPath);
        readStream.pipe(res);

        // Cleanup temporary files after response
        res.on('finish', () => {
          unlink(pdfPath, () => {});
          uploadedFiles.forEach((f) => unlink(f.path, () => {}));
        });
      }
    } catch (error) {
      /* Error Handling */
      console.error('Compression Error:', error);
      throw new HttpException('Failed to compress files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
