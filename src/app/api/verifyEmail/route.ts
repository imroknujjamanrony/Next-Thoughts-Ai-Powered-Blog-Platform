
import {dbConnect} from '@/lib/dbConnect'
import User from '@/models/userModel'
import { NextResponse,NextRequest } from 'next/server'


dbConnect()

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        const {token}=reqBody;
console.log(token)
       
const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})


if(!user){
    return NextResponse.json({error: "invalid token"},{status:400})
}
console.log(user)

user.isVerified=true
user.verifyToken=undefined
user.verifyTokenExpiry=undefined

const saveVerify=await user.save()

return NextResponse.json({message:"email verified successfully",success:true})

    } catch (error) {
        return NextResponse.json({error: error.message},{status:500})
    }
}