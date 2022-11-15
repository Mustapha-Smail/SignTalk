import React, { useState } from 'react'
import './Decomposition.css'
import { DecompoCarousel, Navbar, SearchBar } from '../../components';
import axios from 'axios';

const Decomposition = () => {
    const [letters, setLetters] = useState([])
    
    const getData = async ({videoId, gloss}) => {
        try {
            const { data } = await axios.get(`/api/alphabet/word/${gloss}`)
            setLetters(data)    
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='gradient__bg'>
                <Navbar/>
                <div class="st__decompo">
                    <SearchBar setWordMethod={getData}/>
                </div>
                <DecompoCarousel letters={letters}/>
            </div>
        </>
    )
}

export default Decomposition