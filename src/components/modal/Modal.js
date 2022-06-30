import React from 'react'
import styled from 'styled-components';
import './modal.css';


const Modal = ({ isOpen, setIsOpen, active }) => {
    function changeState() {
        console.log('changeState');
        console.log(isOpen);
        setIsOpen(!isOpen);
    }

    return (
        <>
            {isOpen && active !== null &&
                <Overlay>
                    <ModalContainer>
                        <ModalHeader>
                            <h3>{active.slug ? active.title : active.fullTitle}</h3>
                        </ModalHeader>
                        <CloseButton onClick={() => changeState()}><h1>X</h1></CloseButton>
                        <Content>
                            <img className='row__poster'
                                src={active.slug ? process.env.REACT_APP_BASE_URL + `/arts/${active.slug}/image` : active.image}
                                height="216" width="321"
                                alt={active.title + ' poster'} />
                            {active.slug ?
                                <p> {active.plot} </p> :
                                <>
                                    <p>{"Crew: " + active.crew} </p>
                                    <p>{"IMDB Rating: " + active.imDbRating}  </p>
                                    <p>{"IMDB Rating Count: " + active.imDbRatingCount}  </p>

                                </>
                            }
                            {active.slug && active.videoLink.startsWith('https://www.youtube.com') &&
                                <div className='iframe-container'>
                                    <iframe width="836" height="627" src={active.videoLink.replace('watch?v=', 'embed/')} title={active.title + ' trailer'} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                                </div>
                            }
                        </Content>
                    </ModalContainer>
                </Overlay>
            }
        </>
    )
}

export default Modal

const Overlay = styled.div`
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.93);
padding: 40px;
display: flex;
align-items: center;
justify-content: center;
overflow-y: auto

`;

const ModalContainer = styled.div`
width: 500px;
min-height: 100px;
bg-color: #fff;
top: 300px;
position: relative;
border-radius: 5px;
box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
padding: 20px;
`;

const ModalHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 20px;
padding: 20px;
border-bottom: 1px solid #E8E8E8;

h3{
    font-weight: 1000;
    font-size: 16px;
    color: #1766DC;
}
`;

const CloseButton = styled.div`
position: absolute;
top: 20px;
right: 20px;

width: 30px;
height: 30px;
border: none;
background: none;
cursor: pointer;
transition: .3s ease all;
border-radius: 5px;
color: #1766DC;

&:hover{
    background-color: #f2f2f2;
}

h1{
    width: 100%;
    height: 100%;
}
`;

const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;

h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}

img {
  width: 100%;
  vertical-align: top;
  border-radius: 3px;
}

`;