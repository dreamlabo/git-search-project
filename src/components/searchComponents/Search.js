import React, { useState, useContext } from 'react';
import CheckBox from './CheckBox';

import { SearchContext } from '../../hooks/Contexts';
import './search_style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



const Search = () => {

  const langageList = ['C', 'Cpp', 'Csharp', 'Go', 'Java', 'JavaScript', 'Kotlin', 'Objective-C', 'PHP', 'Python', 'R', 'Rust', 'Swift', 'TypeScript'];
  const BUTTON_TEXT_RETURN_BY_STARS = 'Show Results by Stars';
  const BUTTON_TEXT_RETURN_BY_BEST_MATCH = 'Show Results by Best Match';
  const SEARCH_RESULTS_HEADER_STARS = 'Results Shown by Star Count';
  const SEARCH_RESULTS_HEADER_BEST_MATCH = 'Results Shown by Best Match'
  let buttonText = '';

 
  // State Variables
  const [searchTerm, setSearchTerm] = useState('');
  const {searchResults, setSearchResults } = useContext(SearchContext);
  const [errorClass, setErrorClass] = useState(false);
  const [returnByStars, setReturnByStars] = useState(false)

  const [isCheckboxFieldOpen, setIsCheckboxFieldOpen] = useState(false);
  const [languageSearchTerms, setLanguageSearchTerms] = useState([]);


  // Functions for SearchBar
  const setTerm = (e) => {
    e.preventDefault();
    if(searchTerm.length > 0 && errorClass){
      setErrorClass(false);
    }
    setSearchTerm(e.target.value);
    // console.log(e.target.value);
  }


  const callAPI = (byStars) => {
  
    if(searchTerm === '') {
      setErrorClass(true);
      return
    }

    let languages = '';

    for(let term in languageSearchTerms){
      languages = languages + '+language:' + languageSearchTerms[term];
    }

    let query = 'https://api.github.com/search/repositories?q=' + searchTerm + languages; 
    
    if(byStars === true){
        query = query + '&sort=stars'
    }
    
    axios.get(query)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }


  const submitSearch = (e) => {
      e.preventDefault();   
      callAPI(returnByStars);
  }


  // Filter Functions
  const setDropdownCheckboxesOpen = () => {
    setIsCheckboxFieldOpen(!isCheckboxFieldOpen);
  }


  const checkboxHandler = (language => {
    const containsTerm = languageSearchTerms.indexOf(language);
    if (containsTerm !== -1){
        const lang = languageSearchTerms;
        lang.splice(containsTerm, 1);
        setLanguageSearchTerms([...lang]);
    }
    else {
      const langNew = languageSearchTerms;
      langNew.push(language)
      setLanguageSearchTerms([...langNew])
    }
  });


  const isCheckboxChecked = (lang) => {
    return languageSearchTerms.includes(lang);
  }


  const checkboxList = () => {
      return langageList.map((language) => {
            const isChecked = isCheckboxChecked(language)
          return <CheckBox key={language}
                           languageSearchTerms={languageSearchTerms}
                           language={language} 
                           checkboxHandler={checkboxHandler}
                           isChecked={isChecked}
            />    
      })
  }


  // Results Header Functions
  const toggleReturnByStars = (e) => {
    const viewByStarOrder = !returnByStars;
    callAPI(viewByStarOrder);
    setReturnByStars(viewByStarOrder);
  }


  return (
    <div className='search-restraint-container search__flex'>
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
            <div className='filter__sub-container'>
              <label onClick={setDropdownCheckboxesOpen} className='filter__label-heading'>Filter by Language(s)
                <span> { isCheckboxFieldOpen ? <FontAwesomeIcon className='filter__icon-down' icon={faCaretUp} />
                                             : <FontAwesomeIcon className='filter__icon-down' icon={faCaretDown} />
                      } 
                </span>
              </label>
              
              { isCheckboxFieldOpen ? <div className='filter__checkbox-wrapper'>
                                        <div className='filter__checbox-flex-container'>
                                          {checkboxList()}
                                        </div>
                                      </div>
                                      : 
                                      null 
              }
            </div>
            { searchResults && <div className='restraint-container flex columns justify inner-wrapper'>
                                    <h1 className='search-results__header'>Search Results</h1>
                                    <p>{returnByStars ? SEARCH_RESULTS_HEADER_STARS : SEARCH_RESULTS_HEADER_BEST_MATCH }</p>
                                    <button className='searchResultsHeader__button'  onClick={toggleReturnByStars}>
                                        {returnByStars ? BUTTON_TEXT_RETURN_BY_BEST_MATCH : BUTTON_TEXT_RETURN_BY_STARS}
                                    </button>
                                </div>}
        
    </div>
  )
}

export default Search;