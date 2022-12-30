import React, {useState, useEffect} from 'react'

import styled from 'styled-components'
import GetData from '../api/GetData'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';


const HotContent = ({loading, setLoading, searchData}) => {
    const [hotnews, setHotNews] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return;
          }
          setLoading(true)
          const getHotNews = async () => {
              const newshot = await GetData.getNewsWeb()
              setHotNews(newshot.news)
              setLoading(false)
          }
          getHotNews()
          .catch (() => {
              setLoading(false)
          }
        ) 
    }

    console.log('======',searchData);

    useEffect(()=> {
        loadMoreData()
    },[])

  return loading ? (<Loading />) : (

      <Container>
        <div className="content" id="scrollableDiv"
            style={{
                height:"210vh",
                overflow: 'auto',
                // padding: '1rem',
                // border: '1px solid rgba(140, 140, 140, 0.35)',
        }}>

            <InfiniteScroll         
                    dataLength={hotnews.length}
                    next={loadMoreData}
                    hasMore={hotnews.length < 10}
                    loader={ <Loading />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                    
                >
            { searchData === undefined ?
                hotnews.map((item, index)=> {
                    return (
                        <Link to={`/hot/${item.idArticle}`} className='hotItem' key={index}>
                            <img src={item.urlIamge} alt="" />
                            <div className='itemSlide'>
                                <span>{item.create_time}</span>
                                <p className="legend">{item.title}</p>
                            </div>
                        </Link>
                    )
                }) :
                searchData.map((item, index)=> {
                    return (
                        <Link to={`/hot/${item.idArticle}`} className='hotItem' key={index}>
                            <img src={item.urlImage} alt="" />
                            <div className='itemSlide'>
                                <span>{item.create_time}</span>
                                <p className="legend">{item.title}</p>
                            </div>
                        </Link>
                    )
                })
            }
            </InfiniteScroll>
            
        </div>
        </Container>
  
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
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
`

export default HotContent