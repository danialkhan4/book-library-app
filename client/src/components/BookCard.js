import React, {useState} from 'react';
import axios from 'axios';
import { Typography, Button, Menu, Dropdown   } from 'antd';
import '../css/bookcard.css';

import { DownOutlined, ImportOutlined, DeleteOutlined } from '@ant-design/icons'

const { Text } = Typography;

const menu = (
	<Menu onClick={console.log("click")}>
		<Menu.Item key="1">Read</Menu.Item>
		<Menu.Item key="2">Currently reading</Menu.Item>
		<Menu.Item key="3">Want to read</Menu.Item>
  </Menu>
);

function Book(props) {
	let authorRender = [];
	let titleRender  = [];

	const len = props.authors.length - 1;
	
	/*
	* push the authors into authorRender so there is a nice string like Author 1, Author 2
	*/
	for (let i = 0; i < props.authors.length; i++) {
		if (props.authors.length === 1) {
			authorRender.push(<Text key={i}>{props.authors[i]}</Text>);
		} else if (i !== len) {
			authorRender.push(<Text key={i}>{props.authors[i]}, </Text>);
		} else {
			authorRender.push(<Text key={i}>{props.authors[i]}</Text>);
		}
	}

	/*
	* push the title and subtitle together for something like Book Title: Subtitle 
	*/
	if (props.subtitle) {
		titleRender.push(<Text key={props.name}strong >{props.name}: {props.subtitle}<br/></Text>);
	} else {
		titleRender.push(<Text key={props.name}strong >{props.name}<br/></Text>);
	}


	/* handle the request and add the book to the user's library in firstore
	*
	*/
	function handleAdd() {
		const bookData = {
			title: props.name,
			authors: props.authors,
			subtitle: props.subtitle,
			thumbnail: props.thumbnail
		}
		axios.post('/api/user/add', {bookData});
	}

	function handleRemove() {
		console.log("removing");
		const bookData = {
			title: props.name,
			authors: props.authors,
			subtitle: props.subtitle,
			thumbnail: props.thumbnail
		}
		axios.post('/api/user/remove', {bookData})
		.then (function(response) {
			console.log(response);
			props.onChange();
		})
	}
	/* check if we are rendering for library to search page */

	console.log(props.isLibraryRender);
	let button;
	if (props.isLibraryRender) {
		button = <Button onClick={handleRemove} style={{marginRight: 5}}><DeleteOutlined /></Button>;
	} else {
		button = <Button onClick={handleAdd} style={{marginRight: 5}}><ImportOutlined />Add to shelf</Button>;
	}
	return (
		<div className="bookCard"> 
			<img className="imageContainer" alt={titleRender} src={props.thumbnail} />
			<div className="textContainer" >
				{titleRender}<br/>
				{authorRender}
    		</div>

			<div className="options">
				{button}
				<Dropdown overlay={menu}>
					<Button type="dashed">
						Mark as <DownOutlined />
					</Button>
				</Dropdown>
			</div>
		</div> 

	);
}

export default Book;
