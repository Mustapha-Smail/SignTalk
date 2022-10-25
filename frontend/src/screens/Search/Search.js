import React, { useState } from 'react'
import './Search.css'
import { Navbar, SearchBar, SearchContainer } from '../../components'

const Search = () => {

    const [word, setWord] = useState({})

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
    
    return (
        <>
            <div className='gradient__bg'>
                <Navbar />
                <div className="search__flex section__padding">
                    <SearchBar setWordMethod={setWord}/>
                    { word && !isEmpty(word) && (
                        <SearchContainer word={word}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default Search