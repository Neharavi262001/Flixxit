import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery=fetchBaseQuery({
    baseUrl:'https://flixxit-backend-v02.onrender.com',
    credentials:'include'
})

export const apiSlice=createApi({
    baseQuery,
    tagTypes:['User','Rate','Watchlist','WatchHistory'],
    endpoints:(builder)=>({
        
    })
})