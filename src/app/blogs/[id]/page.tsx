'use client';

import { useGetBlogByIdQuery } from '@/store/services/blogApi';
import { useParams } from 'next/navigation';

export default function BlogDetailsPage() {
  const { id } = useParams() as { id: string };
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blog) return <p>Error loading blog.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-600 mb-2">Tags: {blog.tags}</p>
      <p className="text-lg">{blog.description}</p>
      <hr className="my-4" />
      <div>
        <h2 className="text-xl font-semibold mb-2">Full Content:</h2>
        <p>{blog.content}</p>
      </div>
    </div>
  );
}
