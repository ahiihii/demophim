import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest, 
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const res = await fetch(`https://phimapi.com/phim/${slug}`, {
      next: { revalidate: 3600 } // Tự động cache lại sau 1 tiếng
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch from API' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
