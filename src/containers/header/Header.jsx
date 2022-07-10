import React from 'react'
import './header.css'
import { Carrousel } from '../../components';

const Header = () => {
  return (
    <div className='catalogueheader section__padding' id="home">
      <div className='catalogueheader-content'>
        <h1 className='gradient__text'> Latest Movies & TVShows </h1>
        <Carrousel />
      </div>
    </div>
  )
}

export default Header