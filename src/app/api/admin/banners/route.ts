import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Banner from '@/models/Banner';
import { optimizeBase64Image } from '@/lib/image-utils';

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

    // Automatically optimize images if present
    if (data.image) {
      data.image = await optimizeBase64Image(data.image);
    }
    if (data.img) {
      data.img = await optimizeBase64Image(data.img);
    }
    
    await dbConnect();
    const newBanner = await Banner.create(data);
    
    return NextResponse.json(newBanner, { status: 201 });
  } catch (error: any) {
    console.error('Banner Creation Error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json({ 
        error: 'Validation Failed', 
        details: Object.values(error.errors).map((err: any) => err.message) 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Failed to create banner', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...updates } = await req.json();

    if (updates.image) {
      updates.image = await optimizeBase64Image(updates.image);
    }
    if (updates.img) {
      updates.img = await optimizeBase64Image(updates.img);
    }

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
