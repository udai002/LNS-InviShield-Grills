import { connectDB } from "@/lib/mongodb";
import Location from "@/models/Location";
import { findDimensionValueType } from "framer-motion";
import { request } from "http";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// get paticular location details
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    console.log("🔥 HIT [id] ROUTE");

    await connectDB();

    // ✅ FIX: await params
    const { id } = await context.params;

    console.log("ID:", id);

    // ✅ Optional validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    const location = await Location.findById(id);

    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(location);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


//delete location 
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid location ID' },
        { status: 400 }
      );
    }

    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Location deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
// update location 

export async function PUT(req:Request ,context: { params: Promise<{ id: string }> }){
     try {
    await connectDB();

    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: 'Enter valid data to update' },
        { status: 400 }
      );
    }

    const { id } = await context.params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid location ID' },
        { status: 400 }
      );
    }

    const { state, city, area, pincode, description } = body;

    // ✅ Build dynamic update object (only update provided fields)
    const updateData: any = {};

    if (state !== undefined) updateData.state = state;
    if (city !== undefined) updateData.city = city;
    if (area !== undefined) updateData.area = area;
    if (pincode !== undefined) updateData.pincode = pincode;
    if (description !== undefined) updateData.description = description;

    // ❌ If nothing to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields provided to update' },
        { status: 400 }
      );
    }

    // ✅ Update
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } // return updated doc
    );

    if (!updatedLocation) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Location updated successfully',
      data: updatedLocation,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Internal server error in updating location' },
      { status: 500 }
    );
  }
}