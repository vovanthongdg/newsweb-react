import React, { useEffect, useState } from 'react'
import { GiSpeaker } from 'react-icons/gi'
import styled from 'styled-components'
import GetData from '../api/GetData'
import { useParams, useNavigate } from 'react-router-dom'


const DetailsNews = () => {
    let {id} = useParams()
    const navigate = useNavigate()
    const [newsData, setNewsData] = useState([])
    const [hotNews, setHotNews] = useState([])
    const [audio,setAudio] = useState([]);
    const [isPlaying,setIsPlaying] = useState(false);

    const getNewsById = async () => {
        const newsById = await GetData.getSingle(id)
        console.log(newsById);
        setNewsData(newsById)
    }

    useEffect(()=> {
        getNewsById()
    },[])

    const handleClick = (id) => {
        navigate(`/hot/${id}`)
        window.location.reload()
        window.scroll(0,0)
    }

    useEffect(()=> {
        const getHotNews = async () => {
            const HotNews = await GetData.getarticlebycategory(newsData.idcategory)
            const hotnews = HotNews.news
            const result = hotnews.filter((item)=> item.idArticle !== id)
            setHotNews(result)
            console.log(HotNews);
        }
        getHotNews()
    },[newsData.idcategory])

    const togglePlay = () => {
        isPlaying ? audio.pause() : audio.play();
    };

    useEffect(()=>{
        const audio_get = document.getElementById('audio')
        if(audio_get != null){
            audio_get.onplaying = function() {
                setIsPlaying(true)
            };
            audio_get.onpause = function() {
                setIsPlaying(false)
            };
            setAudio(audio_get)
        }
    },[])

    

    return (
        <Container>
            <div className="news">
                <h1>{newsData.title}</h1>
                <div className="copyright">
                    <p>By {newsData.namePage}</p>
                    <span>{newsData.createTime}</span>
                </div>
                <span>{newsData.summary}</span>
                <img src={newsData.urlImage} alt="" />
                <p>{newsData.content}</p>
                <audio controls id='audio'>
                    <source src={`http://3.0.209.240/audio/243469.mp3`} type="audio/mpeg"/>
                </audio>
            </div>
            <div className="speaker">
                <GiSpeaker onClick={togglePlay}/>
            </div>

            <div className="more">
                <h3>View more</h3>

                    {
                        hotNews.map((item, index)=> {
                            return (
                                <div className='hotItem' key={index} onClick={()=>handleClick(`${item.idArticle}`)}>
                                    <img src={item.urlImage} alt="" />
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
    position: relative;
    .news {
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
        .copyright {
            display: flex;
            gap: 1rem;
        }
        audio {
            display: none;
        }
    }
    .speaker {
        position: absolute;
        right: 10px;
        top: 5px;
        cursor: pointer;
        svg {
            font-size: 30px;
        }
    }

    .more {
        display: flex;
        flex-direction: column;
        gap: 1rem;
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

        .hotItem {
        display: flex;
        padding: 1rem;
        /* background-color: rgba(234, 234, 237, 0.977); */
        height: 100%;
        width: 100%;
        align-items: center;
        gap: 1rem;
        position: relative;
        margin-bottom: 1rem;
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
    }
`

export default DetailsNews