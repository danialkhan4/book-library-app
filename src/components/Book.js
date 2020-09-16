import React, {useState} from 'react';
import { Card } from 'antd';
import '../css/booksearch.css';

const { Meta } = Card;

function Book(props) {
	return (
		<img className="book" alt="example" src={props.thumbnail} />
	);
}

export default Book;
