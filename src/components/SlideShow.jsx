import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';
import  Carousel  from 'nuka-carousel';
import '../App.css'
import { useNavigate } from 'react-router-dom';

import GetData from '../api/GetData';


const Slideshow = () => {

    const navigate = useNavigate()
    const [slideShow, setSlideShow] = useState([])
    const getData = async () => {
        const getarticlebycategory = await GetData.getarticlebycategory(3)
        const slides =  getarticlebycategory.news
        console.log(slides);
        setSlideShow(slides)
    }
    useEffect(() => {
        getData()
    },[])

    const handleClick = (id) => {
        navigate(`/hot/${id}`)
        window.scroll(0,0)
    }
    return (
        <>
        <span
            style={{
                fontSize: 15,
                paddingTop:5,
                paddingBottom:5,
                paddingLeft: 10,
                paddingRight: 10,
                background:'var(--main-color)',
                display: 'flex',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                color: '#fff',
                marginBottom: "-1rem",
                width: 130,
                justifyContent: "center"

            }}  
        >Breaking news</span>
        <Carousel
            wrapAround={true} slidesToShow={3}
            autoplay={true}
            withoutControls={true}
            // cellAlign="center"
            style={{border: "1px solid #d8d7d7"}}
        >
            {
                slideShow.map((item, index)=> {
                    return (
                        <Container  key={index} onClick={()=>handleClick(`${item.idArticle}`)}>
                            <img src={item.urlImage} alt=''/>
                            <div className='itemSlide'>
                                <span>{item.createTime}</span>
                                <p className="legend">{item.title}</p>
                            </div>
                        </Container>
                    )

                })
            }   
        </Carousel>
        </>
    )
}

const Container = styled.div`      
    border-right: .5px solid #d8d7d7; 
    border-left: .5px solid #d8d7d7;
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
        width: 100px;
        height: 100px;
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
`

export default Slideshow