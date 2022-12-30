import './App.css';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Home from './pages/Home';
import { BsArrowUpShort } from 'react-icons/bs'
import { Routes, Route } from 'react-router-dom'
import VideoPage from './pages/VideoPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Hot from './pages/Hot';
import News from './pages/News';
import VideoDetailPage from './pages/VideoDetailPage';
import Category from './pages/Category';
import Login from './pages/Login';
import { useNavigate,useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';
function App() {
  const { pathname } = useLocation();
  const [showHeaderFooter,setShowHeaderFooter] = useState(true)

  useEffect(()=>{
    if(pathname == "/login" || pathname == "/signup"){
      setShowHeaderFooter(false)
    }else{
      setShowHeaderFooter(true)
    }
  },[pathname])
  useEffect(() => {
    window.onscroll = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnOnTop").style.display = "block";
      } else {
        document.getElementById("btnOnTop").style.display = "none";
      }
    }
  })

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  
  return (

    <Container>
      <div className="blur" style={{top:'-18%', right: 0}}></div>
      <div className="blur" style={{top:'30%', left: '-8rem'}}></div>
      <div className='scrollTop' id='btnOnTop' onClick={scrollToTop}>
        <BsArrowUpShort />
      </div>
    
          {showHeaderFooter ?  <Header /> : null } 
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/video' element={<VideoPage />}/>
          <Route path='/video/:videoId' element={<VideoDetailPage />}/>
          <Route path='/hot' element={<Hot />} />
          <Route path='/hot/:id' element={<News />} />
          <Route path='/category/:categoryId' element={<Category />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>

        {showHeaderFooter ?  <Footer />  : null } 
        
      
      
         
  
        
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: var(--black);
    background-color: #f3f3f3;
    padding: 1rem 5rem;
    gap: 1rem;
    .blur {
      position: absolute;
      width: 22rem;
      height: 14rem;
      border-radius: 50%;
      background: #a6ddf0;
      filter: blur(72px);
    }
    .scrollTop {
      display: none;
      width: 50px;
      height: 50px;
      position: fixed;
      bottom: 20px;
      right: 30px;
      z-index: 99;
      border: 2px solid var(--main-color);
      outline: none;
      background-color: rgba(55, 86, 247, 0.7);
      color: white;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      svg {
        font-size: 30px;
        font-weight: 100;
      }
      &:hover {
        background-color: var(--main-color);
      }
    }
`

export default App;


