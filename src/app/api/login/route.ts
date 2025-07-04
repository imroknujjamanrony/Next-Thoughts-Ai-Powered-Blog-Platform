import { signIn } from 'next-auth/react';
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


dbConnect()

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
    const {email,password}=reqBody;
    //validation
    console.log(reqBody)
    const user=await User.findOne({email})
    if(!user){
        return NextResponse.json({error:'user does not exist'},{status:400})
    }
    const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword){
        return NextResponse.json({error:"check your password"},{status:400})
    }

    const tokenData={
        id:user._id,
        name:user.name,
        email:user.email
    }

  const token=await  jwt.signIn(tokenData,process.env.TOKEN_SECRET)

    } catch (error:any) {
        
        return NextResponse.json({error:error.message},{status:500})
    }
    
}