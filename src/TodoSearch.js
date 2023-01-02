import React from 'react';
import './TodoSearch.css';

function TodoSearch({searchValue, setSearchValue}) {
    const [] = React.useState('');

    const OnSearchValueChange = (e) =>{
        setSearchValue(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className='ContainerSearch'>
            <input className="TodoSearch" 
            placeholder="Search"
            value = {searchValue}
            onChange={OnSearchValueChange}/>
        </div>
    )
}

export {TodoSearch}