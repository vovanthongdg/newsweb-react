import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import GetData from '../api/GetData'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([])
    const getData = async () => {
        const dataByDay = await GetData.getByDay()
        console.log(dataByDay.news);
        const news = dataByDay.news
        setData(news)
    }
    useEffect(()=>{
        getData()
    },[])

    const handleClick = (id) => {
        navigate(`/hot/${id}`)
        window.scroll(0,0)
    }

  return (
    <Container>
        {
            data.map((item,index) => {
                return(
                    <div className="itemLeft" key={index} onClick={()=> handleClick(`${item.idArticle}`)}>
                        <div className='itemLeft__img'>
                            <img src={item.urlIamge} alt="" />
                        </div>
                        <div className='itemLeft__content'>
                            <span className='category'>{item.category}</span>
                            <h3>{item.title}</h3>
                            <h6>{item.summary}</h6>
                            <div>
                                <span >{item.name_page}</span> 
                                <span className='author'>{item.create_time}</span>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    grid-template-rows: 16rem 16rem;
    grid-template-areas: 
    "aa aa bb bb"
    "aa aa cc dd";
    gap: 1rem;
    padding-top: 1rem;
    margin-bottom: 1rem;
    .itemLeft {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        border-radius: 1rem;
        &__img {
            overflow: hidden;
            width: 100%;
            height: 100%;
            img {
                border-radius: 1rem;
                height: 100%;
                width: 100%;
                transform: scale(1);
                transition: all .3s;
            }
        }
        &__img::before {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            content: "";
            background: rgba(7, 7, 7, 0.4);
            border-radius: 1rem;
            z-index: 11;
        }

        &__content {
            position: absolute;
            bottom: 2rem;
            left: 2rem;
            display: flex;
            flex-direction: column;
            z-index: 99;
            gap: 1rem;
            .category {
                padding: 4px 8px;
                color: var(--main-color);
                background-color: #d2d0d0;
                font-weight: bold;
                border-radius: 4px;
                align-self: flex-start;
            }
            h3 {
                color: white;
                font-size: 1.8rem;
                font-weight: 600;
                /* word-wrap: break-word;
                overflow: hidden; */

                display: block;
                display: -webkit-box;
                max-width: 100%;
                height: 2.6rem;
                font-size: 1.1rem;
                line-height: 1.3rem;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h6 {
                color: white;
                font-size: 1.1rem;
                font-weight: 400;
            }
            div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                color: white;
                font-size: 1rem;
                .author {
                    position: relative;
                    margin-left: 1rem;
                }
                .author::before {
                    position: absolute;
                    left: -12px;
                    top: 10px;
                    width: 8px;
                    height: 8px;
                    content: "";
                    background: #fff;
                    border-radius: 50%;
                }
            }
            
        }
    }

    .itemLeft:hover .itemLeft__img img{
        transform: scale(1.2);
    }
    .itemLeft:first-child {
        grid-area: aa;
    }
    .itemLeft:nth-child(2) {
        grid-area: bb;
    }

    .itemLeft:nth-child(2) .itemLeft__content h6,
    .itemLeft:nth-child(3) .itemLeft__content h6,
    .itemLeft:nth-child(4) .itemLeft__content h6 {
        display: none;
    }

    .itemLeft:nth-child(3) {
        grid-area: cc;
    }
    .itemLeft:last-child {
        grid-area: dd;
    }

    
`

export default Banner