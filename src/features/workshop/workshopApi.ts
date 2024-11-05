import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SingleWorkshopEnquiryResponse, WorkshopEnquiriesListResponse } from "../../types";


export const workshopApiSlice = createApi({
    reducerPath: 'workshopApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://mentoons-backend-zlx3.onrender.com/api/v1' }),
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getEnquiriess: builder.query<WorkshopEnquiriesListResponse, {sort:string,page:number,limit:number}>({
            query: ({sort,page,limit}) => ({
                url: `/workshop?sort=${sort}&page=${page}&limit=${limit}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }),
            providesTags: ['Dashboard']
        }),
        getEnquiryById: builder.query<SingleWorkshopEnquiryResponse, {enquiryId:string | undefined}>({
            query: ({enquiryId}) => ({
                url: `/workshop/${enquiryId}`,
                method: 'GET',
            })
        })
    }),
});




export const { useGetEnquiriessQuery,useGetEnquiryByIdQuery } = workshopApiSlice;
