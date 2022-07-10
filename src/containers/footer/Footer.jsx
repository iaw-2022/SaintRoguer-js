import React from 'react'
import './footer.css'
import logo from '../../assets/images/logo.svg'

const Footer = () => {
  return (
    <div className="cataloguefooter section__padding">
      <div className="cataloguefooter-links">
        <div className="cataloguefooter-links_logo">
          <img src={logo} alt="logo of trailerama" />
          <p>Trailerama, <br /> All Rights Reserved</p>
        </div>
        <div className="cataloguefooter-links_div">
          <h1>Links</h1>
          <p>
            <a target="_blank" rel="noreferrer" href="https://trailerama.herokuapp.com/">Trailerama Laravel</a>
          </p>
          <p>
            <a target="_blank" rel="noreferrer" href="https://trailerama-api.herokuapp.com/api-docs">Trailerama NodeJS</a>
          </p>
          <p>
            <a target="_blank" rel="noreferrer" href="https://trailerama-react.herokuapp.com/">Trailerama React</a>
          </p>
        </div>
      </div>
      <div className="cataloguefooter-copyright">
        <p>@2022 Trailerama. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer