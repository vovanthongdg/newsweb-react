import React from 'react'
import styled from 'styled-components'
import Trending from '../components/Trending'
import Video from '../components/Video'
import VideoDetail from '../components/VideoDetail'

const VideoDetailPage = () => {
  return (
    <Conatiner>
        <div className="section">
            <div className="content">
                <VideoDetail />
            </div>
        </div>
        <div className="subContent">
            <Trending />
            <Video />
        </div>
    </Conatiner>
  )
}

const Conatiner = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    z-index: 99;
    .section {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        border: 1px solid #d8d7d7;
        padding: 1rem;
       
        .content {

        }
    }
    .subContent {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

export default VideoDetailPage