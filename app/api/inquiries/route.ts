import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, addInquiry, deleteInquiry, markInquiryRead } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const inquiries = getInquiries();
    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const newInquiry = addInquiry({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : '',
      inquiryType: inquiryType ? String(inquiryType).trim() : 'General Inquiry',
      message: String(message).trim(),
      read: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully transmitted to Chef Bijaya Ghimire.',
        inquiry: newInquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    const updated = deleteInquiry(id);
    return NextResponse.json(
      { success: true, message: 'Inquiry deleted successfully', inquiries: updated },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    const updated = markInquiryRead(id);
    return NextResponse.json(
      { success: true, message: 'Inquiry marked as read', inquiries: updated },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}
