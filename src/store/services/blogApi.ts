import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type BlogPost = {
  _id?: string;
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
    // ✅ POST: Add blog
    addBlog: builder.mutation<{ message: string; blogId: string }, BlogPost>({
      query: (newBlog) => ({
        url: 'add-blogs',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blog'],
    }),

    //post userdata
    postUserData: builder.mutation<{message:string,userId:string},BlogPost>({
      query:(newUserData) => ({
        url: 'signup',
        method: 'POST',
        body: newUserData,
      }),
      // No invalidatesTags or use ['Blog'] if you want to invalidate blogs
    }),

    // ✅ GET: All blogs
    getAllBlogs: builder.query<BlogPost[], void>({
      query: () => 'blogs',
      providesTags: ['Blog'],
    }),

    // ✅ GET: Single blog by ID
    getBlogById: builder.query<BlogPost, string>({
      query: (id) => `blogs/${id}`,
    }),

    // ✅ DELETE: Blog by ID
    deleteBlog: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),

    // ✅ GET: Single blog by ID (for client-side usage)
    getSingleBlog: builder.query({
  query: (id: string) => `/blogs/${id}`,
}),


    // ✅ PATCH: Update blog by ID
    updateBlog: builder.mutation<
      { message: string },
      { id: string; updatedData: Partial<BlogPost> }
    >({
      query: ({ id, updatedData }) => ({
        url: `blogs/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
   usePostUserDataMutation, 
  useAddBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useGetSingleBlogQuery,
} = blogApi;
