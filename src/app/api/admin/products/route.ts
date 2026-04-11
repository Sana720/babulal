import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

/**
 * GET /api/admin/products
 * Retrieves products across all business verticals. Supports filtering by vertical and status.
 */
export async function GET(req: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const vertical = searchParams.get('vertical');
    const category = searchParams.get('category');
    const isActive = searchParams.get('active');
    
    // Construct dynamic query
    const query: any = {};
    if (vertical) query.businessVertical = vertical.toLowerCase();
    if (category) query.category = category;
    if (isActive !== null) query.isActive = isActive === 'true';

    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error('Product Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/products
 * Universal Product Creation Endpoint for all 5 business verticals.
 */
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // Verification of core fields
    if (!data.name || !data.slug || !data.businessVertical || !data.category) {
      return NextResponse.json(
        { error: 'Missing core fields: name, slug, businessVertical, or category' },
        { status: 400 }
      );
    }

    // Auto-formatting name & businessVertical
    const formattedData = {
      ...data,
      businessVertical: data.businessVertical.toLowerCase(),
      slug: data.slug.toLowerCase().replace(/\s+/g, '-'), // Basic slug verification
    };

    const newProduct = await Product.create(formattedData);

    return NextResponse.json(
      { message: 'Product created successfully', id: newProduct._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Product Creation Error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug must be unique.' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
