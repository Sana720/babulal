import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

/**
 * GET - List all categories
 * POST - Create a new category
 */
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ order: 1 });
    console.log('--- DB FETCH CATEGORIES ---');
    console.log(categories.map(c => ({ name: c.name, curated: c.isCurated, vertical: c.parentVertical })));
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('POST CATEGORY DATA:', data);
    await dbConnect();
    
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    const newCategory = await Category.create(data);
    console.log('CREATED CATEGORY:', newCategory);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A category with this name already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

/**
 * PATCH - Update category details (toggle status, etc)
 */
export async function PATCH(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    console.log('PATCH CATEGORY ATTEMPT:', { id, updates });
    await dbConnect();
    
    // Normalize properties for database durability
    const cleanUpdates: any = {};
    if (updates.name) cleanUpdates.name = updates.name;
    if (updates.slug) cleanUpdates.slug = updates.slug;
    if (updates.image !== undefined) cleanUpdates.image = updates.image;
    if (updates.showInHeader !== undefined) cleanUpdates.showInHeader = Boolean(updates.showInHeader);
    if (updates.isCurated !== undefined) cleanUpdates.isCurated = Boolean(updates.isCurated);
    if (updates.status) cleanUpdates.status = updates.status;
    if (updates.order !== undefined) cleanUpdates.order = Number(updates.order);
    if (updates.parentVertical) cleanUpdates.parentVertical = updates.parentVertical.toLowerCase();

    // Use findOneAndUpdate with an atomic $set for 100% reliable persistence
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      { $set: cleanUpdates },
      { new: true, runValidators: false }
    );

    console.log('ATOMIC UPDATE RESULT:', updatedCategory);
    
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error('PATCH ERROR:', error);
    return NextResponse.json({ error: error.message || 'Failed to update category' }, { status: 500 });
  }
}

/**
 * DELETE - Remove category
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await dbConnect();
    
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
