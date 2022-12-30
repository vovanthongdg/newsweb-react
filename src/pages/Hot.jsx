import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import HotContent from '../components/HotContent'
import Trending from '../components/Trending'
import Video from '../components/Video'
import GetData from '../api/GetData'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
const Hot = () => {
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState([])
    const {searchText} = useSelector(e => e.search)
    useEffect(()=>{
        const getSearchData = async () => {
            const response = await GetData.searchNews(searchText)
            setSearchData(response.news)
        }
        getSearchData()
    },[searchText])
    console.log(searchData);
  return (
    <Conatiner>
        <div className="section">
            <div className="heading">
                {searchData === undefined ? 'Hot News' : 'Result News'}
            </div>
            <div className="content">
                <HotContent loading={loading} setLoading={value=>setLoading(value)} searchData={searchData}/>
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
    .section {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        border: 1px solid #d8d7d7;
        padding: 1rem;
        .heading {
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
        .content {

        }
    }
    .subContent {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

export default Hot