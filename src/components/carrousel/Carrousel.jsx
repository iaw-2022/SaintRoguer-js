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
    if (isLoading)
        return <Loading />

    if (!movies.length)
        return <div>No movies or Series</div>

    return (
        <div>
            <CarrouselItem item={movies[selectedIndex]} loaded={loaded} setLoaded={setLoaded} />
            <div className='carrousel-button'>
                <CarouselButtonContainer>
                    {showButtons ? (
                        <>
                            <CarouselButton onClick={previous}>{"<"}</CarouselButton>
                            <CarouselButton onClick={next}>{">"}</CarouselButton>

                        </>
                    ) : (
                        <></>
                    )}
                </CarouselButtonContainer>
                <CarouselButtonContainer>
                    {autoPlay ? (
                        <>
                            <CarouselButton onClick={autoplayChange}>{"Stop Autoplay"}</CarouselButton>
                        </>
                    ) :
                        (
                            <>
                                <CarouselButton onClick={autoplayChange}>{"Start Autoplay"}</CarouselButton>

                            </>
                        )}
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

const CarouselButton = styled.button`
  color: white;
  background-color: #eb118a;
  padding: 8px;
  margin: 0 5px;
`;