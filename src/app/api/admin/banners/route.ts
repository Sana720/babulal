import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Banner from '@/models/Banner';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const vertical = searchParams.get('vertical');
    
    await dbConnect();
    const query = vertical ? { vertical: vertical.toUpperCase() } : {};
    const banners = await Banner.find(query).sort({ order: 1 });
    
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();
    const newBanner = await Banner.create(data);
    return NextResponse.json(newBanner, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    await dbConnect();
    const updatedBanner = await Banner.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json(updatedBanner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await dbConnect();
    await Banner.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Banner deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
