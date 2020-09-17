import React, {useState, useEffect} from 'react';

import request from 'superagent';
import { Input , Layout, Button, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Book from './Book';
import '../css/booksearch.css';

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
            <input onChange={handleInput}id="numInput" placeholder="Book Title" />
            <Button onClick={handleSearch}icon={<SearchOutlined />} >Search</Button>

            <div className="listing">
            {
                books && books.map((item, i) => {
                    if (typeof(item.volumeInfo.imageLinks) === 'undefined') {
                        item.volumeInfo.imageLinks = {
                            thumbnail: "default",
                            smallThumbnail: "default"
                        }
                    } else {
                        return <Book name={item.volumeInfo.title} 
                        thumbnail={item.volumeInfo.imageLinks.smallThumbnail} 
                        subtitle= {item.volumeInfo.subtitle}
                        authors = {item.volumeInfo.authors}/>
                    }
                })
            }
            </div>
        </div>
	);
}

export default BookSearch;
