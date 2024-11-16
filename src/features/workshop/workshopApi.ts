import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CallRequestsResponse, SingleWorkshopEnquiryResponse, WorkshopEnquiriesListResponse } from "../../types";

const baseUrl = 'https://mentoons-backend-zlx3.onrender.com/api/v1';



export const workshopApiSlice = createApi({
    reducerPath: 'workshopApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Dashboard', 'CallRequests'],
    endpoints: (builder) => ({
        getEnquiriess: builder.query<WorkshopEnquiriesListResponse, { sort: string, page: number, limit: number }>({
            query: ({ sort, page, limit }) => ({
                url: `/workshop?sort=${sort}&page=${page}&limit=${limit}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }),
            providesTags: ['Dashboard']
        }),
        getEnquiryById: builder.query<SingleWorkshopEnquiryResponse, { enquiryId: string | undefined }>({
            query: ({ enquiryId }) => ({
                url: `/workshop/${enquiryId}`,
                method: 'GET',
            })
        }),
        getCallRequests: builder.query<CallRequestsResponse, { page: number, limit: number, search: string }>({
            query: ({ page, limit, search }) => ({
                url: `/call-requests?page=${page}&limit=${limit}&search=${search}`,
                method: 'GET',
            }),
            providesTags: ['CallRequests']
        }),
        updateCallRequest: builder.mutation<void, { id: string; adminId?: string; status?: string }>({
            query: ({ id, status }) => ({
                url: `/call-requests/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['CallRequests'],
        }),
        assignCallRequest: builder.mutation<void, { userId: string, callId: string, token: string }>({
            query: ({ userId, callId, token }) => ({
                url: `/call-requests/assign/${userId}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: { callId },
            }),
        }),
        reallocateCallRequest: builder.mutation<void, { userId: string, callId: string, token: string }>({
            query: ({ userId, callId, token }) => ({
                url: `/call-requests/reallocate/${userId}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: { callId },
            }),
        }),
    }),
});




export const {
    useGetEnquiriessQuery,
    useGetEnquiryByIdQuery,
    useGetCallRequestsQuery,
    useUpdateCallRequestMutation,
    useAssignCallRequestMutation,
    useReallocateCallRequestMutation } = workshopApiSlice;
