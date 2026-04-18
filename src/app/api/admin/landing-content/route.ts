import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import LandingContent from '@/models/LandingContent';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const vertical = searchParams.get('vertical');
    
    await dbConnect();
    if (vertical) {
      const content = await LandingContent.findOne({ vertical: vertical.toUpperCase() });
      return NextResponse.json(content || {});
    }
    
    const allContent = await LandingContent.find({});
    return NextResponse.json(allContent);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();
    // Use upsert to handle both create and update
    const content = await LandingContent.findOneAndUpdate(
      { vertical: data.vertical.toUpperCase() },
      data,
      { upsert: true, new: true }
    );
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
