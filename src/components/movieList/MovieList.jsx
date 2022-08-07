import React from 'react'
import axios from 'axios'
import './movieList.css'


const MovieList = (props) => {


  function changeState(movie) {
    props.setIsOpen(!props.isOpen);
    props.setActive(movie)
  }


  async function getImageFromSlug(slug) {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/arts/${slug}/image`)
    return res.data
  }

  return (
    <>
      {props.movies.map((movie, index) =>
        <div key={movie.slug ? movie.slug : movie.id} className='div__poster' >
          <img className='row__poster'
            src={movie.slug ? getImageFromSlug(movie.slug) : movie.image}
            height="216" width="321"
            alt={movie.title}
            onClick={() => changeState(movie)}
          />
        </div>)
      }

    </>
  )
}

export default MovieList


