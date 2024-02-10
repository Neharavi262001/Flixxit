import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './card.css'


export default React.memo( function Card({id,title,imageUrl,imdbRating,handleNavigate})  {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = imageUrl;
    imageLoader.onload = () => {
      setLoading(false);
    };
  }, [imageUrl]);
    return (
        <div className={`list-item ${loading ? 'loading' : ''}`} onClick={handleNavigate}  >
          {loading && <div className="skeleton"></div>}
        <img className={`list-image ${loading ? 'hidden' : ''}`}  src={imageUrl} alt="" />
        <div className="item-info">
          <h4 className='item-title'>{title}</h4>
          <div className="icons">
            <span className='imdb'> <FaStar/>  {imdbRating}</span>
          </div>
        
         
        </div>
      </div>
  
    )
  }
   
)




 