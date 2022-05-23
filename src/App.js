import { useState, useMemo } from "react";
import { SearchContext } from './hooks/Contexts.js';
import Header from "./components/header/Header";
import RepositoriesDisplay from "./components/repositoriesDisplay/RepositoriesDisplay";
import Search from "./components/searchComponents/Search";
import SearchStatistics from "./components/searchStatistics/SearchStatistics";
import './main_styles.css'


function App() {

  const [searchResults, setSearchResults] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const providerSearchValue = useMemo(() => ({searchResults, setSearchResults}), [searchResults, setSearchResults]);
  // const providerIsLoading = useMemo(() => ({isLoading, setIsLoading}), [isLoading, setIsLoading]);
  return (
    <div className="page-container">
      <Header/>
      <SearchContext.Provider value={providerSearchValue}>
        <Search/>
        <SearchStatistics />
        <RepositoriesDisplay />
      </SearchContext.Provider>

    </div>
  );
}

export default App;
