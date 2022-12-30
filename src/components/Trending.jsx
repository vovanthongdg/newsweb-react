import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import GetData from '../api/GetData'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'react-loading-ui'

const Trending = () => {

    const navigate = useNavigate()
    const [category, setCategory] = useState([])

    
    const getCategories = async () => {
        const response = await GetData.getcategory()
        console.log(response);
        setCategory(response)
    }

    useEffect(()=>{
        getCategories()
    },[])

    const handleClick = (id) => {
        navigate(`/category/${id}`)
        window.location.reload()
        window.scroll(0,0)
    }
  return (
    <Container>
        <h3>Trending Topics</h3>

        {
            category.map((item, index)=> {
                return (
                    <div className='trendingItem' key={index} onClick={()=>handleClick(`${item.idCategory}`)}>
                        <MdOutlineKeyboardArrowRight />
                        <div className='itemSlide' >
                                <Link className='link'>{item.nameCategory}</Link>
                        </div>
                    </div>
                )
            })
        }
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    border: 1px solid #d8d7d7;
    /* z-index: -1; */
    h3 {
        position: relative;
        font-size: 23px;
        font-size: 1.53333rem;
        color: #232f4b;
        margin: 0 0 1.3em;
        position: relative;
        text-transform: capitalize;
        padding-bottom: 20px;
        &::after {
            content: "";
            background-color: #c9c9c9dd;
            width: 80%;
            height: 4px;
            position: absolute;
            left: 65px;
            bottom: 0;
            border-radius: 10px;
        }
        &::before {
            content: "";
            background-color: var(--main-color);
            width: 55px;
            height: 4px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-radius: 10px;
        }
    }

    .trendingItem {
        display: flex;
        padding: 1rem;
        background-color: rgba(234, 234, 237, 0.977);
        height: 100%;
        width: 100%;
        align-items: center;
        gap: 1rem;
        position: relative;
        margin-bottom: 1rem;
        &:hover {
            color: var(--main-color);
            cursor: pointer;
        }
        img {
            width: 70px;
            height: 70px;
            border-radius: 8px;
        }

        .itemSlide {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: hidden;
        justify-content: flex-start;

        .link {
            color: var(--txt-second-color);
            font-size: 24;
        }
        .link:hover {
            color: var(--main-color);
            
        }
        } 
    }
`

export default Trending