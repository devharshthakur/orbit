'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Download, Upload, X, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import { DropzoneRootProps } from 'react-dropzone';
import { HTMLMotionProps } from 'motion/react';

interface CompressedFileState {
  url: string;
  filename: string;
}

// Create a type intersection for the combined props
type DropzoneMotionProps = DropzoneRootProps & HTMLMotionProps<'div'>;

export default function UploadPage() {
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [compressedFile, setCompressedFile] = useState<CompressedFileState | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
    setUploadProgress(0);

    const formData = new FormData();
    stagedFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('/api/compress', formData, {
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          setUploadProgress(percentCompleted);
        },
      });

      const contentType = response.headers['content-type'];
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/["']/g, '')
        : 'compressed.pdf';

      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);

      setCompressedFile({ url, filename });

      // Calculate total size before and after compression
      const totalSizeBefore = stagedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024);
      const totalSizeAfter = blob.size / (1024 * 1024);

      // Save compression history
      await axios.post('/api/dashboard/history', {
        fileName: filename,
        sizeBefore: parseFloat(totalSizeBefore.toFixed(2)),
        sizeAfter: parseFloat(totalSizeAfter.toFixed(2)),
      });

      setStagedFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Failed to compress files. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Filter out all conflicting event handlers
  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...dropzoneProps
  } = getRootProps();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/10 p-6 dark:from-background dark:via-background dark:to-primary/5">
      <div className="w-full max-w-3xl space-y-10">
        <h1 className="text-center text-5xl font-bold tracking-tight text-primary">PDF Compression</h1>

        <div className="space-y-4 rounded-lg bg-white/50 p-8 backdrop-blur-sm dark:bg-gray-700">
          <h2 className="text-2xl font-semibold text-primary">How it works</h2>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Upload up to 5 PDF files (max 50MB each)</li>
            <li>We'll compress your files to reduce their size</li>
            <li>Download your compressed PDF(s)</li>
          </ol>
        </div>

        <motion.div
          {...dropzoneProps}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/10 dark:bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-white/50 dark:hover:bg-gray-950/50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Input {...getInputProps()} />
          <FileText className="mx-auto mb-4 h-16 w-16 text-primary" />
          <p className="text-2xl font-semibold text-primary">Drag &amp; drop PDF files here</p>
          <p className="mt-2 text-sm text-muted-foreground">or click to select files</p>
        </motion.div>

        <AnimatePresence>
          {stagedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-lg bg-white/50 p-6 backdrop-blur-sm dark:bg-gray-950/50"
            >
              <h2 className="mb-4 text-xl font-semibold text-primary">Files to compress:</h2>
              <ul className="space-y-2">
                {stagedFiles.map((file, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between rounded-lg bg-secondary p-3 text-sm"
                  >
                    <span className="max-w-[80%] truncate">{file.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {stagedFiles.length > 0 && !compressedFile && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Button onClick={handleUpload} disabled={isUploading} size="lg" className="w-full">
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-bounce" />
                  Compressing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Compress Files
                </>
              )}
            </Button>
          </motion.div>
        )}

        {isUploading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <Progress value={uploadProgress} className="h-2 w-full" />
            <p className="text-center text-sm text-muted-foreground">{uploadProgress}% complete</p>
          </motion.div>
        )}

        {compressedFile && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <p className="mb-4 text-xl font-semibold text-primary">Compression Complete!</p>
            <Button asChild size="lg" className="w-full">
              <a href={compressedFile.url} download={compressedFile.filename}>
                <Download className="mr-2 h-4 w-4" />
                Download Compressed File
              </a>
            </Button>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="text-center">
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
