// useContent.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContent, fetchGenres } from '../utils/tmdb'; // Adjust the import path

const useContent = () => {
  const dispatch = useDispatch();

  const fetchConfig = async () => {
    try {
      const res = await fetchContent('/configuration');
      const imageUrls = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(fetchUrl(imageUrls));
      console.log(res);
    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };

  const fetchGenresData = async () => {
    let promises = [];
    let categories = ['tv', 'movie'];
    let allGenres = {};

    categories.forEach(async (category) => {
      promises.push(fetchContent(`/genre/${category}/list`));
    });

    const response = await Promise.all(promises);
    console.log(response);
    response.forEach(({ genres }) => {
      genres.forEach((genre) => (allGenres[genre.id] = genre));
    });

    console.log(response);
    dispatch(fetchGenres(allGenres));
  };

  useEffect(() => {
    fetchConfig();
    fetchGenresData();
  }, [dispatch]);

  return { fetchConfig, fetchGenresData };
};

export default useContent;
