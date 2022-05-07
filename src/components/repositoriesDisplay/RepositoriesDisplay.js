import React, { useState, useContext } from 'react';
import { SearchContext, LoadingContext } from '../../hooks/Contexts';
import Repositories from './Repositories'

const RepositoriesDisplay = () => {
 
  return (
    <section className='repositories__restraint-container'>
        <h1>Repositories Returned</h1>
        <Repositories/>
    </section>
  )
}

export default RepositoriesDisplay