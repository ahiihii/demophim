import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ slug: string }> } // params bây giờ phải là Promise
) {
  // Phải await params để lấy dữ liệu
  const { slug } = await params;

  try {
    const res = await fetch(`https://phimapi.com/phim/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
