import React,{useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate,Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRoutes from './authRoutes/authRoutes'; 
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import './App.css'
import Profile from './pages/Profile/Profile';
import ProfileForm from './pages/ProfileForm/ProfileForm';
import Search from './pages/Search/Search';
import Navbar from './components/NavBar/NavBar';
import Details from './pages/Details/Details';

import {fetchContent} from '../src/utils/tmdb'
import {fetchUrl,fetchGenres} from '../src/redux/content/contentSlice'
import { useDispatch, useSelector } from 'react-redux'
import Explore from './pages/Explore/Explore';
import Watchlist from './pages/Watchlist/Watchlist';
import Subscription from './pages/Subscription/Subscription';
import Player from './pages/Player/Player';
import AboutUs from './pages/AboutUs/AboutUs';
import SearchBar from './components/SearchBar/SearchBar';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import {checkToken} from '../src/redux/auth/authSlice'

const App = () => {
    const dispatch=useDispatch()

    const {url} =useSelector((state)=>state.content)
   
  
  const fetchConfig = async () => {
    try {
      const res = await fetchContent('/configuration');
      const imageUrls = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(fetchUrl(imageUrls));

    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };

  const fetchGenresData=async()=>{
    let promises=[]
    let categories=['tv','movie']
    let allGenres={}

    categories.forEach(async(category)=>{
      promises.push(fetchContent(`/genre/${category}/list`))
    })

    const response=await Promise.all(promises);
   
    response.map(({genres})=>{
      return genres.map((genre)=>(allGenres[genre.id]=genre))
    })
    dispatch(fetchGenres(allGenres))

  }

  const initialiseApp=async()=>{
    await dispatch(checkToken())
  }

  useEffect(() => {

    fetchConfig();
    fetchGenresData()
    initialiseApp()
    
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Routes>
          
          <Route path='/login' element={<Login/>}/>
          <Route path='/register'element={<Register/>}/>
          <Route path='/subscribe' element={<Subscription/>}/>
          <Route path="*" element={<PageNotFound />} />
          <Route path='' element={<AuthRoutes/>}> 
            <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Outlet />
              </div>
            }
          >
            <Route index element={<Home />} />
            <Route path="/explore/:mediaType/*" element={<Explore />} />
            <Route path="/watchlist/*" element={<Watchlist />} />
            <Route path="/:mediaType/:id/*" element={<Details />} />
            <Route path='/search/*'element={<SearchBar/>}/>
            <Route path='/search/:query/*'element={<Search/>}/>
            <Route path='/profile'element={<Profile/>}/> 
            <Route path='/updateProfile'element={<ProfileForm/>}/>
            <Route path='/about'element={<AboutUs/>}/>
          </Route>
              <Route path='/player' element={<Player/>}/>

        </Route>
          
         
      </Routes>
    </Router>
    <ToastContainer/>
    </div>
  )
}

export default App


