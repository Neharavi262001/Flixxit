import React, { useRef ,useState} from 'react'
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa'
import './sliderList.css'
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default React.memo(
    function SliderList({title,endpoint,category}) {
        const [slideNumber,setSlideNumber]=useState(0)
        const [moved,setMoved]=useState(false)
        const listRef = useRef();
        const navigate=useNavigate()
        const handleClick = (action) => {
            setMoved(true)
            let distance = 250;
            if (action === 'left' && slideNumber>0) {
              setSlideNumber((prevSlideNumber) => prevSlideNumber - 2);
            }
            if (action === 'right' && slideNumber< 9 ){
              setSlideNumber((prevSlideNumber) => prevSlideNumber + 2);
            }
            distance *= slideNumber;
            listRef.current.style.transform = `translateX(${-distance}px)`;
          }

          
          const {url}=useSelector((state)=>state.content)
          const {content,loading}= useFetch(endpoint)
    
        return (
            <div className='movie-list'>
            <span className="list-title">{title}</span>

            <div className="list-wrapper">
              <FaChevronLeft 
                style={{display: !moved && "none" }} 
                className='slider-arrow left-arrow' 
                onClick={()=>handleClick("left")}
              />

              <div className="list-container" ref={listRef}>
              {content?.results?.slice(0,27).map((item) => {
                const posterUrl=item?.poster_path ? url.poster + item?.poster_path : url.backdrop + item?.backrop_path
                return (
                 
                   <Card 
                      key={item?.id} 
                      id={item?.id}
                      title={item?.title || item.name} 
                      imageUrl={posterUrl} 
                      handleNavigate={()=>navigate(`/${item.media_type || category}/${item.id}`)}
                      imdbRating={item?.vote_average.toFixed(1)}
                      itemGenre={item?.genre_ids}
                    /> 
            
                )}
            )}
              </div>
              <FaChevronRight 
                className='slider-arrow right-arrow' 
                onClick={()=>handleClick("right")}
              />
            </div>
          </div>
        )
      }
)



