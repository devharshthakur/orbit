'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Download, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CompressedFileState {
  url: string;
  filename: string;
}

export default function UploadPage() {
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [compressedFile, setCompressedFile] = useState<CompressedFileState | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 5,
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop: (acceptedFiles) => {
      setStagedFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const removeFile = (file: File) => {
    setStagedFiles((prev) => prev.filter((f) => f !== file));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setError(null);
    const formData = new FormData();
    stagedFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('api/compress', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      let contentType = response.headers['content-type'] as string | undefined;
      if (!contentType) {
        contentType = 'application/octet-stream';
      }

      let filename = 'compressed.pdf';
      if (contentType.includes('zip')) {
        filename = 'compressed_files.zip';
      }

      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      setCompressedFile({ url, filename });
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Failed to compress files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex max-h-screen flex-col items-center justify-start bg-background p-6 pt-40">
      <h1 className="mb-6 text-4xl font-bold">Upload PDFs</h1>

      <div className="w-full max-w-3xl space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Instructions:</h2>
          <ol className="list-inside list-decimal space-y-1 text-base">
            <li>Drag and drop your PDF files into the area below, or click to select files.</li>
            <li>You can upload up to 5 PDF files, each with a maximum size of 50MB.</li>
            <li>Once you've selected your files, they will appear in the "Staged Files" section.</li>
            <li>Click the "Upload and Compress" button to start the compression process.</li>
            <li>After compression, a download button will appear for your compressed file(s).</li>
          </ol>
        </div>

        <div
          {...getRootProps()}
          className="cursor-pointer rounded-lg border-4 border-dashed border-primary p-10 text-center transition-colors hover:border-primary/70"
        >
          <Input {...getInputProps()} />
          <p className="text-xl font-semibold">Drag &amp; drop PDF files here, or click to select files</p>
          <p className="mt-3 text-base text-muted-foreground">Max 5 files, 50MB each</p>
        </div>

        {stagedFiles.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Staged Files:</h2>
            <ul className="space-y-3">
              {stagedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between rounded-lg bg-accent p-3 text-base">
                  <span className="max-w-[80%] truncate">{file.name}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file)}>
                    <X className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stagedFiles.length > 0 && !compressedFile && (
          <Button onClick={handleUpload} disabled={isUploading} size="lg" className="w-full text-base">
            <Upload className="mr-2 h-5 w-5" />
            {isUploading ? 'Uploading...' : 'Upload and Compress'}
          </Button>
        )}

        {compressedFile && (
          <Button asChild size="lg" className="w-full text-base">
            <a href={compressedFile.url} download={compressedFile.filename}>
              <Download className="mr-2 h-5 w-5" />
              Download {compressedFile.filename}
            </a>
          </Button>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-base">{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
