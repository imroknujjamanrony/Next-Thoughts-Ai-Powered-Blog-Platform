import { dbConnect } from '@/lib/dbConnect';
import Blog from '@/models/blogModel';
import { NextRequest, NextResponse } from 'next/server';


// Blog post type definition and its called type alias
type BlogPost = {
  title: string;
  description: string;
  tags: string;
  coverImage: string;
  content: string;
};

// Handle POST request: Create a new blog post
export async function POST(req: NextRequest) {
  try {
    const body: BlogPost = await req.json();
    const { title, description, tags, coverImage, content } = body;

    // Validate required fields
    if (!title || !description || !tags || !coverImage || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB collection
    dbConnect()
    const blog=new Blog({
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()), // convert to array
      coverImage,
      content,
      createdAt: new Date(),
    })

    const newBlog=await blog.save();
   


    return NextResponse.json(
      { message: '✅ Blog created successfully', blogId: newBlog._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Failed to create blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
