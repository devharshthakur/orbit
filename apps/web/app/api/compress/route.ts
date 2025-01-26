import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  try {
    // Forward the request to NestJS backend (adjust URL accordingly)
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/compress`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'arraybuffer',
    });

    // Pass through the Content-Type and Content-Disposition from NestJS if available
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const contentDisposition =
      response.headers['content-disposition'] ||
      `attachment; filename=${contentType.includes('application/pdf') ? 'compressed.pdf' : 'compressed_files.zip'}`;

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (error) {
    console.error('Error compressing files:', error);
    return NextResponse.json({ error: 'Failed to compress files' }, { status: 500 });
  }
}
