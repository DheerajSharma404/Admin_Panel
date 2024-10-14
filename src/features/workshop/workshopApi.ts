import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WorkshopEnquiriesResponse } from "../../types";


export const workshopApiSlice = createApi({
    reducerPath: 'workshopApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://mentoons-backend-zlx3.onrender.com/api/v1' }),
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getEnquiriess: builder.query<WorkshopEnquiriesResponse, {sort:string}>({
            query: ({sort}) => ({
                url: `/workshop?sort=${sort}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }),
            providesTags: ['Dashboard']
        })
    }),
});

export const { useGetEnquiriessQuery } = workshopApiSlice;
