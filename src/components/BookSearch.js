import React, {useState, useEffect} from 'react';

import request from 'superagent';
import { Input , Layout, Button, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Book from './Book';
import '../css/booksearch.css';

const { Search } = Input;


function BookSearch() {
    const [books, setBooks ] = useState([]);
    const [searchInput, setSearchInput] = useState(' ');
    const [loading, setLoading] = useState(false);

    function handleInput(event) {
        setSearchInput(event.target.value);
    }

    /* Use for live updating search results (causes 429 )
    useEffect(() => {
        handleSearch();
    }, [searchInput]);
    */
    function handleSearch() {
        
        if (searchInput.length === 0 || !searchInput.trim()) {
            console.log("enter something lol");
        } else {
            console.log("fetching [" + searchInput.trim() +"] ");
            fetch("https://www.googleapis.com/books/v1/volumes?q="+searchInput.trim()+"&key=AIzaSyC8h_mfSuQv6QnzAbucMydsQlFOVEvhU_o")
            .then(response => response.json())
            .then(response => { 
                if (searchInput.length !== 0 || searchInput.trim()) 
                        setBooks(response.items);
            
            })
            
        }   

    }

	return (
		<div className="bookSearch">
            <div id="numInput">
                <Search onChange={handleInput} placeholder="Book Title" onSearch={handleSearch} enterButton />
            </div>
            <div className="listing">
            {
                books && books.map((item, i) => {
                    if (typeof(item.volumeInfo.imageLinks) === 'undefined') {
                        item.volumeInfo.imageLinks = {
                            thumbnail: "default",
                            smallThumbnail: "default"
                        }
                    }
                    if (typeof(item.volumeInfo.subtitle) === 'undefined') {
                        item.volumeInfo.subtitle = false;
                    } 
                    if (typeof(item.volumeInfo.authors) === 'undefined') {
                        item.volumeInfo.authors = [" "];

                    } 

                    if (typeof(item.volumeInfo.title) === 'undefined') {
                        item.volumeInfo.title = " ";

                    } 

                    return <Book key={item.id}
                    name={item.volumeInfo.title} 
                    thumbnail={item.volumeInfo.imageLinks.smallThumbnail} 
                    subtitle= {item.volumeInfo.subtitle}
                    authors = {item.volumeInfo.authors}/>
                    
                })
            }
            </div>
        </div>
	);
}

export default BookSearch;
