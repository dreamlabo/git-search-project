import axios from "axios";
import { useState, useMemo } from "react";
import { SearchContext, LoadingContext } from './hooks/Contexts.js';
import Header from "./components/header/Header";
import RepositoriesDisplay from "./components/repositoriesDisplay/RepositoriesDisplay";
import Search from "./components/searchComponents/Search";
import SearchResultsHeader from "./components/searchResultsheader/SearchResultsHeader";
import SearchStatistics from "./components/searchStatistics/SearchStatistics";
import './main_styles.css'

// https://docs.github.com/en/rest/reference/search#search-repositories
// https://api.github.com/search/repositories

const query = 'https://api.github.com/search/repositories?q=dreamlabo' 





function App() {

  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const providerSearchValue = useMemo(() => ({searchResults, setSearchResults}), [searchResults, setSearchResults]);
  const providerIsLoading = useMemo(() => ({isLoading, setIsLoading}), [isLoading, setIsLoading]);
  return (
    <div>
      <Header/>
      <SearchContext.Provider value={providerSearchValue}>
        <Search/>

        {/* <SearchResultsHeader/> */}
        <SearchStatistics />
        <RepositoriesDisplay />
      </SearchContext.Provider>

    </div>
  );
}

export default App;
