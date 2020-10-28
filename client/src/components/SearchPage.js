import React, {useState} from 'react';
import axios from 'axios';

import { Input } from 'antd';

import BookCard from './BookCard';
import '../css/booksearch.css';

const { Search } = Input;

function SearchPage() {
    const [books, setBooks ] = useState([]); 
    const [searchInput, setSearchInput] = useState(''); 
    //const [loading, setLoading] = useState(false);

    function handleInput(event) {
        setSearchInput(event.target.value.trim());
    }

    /*
	* api fetch using searchInput as the query 
	*/
    function handleSearch() {
        if (searchInput.length === 0 || !searchInput) {
            //TODO: error messages
            return;
        }

        axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchInput+'&key=AIzaSyC8h_mfSuQv6QnzAbucMydsQlFOVEvhU_o')
        .then(response => {
            console.log(response.data.items);
            setBooks(response.data.items);
        })
        .catch(function (error) {
            //TODO: error messages
            console.log(error);
        })

 }


	return (
		<div className="bookSearch">
            <div id="numInput">
                <Search onChange={handleInput} placeholder="Book Title" onSearch={handleSearch} enterButton />
            </div>
            
            <div className="listing">
            {
                books && books.map((item, i) => {
                    handleUndefinedData(item); 
                    return <BookCard key={item.id}
                        name={item.volumeInfo.title} 
                        thumbnail={item.volumeInfo.imageLinks.thumbnail} 
                        subtitle= {item.volumeInfo.subtitle}
                        authors = {item.volumeInfo.authors}
                        isLibraryRender={false}
                    />
                    
                })
            }
            </div>
        </div>
	);
}

/*
handle any undefined data from the api call before mapping
*/
function handleUndefinedData(item) {
    if (isUndefined(item.volumeInfo.imageLinks)) {
        item.volumeInfo.imageLinks = {
            thumbnail: "default",
            smallThumbnail: "default"
        }
    }

    if (isUndefined(item.volumeInfo.subtitle)) 
        item.volumeInfo.subtitle = false;
    
    if (isUndefined(item.volumeInfo.authors))    
        item.volumeInfo.authors = [" "];
    
    if (isUndefined(item.volumeInfo.title)) 
        item.volumeInfo.title = " ";
}

/*
* undefined handling
*/
function isUndefined(object) {
    return typeof(object) === 'undefined' ? true : false; 
}

export default SearchPage;
