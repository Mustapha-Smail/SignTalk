import React from 'react'
import './AlphabetMenuMobile.css'
import { RiCloseLine } from 'react-icons/ri'
import { TiSortAlphabeticallyOutline } from 'react-icons/ti'
import { AlphabetMenu } from '../../../components'

const AlphabetMenuMobile = ({ alphabet, toggleMenu, onClickFirstMethod, onClickSecondMethod }) => {
  return (
    <>
      <TiSortAlphabeticallyOutline color="#fff" size={27} onClick={onClickSecondMethod} />

      <div className={`st__grid-menu ${toggleMenu ? 'st__grid-menu-width' : ''}`}>
          <div class="st__grid-closebtn">
              <RiCloseLine color="#fff" size={27} onClick={onClickSecondMethod} />
          </div>
          <div className='st__grid-menu-content'>
              <AlphabetMenu alphabet={alphabet} onClickFirstMethod={onClickFirstMethod} onClickSecondMethod={onClickSecondMethod} />
          </div>
      </div>
    </>
  )
}

export default AlphabetMenuMobile