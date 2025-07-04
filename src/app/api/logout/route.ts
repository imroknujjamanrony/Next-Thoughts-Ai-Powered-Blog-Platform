import { signIn } from 'next-auth/react';
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


dbConnect()

export async function POST(request:NextRequest){}