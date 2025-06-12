import { NextResponse } from 'next/server';
import { getCollection, collection } from '@/lib/mongodb';

export async function GET() {
  try {
    const blogsCol = await getCollection(collection.blog_collection);

    // Fetch all blogs from the collection
    const blogs = await blogsCol.find().toArray();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to fetch blogs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
