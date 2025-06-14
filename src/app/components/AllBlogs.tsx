'use client';

import {
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from '@/store/services/blogApi';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function AllBlogs() {
  const { data: blogs, isLoading, isError } = useGetAllBlogsQuery();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [editBlog, setEditBlog] = useState<any>(null);
  
const router = useRouter();


  const handleEdit = (blog: any) => {
    setEditBlog(blog);
  };

  const handleUpdate = async () => {
    const updated = {
      title: editBlog.title,
      description: editBlog.description,
      tags: editBlog.tags,
      coverImage: editBlog.coverImage,
      content: editBlog.content,
    };

    try {
      const res = await updateBlog({ id: editBlog._id, updatedData: updated }).unwrap();
      Swal.fire('Success', res.message, 'success');
      setEditBlog(null);
    } catch (err) {
      Swal.fire('Error', 'Failed to update blog', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await deleteBlog(id).unwrap();
        Swal.fire('Deleted!', res.message, 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete blog', 'error');
      }
    }
  };

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Failed to load blogs</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs?.map((blog, index) => (
          <div key={index} className="p-4 border rounded shadow space-y-2">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p>{blog.description.slice(0, 80)}...</p>
            <p className="text-sm text-gray-500">Tags: {blog.tags}</p>
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-48 object-cover rounded"
            />
            <div className="flex justify-between flex-wrap gap-2 mt-2">
         <button
  onClick={() => router.push(`/blogs/${blog._id}`)}
  className="btn btn-sm btn-info"
>
  Details
</button>


              <button
                onClick={() => handleEdit(blog)}
                className="btn btn-sm btn-warning"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id ? blog._id  : '')}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-2">
            <h3 className="text-xl font-bold mb-2">Edit Blog</h3>
            <input
              type="text"
              className="input input-bordered w-full"
              value={editBlog.title}
              onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              className="input input-bordered w-full"
              value={editBlog.description}
              onChange={(e) =>
                setEditBlog({ ...editBlog, description: e.target.value })
              }
              placeholder="Description"
            />
            <input
              type="text"
              className="input input-bordered w-full"
              value={editBlog.tags}
              onChange={(e) => setEditBlog({ ...editBlog, tags: e.target.value })}
              placeholder="Tags"
            />
            <input
              type="text"
              className="input input-bordered w-full"
              value={editBlog.coverImage}
              onChange={(e) =>
                setEditBlog({ ...editBlog, coverImage: e.target.value })
              }
              placeholder="Cover Image URL"
            />
            <textarea
              className="textarea textarea-bordered w-full"
              value={editBlog.content}
              onChange={(e) => setEditBlog({ ...editBlog, content: e.target.value })}
              placeholder="Content"
            />
            <div className="flex justify-end space-x-2">
              <button className="btn btn-error btn-sm" onClick={() => setEditBlog(null)}>
                Cancel
              </button>
              <button className="btn btn-success btn-sm" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
