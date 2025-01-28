import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  try {
    // Forward the request to NestJS backend
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/compress`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    // Extract content type and handle default case
    const contentType = (response.headers['Content-Type'] as string) || 'application/octet-stream';

    // Determine file type and set appropriate filename
    const isZip = contentType.includes('application/zip');
    const filename = isZip ? 'compressed_files.zip' : 'compressed.pdf';

    // Construct content disposition
    const contentDisposition =
      (response.headers['Content-Disposition'] as string) || `attachment; filename="${filename}"`;

    // Return response with proper headers
    return new NextResponse(response.data, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
        'Cache-Control': 'no-cache',
        'Content-Length':
          response.headers['Content-Length']?.toString() || Buffer.from(response.data).length.toString(),
      },
    });
  } catch (error: any) {
    console.error('Error compressing files:', error.response?.data || error.message);

    // Enhanced error response
    const errorMessage = error.response?.data?.message || 'Failed to compress files';
    const statusCode = error.response?.status || 500;

    return NextResponse.json(
      { error: errorMessage },
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
