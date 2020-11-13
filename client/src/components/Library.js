import React, { useState, useEffect } from 'react';
import { useAuth } from './Auth';
import BookCard from './BookCard';

import axios from 'axios';
import '../css/library.css';
import { Spin } from 'antd';

function Library() {
  const [libraryBooks, setLibraryBooks ] = useState([]); // state for rendering user's library
  const [toUpdate, setToUpdate] = useState(false);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const {user} = useAuth();

  // function to trigger the useEffect
  function updateLibrary() {
    if (toUpdate) {
      setToUpdate(false)
    } else {
      setToUpdate(true);
    }
  }


  useEffect(() => {
    setLibraryLoading(true);
    async function loadLibrary() {
      try {
        if (!user) { // not logged in or user has logged out
          setLibraryBooks([]);
          setLibraryLoading(false);
        } else { // else load the library
          
          axios.get('/api/library', {
            params: {
              uid: user.uid
            }
          })
          .then(response => {
              setLibraryBooks(response.data)
              setLibraryLoading(false);
          })
          .catch(error => {
            console.log(error);
              setLibraryLoading(false);
          });
        }
  
      } catch (error) {
          console.log(error);
          setLibraryLoading(false);
      } 
    }

    loadLibrary();

  },[user, toUpdate]);
  
  return (
    <div className="bookLibrary">
      { user ? <h3 className="library">{user && user.displayName}'s Books {libraryLoading && <Spin />}</h3> :
      <h1 className="library">Login to see your library</h1>
      }
      <div className="listing">
      {
        libraryBooks && libraryBooks.map((item, i) => {
          return <BookCard 
            key={item.title + item.authors}
            name={item.title} 
            onChange={updateLibrary}
            thumbnail={item.thumbnail} 
            subtitle= {item.subtitle}
            authors = {item.authors}
            isLibraryRender={true}
          />
           
        })
      }
      </div>
    </div>
  );
}
 
export default Library;