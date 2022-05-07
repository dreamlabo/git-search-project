import React from 'react';
import './header_style.css';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Header = () => {
  return (
    <div className='header__main-container flex'>
        <header className='header__restraint-container header__inner-cont'>
            <div>
                <span className='header__span-icon'><FontAwesomeIcon icon={faGithub} /></span>
                Git Search
            </div>
            <div>
                <span className='header__span'>by</span>Todd Labo
            </div>
        </header>

    </div>
  )
}

export default Header