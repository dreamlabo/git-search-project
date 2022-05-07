import React from 'react'

const CheckBox = ({languageSearchTerms, language, isChecked, checkboxHandler}) => {

  const isCheckboxChecked = (lang) => {
    console.log("check " + languageSearchTerms)
    return languageSearchTerms.includes(lang);
   
     
  }

  
  return (
    <div  className='filter__checkbox-line-wrapper'>
      
                    <label className='filter__checkbox-container'>
                      <span>{language}</span>
                        <input className='filter__checkbox-container__input'
                              type="checkbox"
                              name={language}
                              value={language}
                              checked={isChecked}
                              // onClick={}
                              onChange={ e => checkboxHandler(e.target.name)} 
                              > 
                        </input>
                        <span className="filter__checkmark"></span>
                    </label>
                  </div>
  )
}

export default CheckBox