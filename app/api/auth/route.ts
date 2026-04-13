import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { connectDB } from "@/lib/mongodb";
// adjust path to your db connection

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: "No token provided" }, { status: 401 })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }

        const admin = await Admin.findById(decoded.userId).select('-password')
        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 })
        }

        return NextResponse.json({
            admin: {
                id: admin._id,
                email: admin.email,
                username: admin.username,
                createdAt: admin.createdAt,
            }
        }, { status: 200 })

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }
        if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ error: "Token expired" }, { status: 401 })
        }
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}

// ── POST /api/admin/login ─────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        await connectDB()
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
        }

        const findUser = await Admin.findOne({ email })
        if (!findUser) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const isPasswordValid = await bcrypt.compare(password, findUser.password)
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const token = jwt.sign(
            {
                userId: findUser._id.toString(),
                email: findUser.email,
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        return NextResponse.json({
            message: "Login successful",
            token,
            admin: {
                id: findUser._id,
                email: findUser.email,
                username: findUser.username,
            }
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Internal Error" , err:error }, { status: 500 })
    }
}

// ── PUT /api/admin/login — create new admin ───────────────────────────────────
export async function PUT(req: Request) {
    try {
        await connectDB()
        const { email, password, username } = await req.json()

        if (!email || !password || !username) {
            return NextResponse.json({ error: "Email, password and username are required" }, { status: 400 })
        }

        const existingAdmin = await Admin.findOne({ email })
        if (existingAdmin) {
            return NextResponse.json({ error: "Admin with this email already exists" }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin = await Admin.create({
            email,
            password: hashedPassword,
            username,
        })

        const token = jwt.sign(
            {
                userId: newAdmin._id.toString(),
                email: newAdmin.email,
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        return NextResponse.json({
            message: "Admin created successfully",
            token,
            admin: {
                id: newAdmin._id,
                email: newAdmin.email,
                username: newAdmin.username,
            }
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}