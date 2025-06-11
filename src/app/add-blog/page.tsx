'use client';

import { useState } from 'react';

// ✅ 1. Define form fields type
type FormFields = {
  title: string;
  description: string;
  tags: string;
  coverImage: string;
  content: string;
};

export default function AddBlogPage() {
  // ✅ 2. Strongly typed form state
  const [form, setForm] = useState<FormFields>({
    title: '',
    description: '',
    tags: '',
    coverImage: '',
    content: '',
  });

  // ✅ 3. Clean generic change handler (no need to type the event itself)
  const handleChange = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ 4. Basic validation (you can improve this or use Zod/Yup)
    if (!form.title || !form.content) {
      alert('Title and Content are required!');
      return;
    }

    console.log('📝 Submitted form:', form);
    // → Replace with API logic
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📝 Add New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Blog Title</label>
          <input
            className="w-full mt-1 p-3 border rounded-lg bg-base-100"
            placeholder="Enter your blog title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <textarea
            className="w-full mt-1 p-3 border rounded-lg bg-base-100"
            placeholder="Brief intro or summary..."
            rows={3}
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tags (comma-separated)</label>
          <input
            className="w-full mt-1 p-3 border rounded-lg bg-base-100"
            placeholder="e.g. JavaScript, React, AI"
            value={form.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cover Image URL</label>
          <input
            className="w-full mt-1 p-3 border rounded-lg bg-base-100"
            placeholder="https://image-url.com"
            value={form.coverImage}
            onChange={(e) => handleChange('coverImage', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Blog Content</label>
          <textarea
            className="w-full mt-1 p-3 border rounded-lg bg-base-100"
            placeholder="Write your full blog here..."
            rows={10}
            value={form.content}
            onChange={(e) => handleChange('content', e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white font-semibold"
        >
          ✨ Publish Blog
        </button>
      </form>
    </div>
  );
}
