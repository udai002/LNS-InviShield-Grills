import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
    imageUrl: string;
    locationId: mongoose.Types.ObjectId;
    category: string;
}

const GallerySchema: Schema = new Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        locationId: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
            required: false,
        },
        category: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);