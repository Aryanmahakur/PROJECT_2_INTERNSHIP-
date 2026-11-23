import fs from 'node:fs/promises';
import { NextResponse } from 'next/server';

const DEMO_HTML_PATH =
  'C:\\Users\\ARYAN MAHAKUR\\Desktop\\VS CODE\\PROJECT_2_INTERNSHIP\\Map\\index.html';

export async function GET() {
  try {
    const html = await fs.readFile(DEMO_HTML_PATH, 'utf-8');
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Failed to load Map/index.html:', error);
    return NextResponse.json(
      { error: 'Could not load demo page from Map/index.html' },
      { status: 500 }
    );
  }
}