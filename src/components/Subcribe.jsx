import React from 'react'
import styled from 'styled-components'
import '../App.css'

const Subcribe = () => {
  return (
    <Container>
        <h3>Never miss any Update!</h3>
        <p>Get the freshest headlines and updates sent uninterrupted to your inbox.</p>
        <form action="#">
            <div className="inputField">
                <input type='email' placeholder='Enter your email' required/>
                <button type='submit'>Subcribe</button>
            </div>
        </form>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 70px 100px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #0575e6, #021b79);
    border-radius: 5rem;
    overflow: hidden;
    color: white;
    h3 {
        color: white;
        font-size: 28px;
        font-weight: bold;
    }
    p {
        font-size: 20px;
    }
    form {
        .inputField {
            position: relative;
            max-width: 600px;
            margin: 0 auto;
            input {
                outline: none;
                padding: 1rem;
                padding-right: 10rem;
                color: var(--txt-second-color);
            }
            button {
                position: absolute;
                right: 0px;
                top: 4px;
                bottom: 4px;
                margin-right: 4px;
                padding: 0 1.5rem;
                border: none;
                background: var(--main-color);
                border-radius: 4px;
                
            }
        }
    }
`

export default Subcribe