import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define blog post type
export type BlogPost = {
  title: string;
  description: string;
  tags: string;
  coverImage: string;
  content: string;
};

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    // POST blog
    addBlog: builder.mutation<{ message: string; blogId: string }, BlogPost>({
      query: (newBlog) => ({
        url: 'add-blogs',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const { useAddBlogMutation } = blogApi;
