import React, { useEffect, useState } from 'react'
import './explore.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchContent ,fetchGenres} from '../../utils/tmdb'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Select from "react-select";
import Card from '../../components/Card/Card'
import { FaFilter } from 'react-icons/fa'


const Explore = () => {
    const navigate=useNavigate()
    const { mediaType } = useParams();
    const [selectedGenres, setSelectedGenres] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);
    const [data, setData] = useState(null);
    const [genres, setGenres] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const {url}=useSelector((state)=>state.content)
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
              const response = await fetchContent(`/discover/${mediaType}`);
              setData(response);
            } catch (error) {
              console.error('Error fetching trending data:', error);
            }finally{
                setLoading(false);
            }
          };
           
          const fetchGenresData = async () => {
            try {
              const genresResponse = await fetchGenres({mediaType}); 
              setGenres(genresResponse);
            } catch (error) {
              console.error('Error fetching genres:', error);
            }
          };
        fetchGenresData();
        fetchData();
        handleFetchData()
      }, [mediaType,selectedGenres]);

    const fetchNextPageData = async () => {
        try {
          const res = await fetchContent(`/discover/${mediaType}?page=${pageNum}`);
          if (data?.results) {
            setData({
              ...data,
              results: [...data?.results, ...res.results],
            });
          } else {
            setData(res);
          }
          setPageNum((prev) => prev + 1);
        } catch (error) {
          console.error('Error fetching next page data:', error);
        }
      };

      const handleFetchData = async () => {
        setLoading(true);
        try {
            let genreQuery = '';
            if (selectedGenres) {
                genreQuery = `&with_genres=${selectedGenres.map(g => g.value).join(',')}`;
            }
            const endpoint = `/discover/${mediaType}?${genreQuery}${selectedSort ? `&sort_by=${selectedSort.value}` : ''}`;
            const filteredData = await fetchContent(endpoint);
            setData(filteredData);
  
    
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };
    

      const handleGenresChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions);
        handleFetchData()
        
      };
    
      const handleSortChange = (selectedOption) => {
        setSelectedSort(selectedOption);
        handleFetchData()
      }
    return (
      <div className="explore-page">
            
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv"
                ? <h2>Explore TV Shows</h2>
                :  <h2>Explore Movies</h2>}
            </div>
          <div className="filters">         
          <div>
            <Select
            className='filter'
              isMulti
              value={selectedGenres}
              onChange={handleGenresChange}
              options={genres.map(genre => ({ value: genre.id, label: genre.name }))}
              isClearable
              placeholder="Select Genres"
            />
          </div>

          <div>
            <Select
             className='filter'
              value={selectedSort}
              onChange={handleSortChange}
              options={[
                { value: "popularity.desc", label: "Trending" },
                { value: "popularity.asc", label: "Not Trending" },
                { value: "vote_average.desc", label: "Top Rated" },
                { value: "vote_average.asc", label: "Lowest Rated" },
                { value: "original_title.asc", label: "Title (A-Z)" },
              ]}
              isClearable
              placeholder="Select Sort Option"
            />
          </div>
          <button onClick={handleFetchData}>Filter <FaFilter/></button>           
          </div>
        </div>
                {loading && <div>Loading...</div>}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}  
                            >
                              <div className="result-container">
                              {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    const posterUrl=item?.poster_path ? url.poster + item?.poster_path : url.backdrop + item?.backrop_path
                                    return (
                                        <Card
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                            imdbRating={item?.vote_average.toFixed(1)}
                                            title={item.title || item.name} 
                                            imageUrl={posterUrl} 
                                            handleNavigate={()=>navigate(`/${item?.media_type || mediaType}/${item.id}`)}
                                            fromSearch={true} 
                                        />
                                    );
                                })}

                              </div>
                              
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
         
        </div>
    );
};

export default Explore;