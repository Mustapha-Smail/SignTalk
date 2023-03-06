import React from 'react'
import './Memory.css'
import { MemoryContainer, Navbar } from '../../components'


const Memory = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
        <MemoryContainer />
      </div>
    </>
  );
}

export default Memory