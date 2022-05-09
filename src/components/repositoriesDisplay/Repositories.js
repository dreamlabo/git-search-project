import React, { useContext } from 'react';
import { SearchContext } from '../../hooks/Contexts';
import Repository from './Repository';
import './repositoriesDisplay_styles.css';

const Repositories = () => {
  // State Variables
  const { searchResults, setSearchResults } = useContext(SearchContext);

  // Functions
  const displayRepositories = () => {
    return searchResults.items.map( (repo, index) => {
      return <Repository key={index + repo.name}
                         repoName={repo.name}
                         repoOwner={repo.owner.login}
                         stars={repo.stargazers_count}
                         description={repo.description}
                         primaryLanguage={repo.language}
                         languages_url={repo.languages_url}
                         repo_html_url={repo.html_url}
                         homepage={repo.homepage}
             />
    })
  }

  return (
    <div className='repositories-container'>
        {searchResults && displayRepositories()}
    </div>
  )
}

export default Repositories