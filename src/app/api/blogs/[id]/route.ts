import { NextRequest, NextResponse } from "next/server";
import { getCollection, collection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: any
) {
  const id = params.id;
  try {
    const blogsCollection = await getCollection(collection.blog_collection);
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: any
) {
  const id = params.id;
  try {
    const blogsCollection = await getCollection(collection.blog_collection);
    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    if (!result.deletedCount) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete blog" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: any
) {
  const id = params.id;
  try {
    const { title, description, tags, coverImage, content } = await req.json();
    const blogsCollection = await getCollection(collection.blog_collection);

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description,
          tags,
          coverImage,
          content,
        },
      }
    );

    if (!result.modifiedCount) {
      return NextResponse.json({ message: "Nothing was updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update blog" }, { status: 500 });
  }
}
