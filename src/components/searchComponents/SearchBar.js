import React, { useState, useContext } from 'react';
import { SearchContext, LoadingContext } from '../../hooks/Contexts';
import './search_style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const SearchBar = () => {
  // State Variables
  const [searchTerm, setSearchTerm] = useState('');
  const {searchResults, setSearchResults} = useContext(SearchContext);
  const [errorClass, setErrorClass] = useState(false);

  
  // Functions
  const setTerm = (e) => {
    e.preventDefault();
    if(searchTerm.length > 0 && errorClass){
      setErrorClass(false);
    }
    setSearchTerm(e.target.value);
  }


  const submitSearch = (e) => {
      e.preventDefault();   
      console.log(searchTerm);
      if(searchTerm === '') {
        setErrorClass(true);
        return
      }

      const query = 'https://api.github.com/search/repositories?q=' + searchTerm; 
      axios.get(query)
        .then((response) => {
          console.log(response.data);
          setSearchResults(response.data);
          console.log(searchResults);
        })
  }



  return (
    <div className='search-bar__container'>
      
        <form>
            { errorClass && 
              <p className='search__error-message'>search term can't be blank</p>
            }
          
            <span className='search-bar__icon'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span> 

            <input className='search-bar__input'
                   type='text'
                   placeholder='Github Keyword Search' 
                   name='searchTerm'
                   value={searchTerm}
                   onChange={setTerm}>
            </input>   

            <button className='search-bar__button' 
                    // type='submit'
                    onClick={submitSearch}>
                    Search
            </button>
        </form>
    </div>

  )
}

export default SearchBar;