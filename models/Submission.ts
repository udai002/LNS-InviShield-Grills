import mongoose, { Schema, Document } from 'mongoose';

interface ISubmission extends Document {
    name: string;
    email: string;
    phone: string;
    message: string;
    email_sent: boolean;
}

const SubmissionSchema = new Schema<ISubmission>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        message: {
            type: String,
        },
        email_sent: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);