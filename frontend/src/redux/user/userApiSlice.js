import { apiSlice } from "../api/apiSlice";
const USERS_BACKEND_URL='/api/user'

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials)=>({
               url:`${USERS_BACKEND_URL}/login` ,
               method:'POST',
               body:credentials
            })

        }),
        register:builder.mutation({
            query:(credentials)=>({
               url:`${USERS_BACKEND_URL}/register` ,
               method:'POST',
               body:credentials
            })
        }),



        logout:builder.mutation({
            query:()=>({
                url:`${USERS_BACKEND_URL}/logout` ,
                method:'POST',
            })
        }),

        updateProfile:builder.mutation({
            query:(credentials)=>({
               url:`${USERS_BACKEND_URL}/profile` ,
               method:'PUT',
               body:credentials
            })
        }),


        getSubscriptionPlans: builder.query({
            query: () => ({
              url: `${USERS_BACKEND_URL}/subscribe`,
              method: 'GET',
              
            })
        }),

        createSession: builder.mutation({
          query: (id) => ({
            url: `${USERS_BACKEND_URL}/checkout`,
            method: 'POST',
            body: { id },
          }),
        }),


        getUserSubscription: builder.query({
          query: () => ({
            url: `${USERS_BACKEND_URL}/subscriptionDetails`,
            method: 'GET',
            
          })
      }),

      getWatchHistory: builder.query({
        query: () => ({
          url: `${USERS_BACKEND_URL}/watchHistory`,
          method: 'GET',

        }),
        providesTags:['WatchHistory']
        
      }),
      addToWatchHistory: builder.mutation({
        query: (newItem) => ({
          url:`${USERS_BACKEND_URL}/watchHistory`,
          method: 'POST',
          body: newItem,
        }),
        invalidatesTags:['WatchHistory']
      }),

      clearWatchHistory: builder.mutation({
        query: () => ({
          url: `${USERS_BACKEND_URL}/watchHistory`,
          method: 'DELETE',
        }),
        invalidatesTags:['WatchHistory']
      }),
      
        getWatchlist: builder.query({
            query: () => ({
              url: `${USERS_BACKEND_URL}/watchList`,
              method: 'GET',

            }),
            providesTags:['Watchlist']
            
          }),

          addToWatchlist: builder.mutation({
            query: (newItem) => ({
              url:`${USERS_BACKEND_URL}/watchList`,
              method: 'POST',
              body: newItem,
            }),
            invalidatesTags:['Watchlist']
          }),
          
          removeFromWatchlist: builder.mutation({
            query: (contentId) => ({
              url: `${USERS_BACKEND_URL}/watchList/${contentId}`,
              method: 'DELETE',
            }),
            invalidatesTags:['Watchlist']
          }),

          
    clearWatchlist: builder.mutation({
        query: () => ({
          url: `${USERS_BACKEND_URL}/watchList`,
          method: 'DELETE',
        }),
        invalidatesTags:['Watchlist']
      }),

      getRating: builder.query({
        query: (contentId) => ({
          url: `${USERS_BACKEND_URL}/rating/${contentId}`,
          method: 'GET',

        }),
        providesTags:['Rate']
        
      }),

      like: builder.mutation({
        query: (contentId) => ({
          url: `${USERS_BACKEND_URL}/like/${contentId}`,
          method: 'POST',
        }),
        invalidatesTags:['Rate']
      }),

      dislike:builder.mutation({
        query: (contentId) => ({
          url: `${USERS_BACKEND_URL}/dislike/${contentId}`,
          method: 'POST',
        }),
        invalidatesTags:['Rate']
      }),

    }),
})

export const {useLoginMutation,
            useLogoutMutation,
            useRegisterMutation,
            useUpdateProfileMutation,
            useAddToWatchlistMutation,
            useGetWatchlistQuery,
            useClearWatchlistMutation,
            useRemoveFromWatchlistMutation,
            useGetSubscriptionPlansQuery,
            useCreateSessionMutation,
            useGetUserSubscriptionQuery,
            useGetRatingQuery,
            useLikeMutation,
            useDislikeMutation,
            useAddToWatchHistoryMutation,
            useGetWatchHistoryQuery,
            useClearWatchHistoryMutation
            
        }=userApiSlice