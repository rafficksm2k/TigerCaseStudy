import React, { useState } from "react";
import Select from 'react-select';

const Search = (props) => {

    const [searchKey, setSearchKey] = useState('');
    const [searchvalue, setSearchValue] = useState('');

    function onInputChange(e) {
        setSearchValue(e.target.value);
        if (!e.target.value)
            props.onSearch('', '');
        else
            props.onSearch(searchKey, e.target.value);
    }

    const options = [
        { value: 'StoreID', label: 'Store ID' },
        { value: 'SKU', label: 'SKU' },
        { value: 'ProductName', label: 'Product' },
        { value: 'Price', label: 'Price' },
        { value: 'Date', label: 'Date' }
    ];

    function onChange(e) {
        setSearchKey(e.value);
        setSearchValue('');
        props.onSearch('', '');
    }

    function onClear() {
        setSearchValue('');
        props.onSearch('', '');
    }

    function uploadNew() {
        setSearchValue('');
        props.uploadNew();
    }

    return (
        <div class="search-flex">

            Search By: <div class="select-cn"><Select options={options} onChange={(e) => onChange(e)} /></div>

            <input placeholder="Search Text" class="form-control" id="inputdefault" type="text"
                onChange={(e) => onInputChange(e)} value={searchvalue} />

            <button type="button" class="btn btn-info btn-clear" onClick={() => onClear()}>Clear</button>
            <button type="button" class="btn btn-info btn-clear" onClick={() => uploadNew()}>Back</button>
        </div>
    )
};

export default Search;
