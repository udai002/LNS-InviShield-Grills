import mongoose, { Schema, Document } from 'mongoose';

interface ILocation extends Document {
    state?: string;
    city: string;
    area: string;
    pincode?: string;
    description?: string;
}

const LocationSchema: Schema = new Schema(
    {
        state: { type: String, default: null },
        city: { type: String, required: true },
        area: { type: String, required: true },
        pincode: { type: String, default: null },
        description: { type: String, default: null },
    },
    { timestamps: true }
);

// ✅ FIX HERE
export default mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);