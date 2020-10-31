import React, {useState, useEffect} from 'react';
import BookCard from './BookCard';

import axios from 'axios';
import '../css/library.css';
import { Spin } from 'antd';

function Library(props) {
  const [libraryBooks, setLibraryBooks ] = useState([]); 
  const [toUpdate, setToUpdate] = useState(false);
  const [libraryLoading, setLibraryLoading] = useState(false);
  
  function updateLibrary() {
    if (toUpdate) setToUpdate(false)
    else setToUpdate(true);
  }
  useEffect(() => {
    setLibraryLoading(true);
    async function loadLibrary() {
      try {
        if (!props.user) {
          setLibraryBooks([]);
          setLibraryLoading(false);
        } else {
          axios.get('/api/library')
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

  },[props.user, toUpdate]);

  return (
    <div className="bookLibrary">
      { props.loggedIn ? <h3 className="library">{props.user && props.user.displayName}'s Books {libraryLoading && <Spin />}</h3> :
      <h1 className="library">Login to see your library</h1>
      }


      <div className="listing">
      {
        libraryBooks && libraryBooks.map((item, i) => {
          //handleUndefinedData(item); 
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