import React, { useEffect, useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useParams } from 'react-router-dom'
import './search.css'
import { fetchContent } from '../../utils/tmdb'
import { useSelector } from 'react-redux'
import Card from '../../components/Card/Card'


const Search = () => {
  const [data,setData]=useState(null)
  const [pageNum, setPageNum] = useState(1);
  const [loading,setLoading]=useState(false)
  const {query}=useParams()
  const {url}=useSelector((state)=>state.content)
 
  const navigate=useNavigate()


  const fetchSearchResult = async () => {
    setLoading(true);
    try {
      const response = await fetchContent(`/search/multi?query=${query}&page=${pageNum}`);
      setData(response);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchNextPageData = async () => {
    try {
      const res = await fetchContent(`/search/multi?query=${query}&page=${pageNum}`);
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

  useEffect(()=>{
    fetchSearchResult()
    setPageNum(1)
  },[query])

  return (
    <div>
    <Navbar />
    <div className="search-results">
      {loading && <h2>Loading ......</h2>}
      {data && data?.results.length > 0 ? (
        <InfiniteScroll
          dataLength={data?.results.length || []}
          next={fetchNextPageData}
          hasMore={pageNum <= data?.total_pages}
          loader={<h4>Loading more...</h4>}
        >
          <div className="page-title">
            {`Search results for "${query}"`}
          </div>
          
          <div className="result-container">
            {data?.results.map((item) => {
              if (item.media_type === "person") return;
              const posterUrl=item.poster_path ? url.poster + item.poster_path : url.backdrop + item.backrop_path

              return (
                <Card 
                key={item.id} 
                title={item.title || item.name} 
                imageUrl={posterUrl} 
                imdbRating={item?.vote_average.toFixed(1)}
                handleNavigate={()=>navigate(`/${item.media_type || category}/${item.id}`)}
                fromSearch={true}  />
              );
            })}
         </div>
        </InfiniteScroll>
      ) : (
        <h2>No results found.</h2>
      )}
    </div>
  </div>
  )
}

export default Search
