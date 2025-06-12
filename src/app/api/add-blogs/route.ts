import { NextRequest, NextResponse } from 'next/server';
import { collection, getCollection } from '@/lib/mongodb';

// Blog post type definition
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
    const blogCollection = await getCollection(collection.blog_collection);

    // Insert the new blog document
    const result = await blogCollection.insertOne({
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()), // convert to array
      coverImage,
      content,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: '✅ Blog created successfully', blogId: result.insertedId },
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
