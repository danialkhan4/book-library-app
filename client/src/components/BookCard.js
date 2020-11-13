import React from 'react';
import { useAuth } from './Auth';

import axios from 'axios';

import { Typography, Button, Menu, Dropdown, message  } from 'antd';
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
  const {user} = useAuth();

  const len = props.authors.length - 1;
  
  // push the authors into authorRender for proper author formatting

  for (let i = 0; i < props.authors.length; i++) {
    if (props.authors.length === 1) {
      authorRender.push(<Text key={i}>{props.authors[i]}</Text>);
    } else if (i !== len) {
      authorRender.push(<Text key={i}>{props.authors[i]}, </Text>);
    } else {
      authorRender.push(<Text key={i}>{props.authors[i]}</Text>);
    }
  }


  // push the title and subtitle together for proper title formatting 
  if (props.subtitle) {
    titleRender.push(<Text key={props.name}strong >{props.name}: {props.subtitle}<br/></Text>);
  } else {
    titleRender.push(<Text key={props.name}strong >{props.name}<br/></Text>);
  }


  // handle the request and add the book to the user's library in firstore
  function handleAdd() {
    if (!user) { // check user 
      message.error('You must be logged in to do that');
      return;
    }

    const bookData = { // create data object to post to server
      title: props.name,
      authors: props.authors,
      subtitle: props.subtitle,
      thumbnail: props.thumbnail
    }

    axios.post('/api/user/add', {
      bookData,
      uid: user.uid
    }).then(function(res) {
      switch (res.status) {
        case 227:
          message.warning('This book is already in your library');
          break;
        default:
          message.success('Book added to your library');
          break;
      }
    }).catch (function(error) {
      message.error("(Error) book was not added");
    });
  }
 
  function handleRemove() {
    const bookData = { // object to remove
      title: props.name,
      authors: props.authors,
      subtitle: props.subtitle,
      thumbnail: props.thumbnail
    }
    
    axios.post('/api/user/remove', {
      bookData,
      uid: user.uid
    }).then (function(response) {
      props.onChange();
    }).catch (function(error) {
      message.error("(Error) book was not added");
    });
  }


  // checks for render to either library or search page
  let button;
  if (props.isLibraryRender) {
    button = <Button onClick={handleRemove} style={{marginRight: 5}}><DeleteOutlined /></Button>;
  } else {
    button = <Button type="primary" onClick={handleAdd} style={{marginRight: 5}}><ImportOutlined />Add to shelf</Button>;
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
        { props.isLibraryRender && 
          <Dropdown overlay={menu}>
          <Button type="dashed">
            Mark as <DownOutlined />
          </Button>
        </Dropdown>
        }
      </div>
    </div> 

  );
}

export default Book;
