import React, { useState } from 'react';
import './search_style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCaretDown, faCaretUp, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'

const FilterComponent = ({}) => {
  const langageList = ['C', 'C++', 'C#', 'Go', 'Java', 'JavaScript', 
                        'Kotlin', 'Node',  'Objective-C', 'PHP', 
                        'Python', 'R', 'Swift', 'TypeScript'];
  const languageSearchTerms = [];
  
  // State Variables
  const [isCheckboxFieldOpen, setIsCheckboxFieldOpen] = useState(false);
  const [filterTerm, setFilterTerm] = useState([]);


  // Functions
  const setDropdownCheckboxesOpen = () => {
    setIsCheckboxFieldOpen(!isCheckboxFieldOpen);
    console.log(isCheckboxFieldOpen);
  }


  const checkboxHandler = (language => {
    const containsTerm = languageSearchTerms.indexOf(language)
    if (containsTerm !== -1){
        languageSearchTerms.splice(containsTerm, 1)
    }
    else {
      languageSearchTerms.push(language);
    }
  });

  
  const updateFilterTerms = () => {
    console.log(languageSearchTerms)
  }

  const checkboxList = () => {
    console.log('clicked open')
      return langageList.map((language) => {
        return   <div key={language} className='filter__checkbox-line-wrapper'>
                    <label className='filter__checkbox-container'>
                        <span>{language}</span>
                        <input className='filter__checkbox-container__input'
                              type="checkbox"
                              name={language}
                              value={language}
                              onChange={ e => checkboxHandler(e.target.name)} > 
                        </input>
                        <span className="filter__checkmark"></span>
                    </label>
                  </div>     
    })
  }



  return (
        <div className='filter__sub-container'>
            <label onClick={setDropdownCheckboxesOpen} className='filter__label-heading'>Filter by Language
              <span> { isCheckboxFieldOpen ? <FontAwesomeIcon className='filter__icon-down' icon={faCaretUp} />
                                          : <FontAwesomeIcon className='filter__icon-down' icon={faCaretDown} />
                    } 
              </span>
            </label>
            
            { isCheckboxFieldOpen ? 
                                  <div className='filter__checkbox-wrapper'>
                                    <div className='filter__checbox-flex-container'>
                                      {checkboxList}
                                    </div>

                                    <div className='filter__btn-container'>
                                      <button className='filter__apply-btn'
                                              onClick={updateFilterTerms}>Apply Filters</button>
                                    </div>
                                  </div>
                                  : null 
            }
        </div>
  )
}

export default FilterComponent;