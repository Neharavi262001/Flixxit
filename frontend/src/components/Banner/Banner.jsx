import React, { useState, useEffect } from 'react'
import './banner.css'
import { FaInfoCircle, FaPlay} from 'react-icons/fa'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useAddToWatchHistoryMutation} from '../../redux/user/userApiSlice'

const Banner = () => {
     const [background,setBackground]=useState('')
     const [title,setTitle]=useState('')
     const [description,setDescription]=useState('')
     const [id,setId]=useState('')
     const [mediaType,setmediaType]=useState('')
    const [loading,setLoading]=useState(true)
   
     const navigate=useNavigate()

     const {url}=useSelector((state)=>state.content)
     const {content}=useFetch('/trending/all/week')

     const truncate=(string,number)=>{
      return string?.length>number ? string.substring(0,number-1) + '...' : string
    }
    useEffect(() => {
      const fetchData = () => {
        const moviesWithBackdrop = content?.results?.filter((movie) => movie.backdrop_path);
  
        if (moviesWithBackdrop && moviesWithBackdrop.length > 0) {
          const bannerMovie = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)];
        
          const movieTitle = bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name;
          setTitle(movieTitle);
  
          const movieOverview = bannerMovie?.overview;
          setDescription(truncate(movieOverview, 200));
  
          const backgroundImage = url?.backdrop + bannerMovie?.backdrop_path;
          setBackground(backgroundImage);

          const movieId=bannerMovie?.id
          setId(movieId)

          const movieCategory=bannerMovie?.media_type
          setmediaType(movieCategory)

          setLoading(false);
        }
      };
  
      fetchData();
    }, [content, url]);

    const handleNavigate=()=>{
      navigate(`/${mediaType}/${id}`)
    }
    

   
   

  return (
    <div className={`banner ${loading ? 'loading' : ''}`}>
    {loading ? (
      <div className="skeleton"></div>
    ) : (
     
      <>
        <img className="banner-image" width="100vw" src={background} alt="" />

        <div className="banner-info">
          <span className="banner-title">
            <h1>{title}</h1>
          </span>
          <span className="banner-description">{description}</span>
          <span className="banner-btns">
            <button className="banner-btn" onClick={() => navigate('/player')}>
              <FaPlay />
              <span>Play</span>
            </button>
            <button className="banner-btn" onClick={handleNavigate}>
              <FaInfoCircle />
              <span> More info</span>
            </button>
          </span>
        </div>
      </>
    )}
  </div>
  )
}

export default Banner
