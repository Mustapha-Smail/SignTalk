import React from 'react'
import './Home.css'

import { Brand, Footer, Header, Navbar, WhatSignTalk } from "../../components";

const Home = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <WhatSignTalk />
      <Footer />
    </>
  )
}


export default Home