'use client';

import Banner from "./components/Banner";
import GeminiComponent from "./components/GeminiComponents";
import Footer from "./components/shared/Footer";
import { useGetAllBlogsQuery } from "@/store/services/blogApi";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: blogs, isLoading, isError } = useGetAllBlogsQuery();
  const router = useRouter();

  if (isLoading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Failed to load blogs</p>;

  const previewBlogs = blogs?.slice(0, 3); // show top 3

  return (
    <div>
      <Banner />
      <GeminiComponent></GeminiComponent>

      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewBlogs?.map((blog) => (
            <div key={blog._id} className="border rounded-lg shadow p-4 space-y-3">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p>{blog.description.slice(0, 100)}...</p>
              <button
                onClick={() => router.push(`/blogs/${blog._id}`)}
                className="btn btn-info btn-sm"
              >
                Details
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => router.push('/all-blogs')} // Update this if your route is different
          >
            See All Blogs
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
