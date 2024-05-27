import { connectToDB } from "@/app/lib/utils";
import { User } from "@/models/user";
import { NextResponse } from "next/server";



export async function PUT(request, {params}) {
    const {id} = params;
    const {newUsername: username, newEmail: email,newPassword: password,newPhone: phone,newIsAdmin: isAdmin,newIsActive: isActive,newAddress: address} = await request.json();
    await connectToDB();
    await User.findByIdAndUpdate(id, {username, email, password, phone, isAdmin, isActive, address});
    return NextResponse.json({message: "User Updated"}, {status: 200})
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectToDB();
    const user = await User.findOne({_id: id});
    return NextResponse.json({user }, {status: 200})
}