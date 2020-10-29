import React, {useState, useEffect} from 'react';
import BookCard from './BookCard';

import axios from 'axios';
import '../css/library.css';

function Library(props) {
  const [libraryBooks, setLibraryBooks ] = useState([]); 
  
  async function loadLibrary() {
    try {
      if (!props.user) {
        setLibraryBooks([]);
      } else {
        axios.get('/api/library')
        .then(response => {
          setLibraryBooks(response.data)
        })
        .catch(error => {
          console.log(error);
        });
      }

    } catch (error) {
      console.log(error);
    } 
  }
  useEffect(() => {
    loadLibrary();
  },[props.user]);

  return (
    <div className="bookLibrary">
      { props.loggedIn ? <h1 className="library">Welcome {props.user && props.user.displayName}</h1> :
      <h1 className="library">Login to see your library</h1>
      }


      <div className="listing">
      {
        libraryBooks && libraryBooks.map((item, i) => {
          //handleUndefinedData(item); 
          return <BookCard 
            key={item.title + item.authors}
            name={item.title} 
            onChange={loadLibrary}
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