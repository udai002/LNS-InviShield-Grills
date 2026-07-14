import { NextResponse } from 'next/server';
import Submission from '@/models/Submission';
import { connectDB } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, phone, message } = body;

    // ✅ Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // ✅ Email format validation (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // ✅ Phone validation (basic length check)
    if (phone.length < 8) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const submission = await Submission.create({
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json(
      {
        message: 'Submission created successfully',
        data: submission,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(){
    try{
        const submissions = await Submission.find()
        return NextResponse.json(submissions)
    }catch(error){
        return NextResponse.json({error:"Internal server error while getting submission data"} , {status:500})
    }
}