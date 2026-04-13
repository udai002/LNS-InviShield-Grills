import Gallery from "@/models/Gallery";
import Location from "@/models/Location";
import Submission from "@/models/Submission";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const submissions = await Submission.countDocuments();
        const locations = await Location.countDocuments();
        const galleries = await Gallery.countDocuments();

        return NextResponse.json({
            submissions,
            locations,
            galleries
        });
    }catch(error){
        return NextResponse.json({error:"Something went wrong"} , {status:500})
    }
}