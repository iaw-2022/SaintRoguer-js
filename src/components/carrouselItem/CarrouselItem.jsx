import styled from "styled-components";
import React from 'react'
import './carrouselItem.css'


const CarouselImg = styled.img`
  max-width: 500px;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: 1s;
  &.loaded {
    opacity: 1;
  }
`;



const CarrouselItem = (props) => {





    const { item, loaded, setLoaded } = props
    const imageRoute = process.env.REACT_APP_BASE_URL + `/arts/${item.slug}/image`


    return (
        <div key={item.title} className='catalogueheader section__padding'>

            <div className="catalogueheader-content">
                <h1 className='gradient__text'>  {item.title} </h1>

                <p>
                    {item.plot}

                </p>


            </div>
            <div className="catalogueheader-image">
                <CarouselImg
                    src={imageRoute}
                    alt={item.title + " poster"}
                    height="321"
                    width="216"
                    className={loaded ? "loaded" : ""}
                    onLoad={() => setLoaded(true)} /> :
            </div>
        </div>

    )
}

export default CarrouselItem