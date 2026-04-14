import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

/**
 * GET /api/products
 * Public API to fetch active products with optional filtering by:
 * - vertical (e.g., textiles, honda)
 * - category
 * - slug (for specific lookup)
 * - isFeatured
 */
export async function GET(req: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const vertical = searchParams.get('vertical');
    const category = searchParams.get('category');
    const isFeatured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const query: any = { isActive: true };
    
    if (vertical) query.businessVertical = vertical.toLowerCase();
    if (category) query.category = category;
    if (isFeatured === 'true') query.isFeatured = true;

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error('Public Product Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
