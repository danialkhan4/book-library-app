import React, {useState} from 'react';
import { Card, Typography  } from 'antd';
import '../css/book.css';


const { Text, Link, Title } = Typography;

function Book(props) {
	console.log(props.authors);
	var authorsList = [];
	for (let i = 0; i < props.authors.length; i++) {
		authorsList.push(<p>{props.authors[i]}</p>);
	}
	return (
		<div className="bookCard"> 
			<img className="imageContainer" src={props.thumbnail} />
			<Card className="textContainer" >
				<Text >{props.name}<br/></Text>
      			<Text >{props.subtitle}<br/></Text>
				<div>
					{authorsList}
				</div>
      			
					  
    		</Card>
		</div>

	);
}

export default Book;
