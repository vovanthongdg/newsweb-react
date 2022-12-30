import React from 'react'
import styled from 'styled-components'
import SponsoredItem from './SponsoredItem'

const SponsoredNews = () => {
  return (
    <Container>
        <h2>Sponsored News</h2>
        <div className="content">
            <SponsoredItem />
        </div>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h2 {
        font-size: 30px;
        line-height: 1em;
        font-weight: 700;
        color: #444444;
        margin: 0;
        margin-top: 0px;
        position: relative;
        text-transform: capitalize;
        padding-bottom: 20px;

        &::before {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100px;
            height: 5px;
            border-radius: 6px;
            background: var(--main-color);
            content: "";
        }

        &::after {
            position: absolute;
            left: 110px;
            bottom: 0;
            width: 30px;
            height: 5px;
            border-radius: 6px;
            background: var(--main-color);
            content: "";
        }
    }

    .content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 1rem;
    }
`

export default SponsoredNews