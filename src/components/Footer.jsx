import React from 'react'
import styled from 'styled-components'
import Subcribe from './Subcribe'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

import { TfiFacebook, TfiTwitterAlt, TfiGoogle, TfiLinkedin } from 'react-icons/tfi'
import '../App.css'

const Footer = () => {

  return (
    <Container>
        <Subcribe />
        <footer className="footer">
          <div className="footer__item">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
                <span>Fast News</span>
              </Link>
            </div>
          </div>
          <div className="footer__item">
            <ul>
              <li>SERVICES</li>
              <li>THEME TWIST</li>
              <li>SUBMIT A TICKET</li>
            </ul>
          </div>

          <div className="footer__item">
            <ul>
              <li>CONTACT US</li>
              <li>ABOUT US</li>
              <li>AFFILIATES</li>
              <li>RESOURCES</li>
            </ul>
          </div>
          <div className="footer__item">
            <span>FOLLOW US</span>
            <div className="social">
              <TfiFacebook />
              <TfiGoogle />
              <TfiLinkedin />
              <TfiTwitterAlt />
            </div>
          </div>

        </footer>
        
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #ccc;
    margin: 0 -5rem -20px;
    padding: 2rem;
    .footer__item {
      
      .logo {
        a {
          display: flex;
          align-items: center;

          img {
            width: 80px;
            margin-right: 15px;
          }

          span {
            font-size: 30px;
            text-transform: capitalize;
            color: var(--main-color);
            font-weight: bold;
          }
        }
      }
      ul {
        list-style: none;
        li {
          color: #3d3d3d;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

`

export default Footer