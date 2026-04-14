import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

const DUMMY_PRODUCTS = [
  {
    name: 'Royal Banarasi Silk Saree',
    slug: 'royal-banarasi-silk-saree',
    businessVertical: 'textiles',
    category: 'Saree',
    description: 'Exquisite hand-woven Banarasi silk saree with gold zari work.',
    images: ['/silk_saree_royal.png'],
    isFeatured: true,
    isActive: true,
    attributes: {
      fabric: 'Pure Silk',
      work: 'Zari',
      color: 'Crimson Red'
    },
    seo: {
      metaTitle: 'Royal Banarasi Silk Saree - Babulal Premkumar',
      metaDescription: 'Buy luxury Banarasi silk sarees at wholesale prices.'
    }
  },
  {
    name: 'Bridal Heavily Embroidered Lehenga',
    slug: 'bridal-embroidered-lehenga',
    businessVertical: 'textiles',
    category: 'Lehenga',
    description: 'Heavy designer lehenga for bridal wear with heritage motifs.',
    images: ['/bridal_luxury.png'],
    isFeatured: true,
    isActive: true,
    attributes: {
      fabric: 'Velvet',
      work: 'Hand Embroidery',
      color: 'Maroon'
    }
  },
  {
    name: 'Honda Activa 6G',
    slug: 'honda-activa-6g',
    businessVertical: 'honda',
    category: 'Scooters',
    description: 'The reliable legend, now with more features.',
    images: ['/vertical_honda.png'],
    isFeatured: true,
    isActive: true,
    attributes: {
      engine: '110cc',
      mileage: '50 kmpl',
      fuel: 'Petrol'
    }
  }
];

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    // Optional: Clear existing products (Use with caution)
    // await Product.deleteMany({});
    
    const products = await Product.insertMany(DUMMY_PRODUCTS);
    
    return NextResponse.json({ 
      message: 'Database seeded with sample products successfully!',
      count: products.length,
      verticals: ['textiles', 'honda']
    });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
