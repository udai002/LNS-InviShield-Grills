import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const locationApi = createApi({
  reducerPath: 'locationApi',

  baseQuery: fetchBaseQuery({
   baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  }),

  tagTypes: ['Location'], // ✅ for cache invalidation

  endpoints: (builder) => ({
    
    // ✅ GET ALL LOCATIONS
    getLocations: builder.query<any, void>({
      query: () => 'location',
      providesTags: ['Location'],
    }),

    // ✅ GET SINGLE LOCATION
    getLocationById: builder.query<any, string>({
      query: (id) => `location/${id}`,
      providesTags: ['Location'],
    }),

    // ✅ CREATE LOCATION
    createLocation: builder.mutation<any, any>({
      query: (body) => ({
        url: 'location',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Location'],
    }),

    // ✅ UPDATE LOCATION
    updateLocation: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `location/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Location'],
    }),

    // ✅ DELETE LOCATION
    deleteLocation: builder.mutation<any, string>({
      query: (id) => ({
        url: `location/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Location'],
    }),
  }),
});

export const {useLazyGetLocationsQuery , useCreateLocationMutation , useGetLocationByIdQuery } = locationApi