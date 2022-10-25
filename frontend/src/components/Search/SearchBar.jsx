import React, { useEffect, useState } from 'react'
import ReactAutocomplete from 'react-autocomplete'
import axios from 'axios'
import { capitalize } from 'lodash'
import './Search.css'

const SearchBar = ({setWordMethod}) => {
    
    const [value, setValue] = useState('')
    const [words, setWords] = useState([])

    const getData = async () => {
        try {
            const { data } = await axios.get('/api/dictionary')
            setWords(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
      getData()
    }, [])

    return (
        <ReactAutocomplete
            items={words}
            inputProps={{placeholder: 'Search...', className:'searchTerm'}}
            shouldItemRender={(item, value) => item.gloss.toLowerCase().startsWith(value.toLowerCase()) }
            getItemValue={item => item.videoId}
            renderItem={(item, highlighted) =>
                <div
                    key={item._id}
                    className={'searchBox'}
                    style={{ backgroundColor: highlighted ? '#eee' : 'white'}}
                >
                    {capitalize(item.gloss)}
                </div>
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSelect={(value, item) => {setWordMethod({videoId: value, gloss: capitalize(item.gloss)})}}
        />
    )
}

export default SearchBar