import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, confirmPassword } = body;

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "all fields are required" },
      { status: 400 }
    );
  }


  if (password !== confirmPassword) {
        return NextResponse.json(
        { message: "passwords do not match" },
        { status: 400 }
        );
    }

    //now time to user data to database
    
    // Simulate a successful signup
    return NextResponse.json(
        { message: "signup successful" },
        { status: 200 }
    );
}
    
    