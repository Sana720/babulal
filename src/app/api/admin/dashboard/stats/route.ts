import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import Product from '@/models/Product';

export async function GET() {
  try {
    await dbConnect();

    // Fetch counts in parallel for performance
    const [totalLeads, totalProducts, latestLeads] = await Promise.all([
      Lead.countDocuments(),
      Product.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Calculate monthly leads (leads from the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyLeads = await Lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    return NextResponse.json({
      stats: {
        totalLeads,
        totalProducts,
        monthlyLeads,
        totalCategories: 18, // Hardcoded for now as categories are static constants
        totalLocations: 2, // Ranchi & Chas
      },
      latestLeads
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
