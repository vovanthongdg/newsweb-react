import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NewsCategory = props => {
  return (
    <Container>
        <Link to={`/hot/${props.idArticle}`} className='hotItem'>
            <img src={props.urlImage} alt="" />
            <div className='itemSlide'>
                <span>{props.createTime}</span>
                <p className="legend">{props.title}</p>
            </div>
        </Link>

        
        {/* <h1>{props.title}</h1>
        <span>{props.createTime}</span>
        <span>{props.summary}</span>
        <img src={props.urlImage} alt="" />
        <p>{props.content}</p>
        <audio controls>
            <source src={props.audio} type="audio/mpeg"/>
        </audio> */}

    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 99;
    padding: .5rem 1rem;
    .hotItem {
        display: flex;
        padding: 1rem;
        background-color: rgba(234, 234, 237, 0.977);
        height: 100%;
        width: 100%;
        align-items: center;
        gap: 1rem;
        position: relative;
        /* margin-bottom: 1rem; */
        img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
        }

        .itemSlide {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: flex-start;
        span {
            color: var(--txt-second-color);
        }
        p {
            font-weight: 500;
            cursor: pointer;
        }
        p:hover {
            color: var(--main-color);
        }
        } 
    }
`

NewsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    createTime: PropTypes.string.isRequired,
    idArticle: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
}

export default NewsCategory