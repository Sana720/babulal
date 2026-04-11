import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

/**
 * GET /api/admin/leads
 * Retrieves all captured leads. Supports filtering by businessVertical and status.
 */
export async function GET(req: Request) {
  try {
    await dbConnect();
    
    // Simple query parsing for vertical and status
    const { searchParams } = new URL(req.url);
    const vertical = searchParams.get('vertical');
    const status = searchParams.get('status');
    
    const query: any = {};
    if (vertical) query.businessVertical = vertical;
    if (status) query.status = status;

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    return NextResponse.json(leads, { status: 200 });
  } catch (error: any) {
    console.error('Lead Fetch Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/leads
 * Update lead status (e.g. CLOSED, IN_PROGRESS)
 */
export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    
    if (!data.id || !data.status) {
      return NextResponse.json(
        { error: 'Missing lead ID or status' },
        { status: 400 }
      );
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      data.id,
      { status: data.status, notes: data.notes },
      { new: true }
    );

    if (!updatedLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(updatedLead, { status: 200 });
  } catch (error: any) {
    console.error('Lead Update Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
