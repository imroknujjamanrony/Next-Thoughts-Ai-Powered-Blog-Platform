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
import { sendEmail } from '@/helpers/mailer'

dbConnect()

export async function POST(request: NextRequest) {
  try {
    const reqBody=await request.json();
    const {name,email,password}=reqBody;
    // Basic validation
    console.log(reqBody)
    const user=await User.find({email})
    if(user){
      return NextResponse.json({message: "User already exists"}, { status: 400 });
    }

    //hashing password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

  const newUser=  new User({
      name,
      email,
      password:hashedPassword,
      // confirmPassword:hashedPassword,
    });

    const savedUser=await newUser.save();
    console.log("User created:", savedUser);

    return NextResponse.json({message: "User created successfully"}, { status: 201 });

    //send verification email
    await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})
return NextResponse.json({message: "User created successfully, please check your email for verification",success:true,savedUser}, { status: 201 });
  } catch (error) {
    return NextResponse.json({error: error.message}, { status: 500 });
  }
}
