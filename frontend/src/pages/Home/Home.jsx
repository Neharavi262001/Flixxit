import React, { useEffect } from 'react'
import './home.css'
import Navbar from '../../components/NavBar/NavBar'
import Banner from '../../components/Banner/Banner'
import SliderContainer from '../../components/sliderContainer/SliderContainer'



const Home = () => {

  return (
    <div className='home'>
      <header>
      <Navbar/>
      </header>
      <main>
       <Banner />
       <SliderContainer/>
      </main>
    </div>
  )
}

export default Home
