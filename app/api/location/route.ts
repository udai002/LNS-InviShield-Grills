import { connectDB } from "@/lib/mongodb";
import Location from "@/models/Location";
import { NextResponse } from "next/server";

//post locations
export async function POST(req:Request){
    console.log("this is running")
    await connectDB();

    const body = await req.json();

    const location = await Location.create(body)

    return NextResponse.json(location)
}

//get location for admin panel
export async function GET(){
     await connectDB();
    const location = await Location.find();

    return NextResponse.json(location)
}