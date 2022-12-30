import React from 'react'
import styled from 'styled-components'
import Banner from '../components/Banner'
import BodyTop from '../components/BodyTop'
import Slideshow from '../components/SlideShow'
import SponsoredNews from '../components/SponsoredNews'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <Container>
      {/* <Header /> */}
        <Banner />
        <Slideshow />
        <BodyTop />
        <SponsoredNews />
      {/* <Footer /> */}
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export default Home