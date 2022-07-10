import React, { useState, useEffect } from 'react'
import './carrousel.css'
import { getMovies } from '../../hooks/getLast'
import CarrouselItem from '../carrouselItem/CarrouselItem'
import Loading from '../Loading/Loading.jsx'
import styled from "styled-components";

const Carrousel = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [loaded, setLoaded] = useState(false);

    const [movies, setMovies] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [autoPlay, setAutoPlay] = useState(true)
    const [showButtons, setShowButtons] = useState(false)

    const CarouselButton = styled.button`
    padding: 0.5rem 1rem;
    color: ${showButtons ? '#000000' : '#ffeb3b'};
    background: ${showButtons ? '#8db600' : '#526a00'};
    font-family: var(--font-family);
    font-weight: 900;
    font-size: 18px;
    line-height: 25px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    `;

    useEffect(() => {
        if (autoPlay || !showButtons) {
            const interval = setInterval(() => {
                selectNewImage(selectedIndex, movies);
            }, 5000);
            return () => clearInterval(interval);
        }
    });

    const selectNewImage = (index, movies, next = true) => {
        setLoaded(false);
        setTimeout(() => {
            const condition = next ? selectedIndex < movies.length - 1 : selectedIndex > 0;
            const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : movies.length - 1;
            setSelectedIndex(nextIndex);
        }, 500);
    };

    const previous = () => {
        selectNewImage(selectedIndex, movies, false);
    };

    const next = () => {
        selectNewImage(selectedIndex, movies);
    };

    const autoplayChange = () => {
        setAutoPlay(!autoPlay);
        setShowButtons(!showButtons);
    }

    useEffect(() => {
        async function loadMovies() {
            const response = await getMovies()
            if (response.status === 200) {
                setMovies(response.data)
            }
            setIsLoading(false)
        }
        loadMovies()

    }, [])

    //on Click disable buttons

    if (isLoading)
        return <Loading />

    if (!movies.length)
        return <div>No movies or Series</div>

    return (
        <div>
            <CarrouselItem item={movies[selectedIndex]} loaded={loaded} setLoaded={setLoaded} />
            <div>
                <CarouselButtonContainer>


                    <CarouselButton disabled={!showButtons} onClick={previous}>{"<"}</CarouselButton>
                    <CarouselButton disabled={!showButtons} onClick={next}>{">"}</CarouselButton>



                </CarouselButtonContainer>
                <CarouselButtonContainer>
                    <div className='carrousel-button'>
                        <CarouselButton type="button" onClick={autoplayChange}>{"Switch Autoplay"}</CarouselButton>
                    </div>
                </CarouselButtonContainer>
            </div>
        </div>
    )
}

export default Carrousel


const CarouselButtonContainer = styled.div`
  display: flex;
  align-content: center;
  flex-direction: row;
  margin-top: 15px;
`;

