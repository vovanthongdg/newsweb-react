import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NewsCategory from '../components/NewsCategory'
import Trending from '../components/Trending'
import Video from '../components/Video'
import { useParams } from 'react-router-dom'
import GetData from '../api/GetData'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';
import Loading from '../components/Loading'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Category = () => {

    const {categoryId} = useParams()
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false);
    
    const loadMoreData = () => {
        if (loading) {
          return;
        }
        setLoading(true);
        const getNews = async () => {
            const newsByCategory = await GetData.getarticlebycategory(categoryId)
            console.log('======',newsByCategory.news.slice(0,10));
            setData([...data,...newsByCategory.news])
        }
        getNews()
        .catch(() => {
            setLoading(false);
        });

      };

    useEffect(()=> {
        loadMoreData()
        // const getNews = async () => {
        //     const newsByCategory = await GetData.getarticlebycategory(categoryId)
        //     console.log('======',newsByCategory.news);
        //     setData(newsByCategory.news)
        // }
        // getNews()
    },[])


  return (
      <Container>
        <div className="content" id="scrollableDiv"
            style={{
                height:"210vh",
                overflow: 'auto',
                // padding: '1rem',
                // border: '1px solid rgba(140, 140, 140, 0.35)',
        }}>
                <div className="heading">{data.find((e)=>categoryId===e.idCategory)?.nameCategory}</div>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 10}
                    loader={ <Loading />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                    
                >
                {data.map((item,index)=> {
                    return (
                        <NewsCategory 
                            title={item.title}
                            createTime={item.createTime}
                            urlImage={item.urlImage}
                            idArticle={item.idArticle}
                            key={index}
                        />

                    )
                })}
                </InfiniteScroll>
        </div>
        <div className="subContent">
            <Trending category={category} setCategory={setCategory}/>
            <Video />
        </div>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    .heading {
        position: relative;
        font-size: 23px;
        font-size: 1.53333rem;
        color: #232f4b;
        margin: 0 0 1.3em;
        position: relative;
        text-transform: capitalize;
        padding-bottom: 20px;
        margin: 1rem;
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
    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 1px solid #d8d7d7;
        
    }
    .subContent {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

`

export default Category