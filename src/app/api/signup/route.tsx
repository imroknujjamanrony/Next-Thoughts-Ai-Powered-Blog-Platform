// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { name, email, password, confirmPassword } = body;

//   // Basic validation
//   if (!name || !email || !password || !confirmPassword) {
//     return NextResponse.json(
//       { message: "all fields are required" },
//       { status: 400 }
//     );
//   }


//   if (password !== confirmPassword) {
//         return NextResponse.json(
//         { message: "passwords do not match" },
//         { status: 400 }
//         );
//     }

//     //now time to user data to database
    
//     // Simulate a successful signup
//     return NextResponse.json(
//         { message: "signup successful" },
//         { status: 200 }
//     );
// }
    
    
import {dbConnect} from '@/lib/dbConnect'
import User from '@/models/userModel'
import { NextResponse,NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

dbConnect()

export async function POST(request: NextRequest) {
  try {
    const reqBody=request.json();
    const {name,email,password,confirmPassword}=reqBody;
    // Basic validation
    console.log(reqBody)
    const user=await User.find({email})
    if(user){
      return NextResponse.json({message: "User already exists"}, { status: 400 });
    }
    
  } catch (error) {
    return NextResponse.json({error: error.message}, { status: 500 });
  }
}
