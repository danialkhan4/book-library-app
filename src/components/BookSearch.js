import React, {useState, useEffect} from 'react';

import request from 'superagent';
import { Input , Layout, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Book from './Book';
import '../css/booksearch.css';

function BookSearch() {
    const [books, setBooks ] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);


    function handleSearch() {
        fetch("https://www.googleapis.com/books/v1/volumes?q=javascript&key=AIzaSyBQ8NNPlrYPtbdEHDtynKgPVwy4wPOXFuk")
            .then(response => response.json())
            .then((res) => {
                    setBooks(res.items);
                    setLoading(true);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

	return (
		<div className="bookSearch">
            		<input id="numInput" placeholder="ISBN" />
            		<Button onClick={handleSearch}icon={<SearchOutlined />} >Search</Button>
            			<div className="listing">
            			{
                			books.map((item, i) => {
                    				return <Book name={item.volumeInfo.title}thumbnail={item.volumeInfo.imageLinks.smallThumbnail}/>
                			})
            			}			
            			</div>
		</div>
	);
}

export default BookSearch;
