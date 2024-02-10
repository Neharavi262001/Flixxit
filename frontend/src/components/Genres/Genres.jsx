import React from 'react';
import { useSelector } from 'react-redux';

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.content);

  return (
    <div className="genres-container">
      {data?.map((genre) => {
        const genreName = genres[genre]?.name;
        if (genreName) {
          return (
            <span key={genre} className="genre">
              {genreName}
            </span>
          );
        }
        return null; 
      })}
    </div>
  );
};

export default Genres;
