import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './searchbar.css'

const SearchBar = () => {
    const navigate=useNavigate()
    const [query,setQuery]=useState("")

    const handleSearch = (e) => {
      if (e.key === 'Enter' && query.length > 0) {
       navigate(`/search/${query}`);
      }
    };

    const handleSearchOnClick=()=>{
      if (query.length > 0){
        navigate(`/search/${query}`);
      }
    }

  return (
    
       <div className="search-container">
          <h2>Find your favourite movies and TV shows</h2> 
            <div className='search-input'>
                <input 
                   type="text" 
                    placeholder="Search..."
                    onChange={(e)=>setQuery(e.target.value)}
                    onKeyUp={handleSearch}
                />
                 <div className="search-icon" onClick={handleSearchOnClick}>
                     <FaSearch />
                  </div>
            </div>
            
           
    </div>
  )
}

export default SearchBar
