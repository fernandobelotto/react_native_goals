import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Goal } from './GoalModel';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://f591-201-43-91-89.sa.ngrok.io' }),
    tagTypes: ['Goals'],
    endpoints: (build) => ({
        getGoals: build.query<Goal[], void>({
            providesTags: ['Goals'],
            query: () => '/goals',
        }),
        getGoal: build.query({
            query: (id: string) => `/goals/${id}`,
        }),
        createGoal: build.mutation({
            invalidatesTags: ['Goals'],
            query: (body: Goal) => ({
                url: '/goals',
                method: 'POST',
                body,
            }),
        }),
        updateGoal: build.mutation({
            invalidatesTags: ['Goals'],
            query: (body: Goal) => ({
                url: `/goals/${body.id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteGoal: build.mutation({
            invalidatesTags: ['Goals'],
            query: (id: string) => ({
                url: `/goals/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetGoalsQuery,
    useGetGoalQuery,
    useCreateGoalMutation,
    useUpdateGoalMutation,
    useDeleteGoalMutation,
} = api;
