import React, {useState} from 'react';
import { Card, Typography, Button, Menu, Dropdown   } from 'antd';
import '../css/book.css';

import { DownOutlined, ImportOutlined } from '@ant-design/icons'

const { Text, Link, Title } = Typography;


const menu = (
	<Menu onClick={console.log("click")}>
		<Menu.Item key="1">Read</Menu.Item>
		<Menu.Item key="2">Currently reading</Menu.Item>
		<Menu.Item key="3">Want to read</Menu.Item>
  	</Menu>
)
function Book(props) {
	let authorsList = [];
	let titleString  = [];

	const len = props.authors.length - 1;
	
	for (let i = 0; i < props.authors.length; i++) {
		if (props.authors.length == 1) {
			authorsList.push(<Text key={i}>{props.authors[i]}</Text>);
		} else if (i != len) {
			authorsList.push(<Text key={i}>{props.authors[i]}, </Text>);
		} else {
			authorsList.push(<Text key={i}>{props.authors[i]}</Text>);
		}
	}

	if (props.subtitle) {
		titleString.push(<Text strong >{props.name}: {props.subtitle}<br/></Text>);
	} else {
		titleString.push(<Text strong >{props.name}<br/></Text>);
	}

	return (
		<div className="bookCard"> 
			<img className="imageContainer" src={props.thumbnail} />
			<div className="textContainer" >
				{titleString}<br/>
				{authorsList}
      			
					  
    		</div>
			<div className="options">
			<Button style={{marginRight: 5}}><ImportOutlined />Add to Shelf</Button>
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
