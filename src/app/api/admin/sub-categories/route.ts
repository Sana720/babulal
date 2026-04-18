import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SubCategory from '@/models/SubCategory';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    
    let filter = {};
    if (categoryId) {
      filter = { category: categoryId };
    }
    
    const subCategories = await SubCategory.find(filter).sort({ order: 1 });
    return NextResponse.json(subCategories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sub-categories' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();
    
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    const newSubCategory = await SubCategory.create(data);
    
    // Increment subCategoryCount on Parent Category
    const Category = (await import('@/models/Category')).default;
    await Category.findByIdAndUpdate(data.category, { $inc: { subCategoryCount: 1 } });

    return NextResponse.json(newSubCategory, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A sub-category with this name already exists in this category' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create sub-category' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    await dbConnect();
    
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    
    if (!updatedSubCategory) {
      return NextResponse.json({ error: 'Sub-category not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedSubCategory);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update sub-category' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await dbConnect();

    const subCat = await SubCategory.findById(id);
    if (subCat) {
      const Category = (await import('@/models/Category')).default;
      await Category.findByIdAndUpdate(subCat.category, { $inc: { subCategoryCount: -1 } });
      await SubCategory.findByIdAndDelete(id);
    }
    
    return NextResponse.json({ message: 'Sub-category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sub-category' }, { status: 500 });
  }
}
