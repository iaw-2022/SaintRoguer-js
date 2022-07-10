
import React, { useState, useEffect } from 'react'
import './catalogue.css'
import { getArts } from '../../hooks/getArts'
import { MovieList, SearchBox, Modal } from '../../components'

const Catalogue = () => {

    const [movies, setMovies] = useState([])
    const [auxMovies, setAuxMovies] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [auxSearch, setAuxSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const [active, setActive] = useState([])
    const [isOpen, setIsOpen] = useState(false)



    useEffect(() => {
        async function loadArts() {
            const response = await getArts()
            if (response.status === 200) {
                setMovies(response.data)
                setAuxMovies(response.data)
            }
            setIsLoading(false)
        }
        loadArts()

    }, [])
    

    useEffect(() => {
        function filter() {
            const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()))
            setMovies(filteredMovies)
        }

        function recaulculate() {
            const filteredMovies = auxMovies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()))
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

    return (

        <div className="catalogue section__margin" id="catalogue">
            <div className='catalogue-heading'>
                <h1 className='gradient__text'> Movies & TVShows Catalogue </h1>
                <h1 className='gradient__text hidden-md-down'>(Shift + wheel to scroll)</h1>
            </div>

            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            {!isLoading &&
                <div className="row__posters">
                    <MovieList movies={movies} setActive={setActive} setIsOpen={setIsOpen} isOpen={isOpen} className="row__poster" />
                </div>
            }
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                active={active}
            ></Modal>
        </div>
    )
}


export default Catalogue

