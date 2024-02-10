import React from 'react'
import './watchHistory.css'
import {useGetWatchHistoryQuery} from '../../redux/user/userApiSlice'
import Card from '../Card/Card'
import { useNavigate } from 'react-router-dom'

const WatchHistory = () => {
  const navigate=useNavigate()
  const{data:getWatchHistory,isLoading,error}=useGetWatchHistoryQuery()
  
  return (
    <div className='result-container'>
      {isLoading && <p>Loading......</p>}
     
     { getWatchHistory&& getWatchHistory?.map((item)=>{
            const title = item.contentTitle || item.name;
              return (
                <div className="watchHistory-item" key={item.contentId} >
                   <Card className="watchHistory-card"
                  key={item.contentId} 
                  title={title}
                  imageUrl={item.contentPoster}
                  imdbRating={item?.contentRating}
                  handleNavigate={()=>navigate(`/player`)}
                  />
                 
                </div>

              )
          })
          } 

    </div>
  )
}

export default WatchHistory
