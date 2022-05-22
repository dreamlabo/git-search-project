import React, { useState, useContext } from 'react';
import { SearchContext, LoadingContext } from '../../hooks/Contexts';
import useMediaQuery from '../../hooks/UseMediaQuery.js'
import '../../main_styles.css';
import {Gradient, GradientStop, BarChart, BarSeries, LinearGaugeSeries, LinearGauge, LinearGaugeBar, LinearGaugeOuterBar, ChartTooltip} from 'reaviz';
const color = "#484848"
//  added a comment

const SearchStatistics = () => {

  const { searchResults, setSearchResults } = useContext(SearchContext);

  const isSmallerScreen = useMediaQuery('(max-width: 450px)');

  const displayLanguageDistibution = () => {
    const languageDistribution = {}
    
    searchResults.items.map(item => {
          if (languageDistribution.hasOwnProperty(item.language)) {
            languageDistribution[item.language] = languageDistribution[item.language] + 1;
          }
          else {
            languageDistribution[item.language] = 1;
            console.log(languageDistribution)
          }
    })

    var sortedList = {};

       Object.keys(languageDistribution).sort((a,b) => languageDistribution[b] - languageDistribution[a]).forEach((key) => {
        sortedList[key] = languageDistribution[key]; });


        return Object.keys(sortedList).map((language, i) => {

          let width = 300;
          if(isSmallerScreen){
            width = 250
          }
          const percent = (sortedList[language]/searchResults.items.length) * 100;
      
          return <div key={i + language} className={ isSmallerScreen ? '' : 'searchStats_inner-grid'}>
                    <p className='searchStats_inner-grid_item'>{language}</p>
                    <LinearGauge className='searchStats_barchart'
                        height={20}
                        width={width}
                        data={{ key: language, data: percent }}
                      
                        series={<LinearGaugeSeries 
                                bar={<LinearGaugeBar
                                  gradient={
                                    <Gradient
                                      stops={[
                                        <GradientStop offset="10%" key="start" color='#810f94' />,
                                        <GradientStop offset="100%" key="stop" color='#A213BA' />
                                      ]}
                                    />
                                  }
                                />}
                              outerBar={<LinearGaugeOuterBar fill={color} />}
                          />}
                      />
                  </div>      
        })
  }
  

  return (
    <section className='searchStats__container'>
      {  searchResults && <div>
                            <h1>Search Statistics</h1>
                            <div className='searchStats__inner-container'>
                                {searchResults && <div>
                                                    <h3 >Repositories Discovered</h3>
                                                    {console.log(searchResults)}
                                                    {console.log('results: ' +  searchResults.items.length)}
                                                    <p className='searcStats__num_of_repos'>{parseInt(searchResults.total_count).toLocaleString()}</p>
                                                  </div>}

                                  <div>
                                    <h3>Language Distribution</h3>
                                    {searchResults && <div className='searchStats__languages-container'>
                                                            {displayLanguageDistibution()}
                                                      </div>}
                                  </div> 
                            </div>
                          </div>}

    </section>
  )
}

export default SearchStatistics