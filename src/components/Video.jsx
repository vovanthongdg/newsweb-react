import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GetData from '../api/GetData'
import { useNavigate } from 'react-router-dom'

const Video = () => {

    const navigate = useNavigate()
    const [videos, setVideos] = useState([])
    useEffect(()=> {
        const VideoData = async() => {
            const response = await GetData.getVideoWeb()
            console.log(response.videos);
            setVideos(response.videos)
        }
        VideoData()
    },[])

    const handleClick = (id) => {
        navigate(`/video/${id}`)
        window.scroll(0,0)
    }
  return (
    <Container>
        <h3>Videos</h3>
        {
            videos.map((item, index)=> {
                return (
                    <div className='videoItem' key={index} onClick={()=> handleClick(`${item.idVideo}`)}>
                        <img src={item.urlImage} alt=''/>
                        <div className='itemSlide'>
                            <span>{item.createTime}</span>
                            <p className="legend">{item.title}</p>
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

    .videoItem {
        display: flex;
        padding: 1rem;
        background-color: rgba(234, 234, 237, 0.977);
        height: 100%;
        width: 100%;
        align-items: center;
        gap: 1rem;
        position: relative;
        margin-bottom: 1rem;
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

export default Video