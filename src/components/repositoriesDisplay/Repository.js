import React, { useState } from 'react';
import './repositoriesDisplay_styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '../../hooks/UseMediaQuery';
import axios from 'axios';
import PieChart from './PieChart';



const Repository = ({repoName, repoOwner, stars, description, primaryLanguage, languages_url, repo_html_url, homepage}) => {

    // State variables
    const [repositoryIsOpen, setRepositoryIsOpen] = useState(false);
    const [languagesUsed, setLanguagesUsed] = useState(null);
    const [sum, setSum] = useState(0);

    // let sum = 0;

    // Media Query Hook
    const isMobileScreen = useMediaQuery('(max-width: 400px)');
    const isTabletScreen = useMediaQuery('(max-width: 500px)');


    // Functions
    const toggleRepoView = () => {
        setRepositoryIsOpen(!repositoryIsOpen);
    }

    const getLanguages = () => {
        if(!languagesUsed) {
          axios.get(languages_url)
            .then((response) => {
                setLanguagesUsed( response.data);
           
                let total = 0;
                for (let [key, value] of Object.entries(response.data)) {
                    total += value;    
                }
                setSum(total);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    

    const shortenRepoName = (name) => {
        if(isMobileScreen && name.length > 17) {
            return name.slice(0, 15) + ' ...';
        }
        else if (isTabletScreen && name.length > 30){
            return name.slice(0, 27) + ' ...';
        }
        else {
            return name;
        }  
    }


  return ( 
    <div className='repository-container'>
        { repositoryIsOpen ? <div>
                                <div className='repository__toggle-container' onClick={toggleRepoView}>
                                    <p>close</p>
                                    <FontAwesomeIcon className='repository__close-icon' icon={faCircleXmark} />
                                </div>
                                <div className='repository__inner-container'>
                                    <p className='repository__values-container__heading'>Repository Name:</p>
                                    <p>{repoName}</p>
                                </div>
                            
                                <div className='repository__inner-container'>
                                    <p className='repository__values-container__heading'>Owner's Name:</p>
                                    <p>{repoOwner}</p>
                                </div>
                                <div className='repository__inner-container'>
                                    <p className='repository__values-container__heading'>Stars:</p>
                                    <p>{parseInt(stars).toLocaleString()}</p>
                                </div>
                                <div className='repository__inner-container'>
                                    <p className='repository__values-container__heading'>Primary Language:</p>
                                    <p>{primaryLanguage}</p>
                                </div>
                                <div className='repository__inner-container'>
                                    <p className='repository__values-container__heading'>Description:</p>
                                    <p >{description}
                                    </p>
                                </div>

                                <div className='repository__inner-container'>
                                    <p className='repository__values-container__heading'>Repository URL:</p>
                                    <p><a href={repo_html_url} target="_blank" rel="noopener noreferrer">{repo_html_url}</a></p>
                                </div>

                                { homepage && <div className='repository__inner-container'>
                                    <p className='repository__values-container__heading'>Homepage:</p>
                                    <p><a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a></p>
                                </div>}

                            
                                <div className='repository__language-container'>
                                    {getLanguages()}
                                    <h4 className='repository__languages-header'>Language(s) Used</h4>
                                   
                                    { languagesUsed && <div className='repository__languages__inner-container'>
                                           { Object.entries(languagesUsed).map(([key, val]) => {
                                                let percent = Math.round((val/sum) * 100);
                                                let percentDisplay = percent.toString() + '%'
                                                if(percent < 1) {
                                                    percent = 1;
                                                    percentDisplay = '<1%'
                                                }
                                            
                                                return <PieChart percent={percent}
                                                                language={key}
                                                                percentDisplay={percentDisplay} />
                                                }
                                            )
                                        }
                                    </div>
                                   }
                                 </div>
                            </div>
                            :
                            <div className='repo-closed' onClick={toggleRepoView}>
                                <p>{shortenRepoName(repoName)}</p>
                              
                                <div className='repository__toggle-container' >
                                    <p>more info</p>
                                    <FontAwesomeIcon className='repository__open-icon' icon={faCaretDown}  />
                                </div>
        </div>}
    </div>
  )
}

export default Repository;