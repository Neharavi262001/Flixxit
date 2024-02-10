import React from 'react'
import SliderList from '../SliderList/SliderList'

const SliderContainer = () => {
  return (
    <div className='slider-container'>
      <SliderList title='Trending this week' endpoint='/trending/all/week'/>
      <SliderList  title='Trending movies' endpoint='/trending/movie/week' category='movie'/>
      <SliderList  title='Trending series' endpoint='/trending/tv/week'category='tv'/>
      <SliderList  title='Popular movies' endpoint='/movie/popular'category='movie'/>
      <SliderList  title='Popular series' endpoint='/tv/popular'category='tv'/>
      <SliderList title='Top Rated Movies' endpoint='/movie/top_rated' category='movie'/>
      <SliderList title='Top Rated TV Series' endpoint='/tv/top_rated' category='tv'/>
      <SliderList  title='New Releases' endpoint='/movie/now_playing'category='movie'/>
    </div>
  )
}

export default SliderContainer
