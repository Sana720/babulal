import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

/**
 * POST /api/leads
 * Handles:
 * 1. "Become a Dealer" form submissions
 * 2. WhatsApp click tracking (Source: WHATSAPP)
 * 3. Inquiry form submissions per vertical
 */
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // Verification: Minimum required fields
    if (!data.name || !data.mobile || !data.businessVertical) {
      return NextResponse.json(
        { error: 'Missing required fields: name, mobile, or businessVertical' },
        { status: 400 }
      );
    }

    // Create the lead in MongoDB
    const newLead = await Lead.create({
      name: data.name,
      email: data.email || '',
      mobile: data.mobile,
      city: data.city || '',
      state: data.state || '',
      interest: data.interest || 'General Inquiry',
      businessVertical: data.businessVertical.toLowerCase(),
      source: data.source || 'FORM',
      status: 'NEW',
      notes: data.notes || '',
    });

    return NextResponse.json(
      { message: 'Lead captured successfully', id: newLead._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
