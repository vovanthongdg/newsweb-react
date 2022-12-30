import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import GetData from '../api/GetData'
import { useNavigate } from 'react-router-dom'
import PostList from './PostList';
import { Pagination } from 'antd';
import "antd/dist/antd.css";

const CardItem = () => {

    
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);

    const getData = async () => {
        const dataByDay = await GetData.getNewsWeb()
        console.log(dataByDay.news);
        const news = dataByDay.news
        setData(news)
        setLoading(false)
    }
    useEffect(()=>{
        getData()
    },[])
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    console.log(currentPosts);

    const handleClick = (id) => {
        navigate(`/hot/${id}`)
        window.scroll(0,0)
    }

    const handleChange = (value) => {
        setCurrentPage(value)
        window.scroll({
            top: 870,
            behavior: 'smooth'
        })
    }


  return (
    <>
        <PostList data={currentPosts} loading={loading} onClick={handleClick} />    
        
        <Container>
            <Pagination
                defaultCurrent={1}
                total={data.length}
                onChange={(value) => {
                    handleChange(value) 
                   }}
                current={currentPage}
                className='panigation'
                
            />
        </Container>
    </>
  )
}

const Container = styled.div`
    margin: 0 auto;
    .panigation {
        position: absolute;
        margin: 1rem auto;
    }
`

export default CardItem