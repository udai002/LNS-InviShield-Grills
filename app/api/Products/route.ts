import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs'
import Product from "@/models/product";
import { url } from "inspector";
import mongoose from "mongoose";

// post product 
export async function POST(req:Request){
    try{
        await connectDB()

        const formData = await req.formData()

        const file = formData.get('product-image') as File
        const title = formData.get("title") as string 
        const description = formData.get("description") as string 
        const category = formData.get('category') as string 
        const label = formData.get('label') as string 
        const price =  formData.get('price') as any 

        if(!file || !title || !description){
            return NextResponse.json(
                {error:"All field are mandatory"}, 
                {status:404}
            )
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const uploadDir = path.join(process.cwd() , 'public/uploads')

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir , {recursive:true})
        }

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath , buffer)

        const imageUrl = `/uploads/${fileName}`

        const product = await Product.create({
            imageUrl , 
            title , 
            description , 
            category , 
            label , 
            price
        })

        return NextResponse.json({
            message:"image uploaded successfully", 
            data:product
        })

    } catch (error) {
        console.error(error);
    
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
      }
}

//get product 
export async function GET(req:Request){
    try{
        await connectDB()
        const products= await Product.find({})
        return NextResponse.json({
            data:products
        })
    } catch (error) {
        console.error(error);
    
        return NextResponse.json(
          { error: 'Internal server error'  , message:error},
          { status: 500 }
        );
      }
}

//delete product 
export async function DELETE(req:Request){
    try{
        await connectDB()
        // Postman test URL example:
        // DELETE http://localhost:3000/api/Products?productId=PRODUCT_ID

        const { searchParams } = new URL(req.url)
        const productId = searchParams.get('productId')

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return NextResponse.json({ error: 'Invalid or missing productId' }, { status: 400 })
        }

        await Product.deleteOne({ _id: productId })
        return NextResponse.json({
            message:"product deleted successfully"
        })

    }catch (error) {
        console.error(error);
    
        return NextResponse.json(
          { error: 'Internal server error'  , message:error},
          { status: 500 }
        );
      }
}

//edit product 
