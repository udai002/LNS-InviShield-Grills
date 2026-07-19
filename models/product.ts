import mongoose, { Schema, Document , model, models} from "mongoose";

export interface IProduct extends Document {
    title: string,
    description: string,
    price?: number,
    imageUrl: string,
    category: string,
    label: string,
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: false },
        imageUrl: { type: String, required: true },
        category: { type: String, required: true },
        label: { type: String, required: true },
    },
    { timestamps: true }
);

const Product =  models.Product || model<IProduct>("Product", ProductSchema);

export default Product;