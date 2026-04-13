import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const submissionApi = createApi({
    reducerPath: 'submissionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    }),
    endpoints: (builder) => ({
        submitForm: builder.mutation({
            query: (data) => ({
                url: '/submission',
                method: 'POST',
                body: data,
            }),
        }),
        getSubmissions: builder.query({
            query: () => '/submission',
        }),
        getSubmissionById: builder.query({
            query: (id) => `/submission/${id}`,
        }),
    }),
});

export const {
    useSubmitFormMutation,
    useGetSubmissionsQuery,
    useGetSubmissionByIdQuery,
} = submissionApi;