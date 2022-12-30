import React, { useState, useEffect } from 'react'
import HoverVideoPlayer from 'react-hover-video-player';
import styled from 'styled-components'
import GetData from '../api/GetData'
import { Link } from 'react-router-dom';
import '../App.css'

const VideoItem = () => {
    const [videos, setVideos] = useState([])
    useEffect(()=> {
        const getVideos = async () => {
            const videos = await GetData.getVideo()
            console.log(videos);
            setVideos(videos)
        }
        getVideos()
    },[])
  return (
    <Container>
        {
            videos.map((item, index)=> {
                return (
                    <Link to={item.idVideo} className='haizz' key={index}>
                        <div className="video" >
                            <HoverVideoPlayer
                                videoSrc={item.urlVideo}
                                style={{
                                    // Make the image expand to cover the video's dimensions
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                                pausedOverlay={
                                    <img
                                        src={item.urlImage}
                                        alt=""
                                        style={{
                                            // Make the image expand to cover the video's dimensions
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                }
                                
                            />
                        </div>        
                        <div className="title">{item.title}</div>    
                        <span>{item.createTime}</span>        
                    </Link>
                )
            })
        }
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 1rem;
    overflow: hidden;
    .haizz {
        border-bottom: 1px solid #d8d7d7;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 1rem;
        cursor: pointer;
        .video {
            height: 200px;
            width: 100%;
            object-fit: contain;
            overflow: hidden;
        }
        .title {
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
        span {
            color: var(--main-color);
            font-size: 1rem;
        }
    }
`

export default VideoItem