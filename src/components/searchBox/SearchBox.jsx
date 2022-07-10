import React from 'react'
import './searchBox.css'

const SearchBox = (props) => {
    return (
        <div className="search__input">
            <input
                value={props.value}
                onChange={(event) => props.setSearchValue(event.target.value)}
                placeholder="Type to search..." />
        </div>

    )
}

export default SearchBox