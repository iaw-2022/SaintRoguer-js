import React, { useState, useEffect } from 'react'
import './imdb.css';
import { MovieList, SearchBox, Modal } from '../../components'
import { getMovies, getSeries } from '../../hooks/getImdb'


const Imdb = () => {
  const [movies, setMovies] = useState([])
  const [auxMovies, setAuxMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [auxSearch, setAuxSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [series, setSeries] = useState([])
  const [auxSeries, setAuxSeries] = useState([])
  const [isLoading2, setIsLoading2] = useState(true)
  const [searchValue2, setSearchValue2] = useState('')
  const [auxSearch2, setAuxSearch2] = useState('')

  const [active, setActive] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function loadArts() {
      const response = await getMovies()
      if (response.status === 200) {
        setMovies(response.data.items)
        setAuxMovies(response.data.items)

      }
      setIsLoading(false)
    }
    loadArts()

  }, [])

  useEffect(() => {
    async function loadArts() {
      const response = await getSeries()
      if (response.status === 200) {
        setSeries(response.data.items)
        setAuxSeries(response.data.items)
      }
      setIsLoading2(false)
    }
    loadArts()

  }, [])

  useEffect(() => {
    function filter() {
      const filteredMovies = movies.filter(movie => movie.fullTitle.toLowerCase().includes(searchValue.toLowerCase()))
      setMovies(filteredMovies)
    }

    function recaulculate() {
      const filteredMovies = auxMovies.filter(movie => movie.fullTitle.toLowerCase().includes(searchValue.toLowerCase()))
      setMovies(filteredMovies)
    }

    if (searchValue !== auxSearch)
      if (searchValue.length > 0) {
        if (searchValue.length < auxSearch.length) {
          recaulculate()
        }
        else {
          filter()
        }
        setAuxSearch(searchValue)
      } else {
        setMovies(auxMovies)
        setAuxSearch('')
      }
  }, [searchValue, movies, auxMovies, auxSearch])

  useEffect(() => {
    function filter() {
      const filteredSeries = series.filter(series => series.fullTitle.toLowerCase().includes(searchValue2.toLowerCase()))
      setSeries(filteredSeries)
    }

    function recaulculate() {
      const filteredSeries = auxSeries.filter(series => series.fullTitle.toLowerCase().includes(searchValue2.toLowerCase()))
      setSeries(filteredSeries)
    }

    if (searchValue2 !== auxSearch2)
      if (searchValue2.length > 0) {
        if (searchValue2.length < auxSearch2.length) {
          recaulculate()
        }
        else {
          filter()
        }
        setAuxSearch2(searchValue2)
      } else {
        setSeries(auxSeries)
        setAuxSearch2('')
      }
  }, [searchValue2, series, auxSeries, auxSearch2])



  if (!isLoading && !isLoading2 && movies.length === 0 && series.length === 0) {
    return (
      <div className="imdb section__margin" id="imdb">
        <div className='imdb-heading'>
          <h1 className='gradient__text'> Could not load IMDB API </h1>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="imdb section__margin" id="imdb">
        <div className='imdb-heading'>
          <h1 className='gradient__text'> Most Popular IMDB Movies </h1>
          <h1 className='gradient__text hidden-md-down'>(Shift + wheel to scroll)</h1>
        </div>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        {!isLoading &&
          <div className="row__posters">
            <MovieList movies={movies} setActive={setActive} setIsOpen={setIsOpen} isOpen={isOpen} className="row__poster" />
          </div>
        }
        <div className='imdb-heading'>
          <h1 className='gradient__text'> Most Popular IMBD TVs </h1>
          <h1 className='gradient__text hidden-md-down'>(Shift + wheel to scroll)</h1>
        </div>
        <SearchBox searchValue={searchValue2} setSearchValue={setSearchValue2} />
        {!isLoading2 &&
          <div className="row__posters">
            <MovieList movies={series} setActive={setActive} setIsOpen={setIsOpen} isOpen={isOpen} className="row__poster" />
          </div>
        }
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          active={active}
        ></Modal>
      </div>
    </>
  )

}

export default Imdb