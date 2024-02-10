import axios from 'axios'

const TMDB_BASE_URL='https://api.themoviedb.org/3'
const TMDB_TOKEN=import.meta.env.VITE_APP_TMDB_TOKEN
const TMDB_IMAGE_URL='https://image.tmdb.org/t/p/w500'

const headers ={
    Authorization :"bearer " + TMDB_TOKEN
}

export const fetchGenres = async ({mediaType}) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/genre/${mediaType}/list`,
      { headers }
    );
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const fetchContent= async(url,params)=>{
    try {
      const {data}=await axios.get(
        TMDB_BASE_URL + url,
        {headers,params}
      ) 
      return data;
    } catch (err) {
        console.log(err)

    }
}