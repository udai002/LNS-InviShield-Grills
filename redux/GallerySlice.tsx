import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const galleryApi = createApi({
  reducerPath: 'galleryApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  }),

  tagTypes: ['Gallery'], // ✅ important for auto refetch

  endpoints: (builder) => ({

    // ✅ CREATE (POST)
    createGallery: builder.mutation({
      query: (data) => ({
        url: '/gallery',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Gallery'],
    }),

    // ✅ GET ALL / FILTER BY locationId
    getGallery: builder.query({
      query: (locationId) => {
        if (locationId) {
          return `/gallery?locationId=${locationId}`;
        }
        return '/gallery';
      },
      providesTags: ['Gallery'],
    }),

    // ✅ DELETE (if you add API later)
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),

    // ✅ UPDATE (if you add API later)
    updateGallery: builder.mutation({
      query: ({ id, data }) => ({
        url: `/gallery/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Gallery'],
    }),

  }),
});

export const {useCreateGalleryMutation , useGetGalleryQuery} = galleryApi