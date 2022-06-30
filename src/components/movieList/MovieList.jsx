import React from 'react'
import './movieList.css'


const MovieList = (props) => {


  function changeState(movie) {
    props.setIsOpen(!props.isOpen);
    props.setActive(movie)
  }

  return (
    <>
      {props.movies.map((movie, index) =>
        <div key={movie.slug ? movie.slug : movie.id} className='div__poster' >
          <img className='row__poster'
            src={movie.slug ? process.env.REACT_APP_BASE_URL + `/arts/${movie.slug}/image` : movie.image}
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


