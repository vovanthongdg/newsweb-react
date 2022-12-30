import React from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'
import {MdAddCircleOutline} from 'react-icons/md'
import GetData from '../api/GetData'
import {message} from 'antd'

const Posts = ({urlImage, category, title, create_time, summary, idArticle, name_page}) => {
    
    const navigate = useNavigate()
    const id_user = JSON.parse(localStorage.getItem('user'))
    const handleClick = () => {
        navigate(`/hot/${idArticle}`)
        window.scroll(0,0)
    }

    const handleSave = () => {
        const saveNews = async () => {
            const response = await GetData.saveNews(id_user.userId, idArticle)
            console.log(response);
            if(response.success) {
                message.success(response.message)
            } else {
                message.error(response.message)
            }
        } 
        saveNews()
    }
return (
    <Container >
            <div className='itemImg'>
                <img src={urlImage} alt="" />
                <div className="thumb">{category}</div>
                <div className='savenew' onClick={()=>handleSave()}>
                    <MdAddCircleOutline />
                </div>
                
            </div>
            <div className="itemTitle" onClick={()=> handleClick()}>
                <h3>{title}</h3>

            </div>
            <div className='itemAuth' onClick={()=> handleClick()}>
                <span >{name_page}</span> 
                <span className='author'>{create_time}</span>
            </div>
            <div className="desc" onClick={()=> handleClick()}>
                <p>{summary}</p>
            </div>
    </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
    border-bottom: 1px solid #e8e4e4;
    cursor: pointer;

    .itemImg {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        .thumb {
            position: absolute;
            left: 15px;
            top: 15px;
            padding: 7px 25px 6px;
            background: var(--main-color);
            color: #fff;
            text-transform: uppercase;
            font-size: 14px;
            border-radius: 5px;
        }
        .savenew {
            position: absolute;
            right: 15px;
            top: 15px;
            padding: 9px;
            background: var(--main-color);
            color: #fff;
            border-radius: 5px;
            z-index: 9999;
            display: flex;
            align-items: center;
            svg {
                font-size: 18px;
            }
        }
        
    }

    img {
        width: 100%;
        height: 250px;
        border-radius: 1rem;
        transform: scale(1);
        filter: grayscale(0);
        &:hover {
            transform: scale(1.2);
            filter: grayscale(100%);
            transition: all .3s;
        }
    }

    .itemTitle {
        display: block;
        display: -webkit-box;
        max-width: 100%;
        height: 3.2rem;
        margin: 0 auto;
        font-size: 1.1rem;
        line-height: 1.2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }


    .itemAuth {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: var(--main-color);
        font-size: 1rem;
        .author {
            position: relative;
            margin-left: 1rem;
        }
        .author::before {
            position: absolute;
            left: -12px;
            top: 10px;
            width: 5px;
            height: 5px;
            content: "";
            background: var(--main-color);
            border-radius: 50%;
        }
    }
    .desc {
        display: block;
        display: -webkit-box;
        max-width: 100%;
        height: 5rem;
        margin: 0 auto;
        font-size: 1rem;
        line-height: 1.2;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
    }

`

export default Posts