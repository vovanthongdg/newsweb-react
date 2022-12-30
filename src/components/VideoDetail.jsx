import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GetData from '../api/GetData'
import ReactPlayer from 'react-player'
import HoverVideoPlayer from 'react-hover-video-player';
import { useParams, useNavigate } from 'react-router-dom'


const VideoDetail = () => {
    let {videoId} = useParams()
    const navigate = useNavigate()
    const [videoData, setVideoData] = useState([])
    const [allVideo, setAllVideo] = useState([])
    
    const getVideosById = async () => {
        const videoById = await GetData.getVideoByid(videoId)
        setVideoData(videoById.video)
    }
    
    useEffect(()=> {
        getVideosById()
    },[])

    useEffect(()=> {
        const getAllVideos = async () => {
            const getAllVideo = await GetData.getVideo()
            const result = getAllVideo.filter((item)=> item.idVideo !== videoId)
            setAllVideo(result)
        }
        getAllVideos()
    },[])

    const handlerClick = (id) => {
        navigate(`/video/${id}`)
        window.location.reload();
        window.scroll(0,0)
    }

    return (
        <Container>
            <div className="video">
                <h1>{videoData.title}</h1>
                <span>{videoData.createTime}</span>
                
                <ReactPlayer url={`${videoData.urlvideo}`}
                    controls={true}
                    width={"100%"}
                />
                <span>{videoData.summary}</span>
                <img src={videoData.urlImage} alt="" />
            </div>
            <div className="more">
                <h3>View more</h3>
                {
                    allVideo.map((item, index)=> {
                        return (
                            <div className='videoItem' key={index} onClick={()=> handlerClick(`${item.idVideo}`)}>
                                <div className="videoImage">
                                    <HoverVideoPlayer
                                        videoSrc={item.urlvideo}
                                        style={{
                                            // Make the image expand to cover the video's dimensions
                                            width: '60%',
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
                                <div className='itemSlide'>
                                    <span>{item.createTime}</span>
                                    <p className="legend">{item.title}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Container>
                    
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 99;
    .video {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        img {
            width: 60%;
            align-self: center;
        }
        p {
            text-align: justify;
        }
    }
    .more {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
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
            cursor: pointer;
            .videoImage {
                width: 150px;
                height: 80px;
                border-radius: 8px;
                z-index: 999;
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
    }
`

export default VideoDetail