import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import "../App.css";
import { searchItem } from "../store/slice/searchSlice";
import { useDispatch } from "react-redux";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import {message} from 'antd'
import { Button, Drawer, Radio, Space } from 'antd';
import GetData from '../api/GetData'
import '../assets/style/saveNews.css'

const mainNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Hot",
    path: "/hot",
  },
  {
    display: "Video",
    path: "/video",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const getUser = localStorage.getItem("user");
  const user = JSON.parse(getUser);
  const [input, setInput] = useState("");

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [savedNews, setSavedNews] = useState([])
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    dispatch(searchItem(input));
    navigate("/hot");
  };

  const handleLogin = () => {
    navigate("/login");
    window.location.reload()
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    message.success('Đăng xuất thành công')
  };

  useEffect(()=> {
    const idUser = JSON.parse(localStorage.getItem('user'))
    const getNewsSave = async () => {
      const response = await GetData.getNewsSave(idUser?.userId)
      setSavedNews(response.news)
    }
    getNewsSave()
  },[])

  const handleClick = (id) => {
    navigate(`/hot/${id}`)
    window.location.reload();
  }

  const DrawerItem = () => (
    savedNews.map((item, index)=> {
      return (
        <div className='newsItem' key={index} onClick={()=> handleClick(`${item.idArticle}`)}>
            <img className="imageSave" src={item.urlImage} alt=''/>
            <div className='itemSlide'>
                <span className="timeSave">{item.createTime}</span>
                <p className="legend">{item.title}</p>
            </div>
        </div>
    )
    })
)


  return (
    <Container>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
            <span>Fast News</span>
          </Link>
        </div>
        <div className="menu">
          {mainNav.map((item, index) => {
            return (
              <div key={index}>
                <Link
                  onClick={() => {
                    dispatch(searchItem(""));
                    setInput("");
                  }}
                  to={item.path}
                  className={`item ${index === activeNav ? "active" : ""}`}
                >
                  <span>{item.display}</span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="search">
          <div className="inputSearch">
            <input
              type="text"
              value={input}
              onInput={(e) => setInput(e.target.value)}
            />
            <div className="iconSearch">
              <BiSearch onClick={() => handleSearch()} />
            </div>
          </div>
          {/* <BiMenu /> */}
          {user ? (
            <div class="dropdown">
              <span className="username dropbtn">{user.username}</span>
              <div class="dropdown-content">
                <a onClick={()=> showDrawer()}>Save</a>
                <a onClick={() => handleLogout()}>Log out</a>
              </div>
            </div>
          ) : (
            <AiOutlineUser onClick={() => handleLogin()} />
          )}
        </div>
        <Drawer
          title="News Saved"
          placement={'right'}
          closable={false}
          onClose={onClose}
          open={open}
          className='drawer'
          width='500px'
        >
          <DrawerItem />
        </Drawer>
      </div>
    </Container>
  );
 }

const Container = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    z-index: 99;
    .logo {
      img {
        width: 50px;
        padding-bottom: 4px;
      }

      span {
        font-weight: 600;
        font-size: 1.3rem;
        margin-left: 8px;
        color: var(--main-color);
        margin-top: 2px;
      }
    }
    .menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        margin: 0 2rem;
        color: var(--txt-main-color);
        font-size: 1.4rem;
      }
      .active {
        color: var(--main-color);
        font-weight: bold;
      }
    }
    .search {
      display: flex;
      z-index: 99;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      .inputSearch {
        position: relative;
        input {
          outline: none;
          border: none;
          padding: 0.5rem;
          border-radius: 8px;
        }

        .iconSearch {
          position: absolute;
          right: 6px;
          top: 6px;
          svg {
            background-color: #86bddf;
            padding: 4px;
            border-radius: 4px;
            color: white;
          }
          svg:hover {
            background-color: var(--main-color);
            cursor: pointer;
          }
        }
      }
      svg {
        font-size: 26px;
        font-weight: bold;
      }

      .dropbtn {
        position: relative;
        background-color: #fff;
        color: #3d3d3d;
        padding: 8px 10px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        border-radius: 8px;
      }

      .dropdown {
        position: relative;
        display: inline-block;
        z-index: 100;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        right: 0;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 100 !important;
        margin-top: 8px;
      }

      .dropbtn::before {
        content: '';
        position: absolute;
        right: 10;
        top: 50;
        border-width: 20px 30px;
        /* background-color: red; */
        border: 20px;
        /* height: 20px; */
        /* width: 200px; */
        border-color: transparent transparent white transparent;
      }

      .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
      }

      .dropdown-content a:hover {
        background-color: #f1f1f1;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }

      .dropdown:hover .dropbtn {
        background-color: gray;
      }
    }

  }
  
  
  .active {
    color: var(--main-color);
    font-weight: bold;
  }
`;

export default Header;
