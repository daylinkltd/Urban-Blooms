import { connectToDB } from "@/app/lib/utils";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

const ITEMS_PER_PAGE = parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE, 10);

export async function POST(request) {
    const { username, email, password, phone, isAdmin, isActive, address } = await request.json();
    await connectToDB();
    await User.create({ username, email, password, phone, isAdmin, isActive, address });
    return NextResponse.json({ message: "User Created " }, { status: 201 });
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    await connectToDB();
    const regex = new RegExp(q, "i");
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
        .limit(ITEMS_PER_PAGE)
        .skip(ITEMS_PER_PAGE * (page - 1));

    return NextResponse.json({ count, users });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectToDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}
