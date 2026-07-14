import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AdminSlice = createApi({
    reducerPath:"AdminApi", 
     baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    }),
    endpoints:(builder)=>({
        getOverview:builder.query({
            query:()=>"/overview"
        })
    })
})

export const {useGetOverviewQuery} = AdminSlice