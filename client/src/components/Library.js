import React, {useState, useEffect} from 'react';
import BookCard from './BookCard';

import axios from 'axios';
import '../css/library.css';

function Library(props) {
    const [libraryBooks, setLibraryBooks ] = useState([]); 
    function loadLibrary() {
        axios.get('/library')
        .then(response => {
            console.log(response.data);
            setLibraryBooks(response.data)
        })
        .catch(error => {
            //TODO: error messages
            console.log(error);
        })
    }
    useEffect(() => {
        loadLibrary();
    },[]);

/*     useEffect(() => {
        loadLibrary();
    },[updateLibrary]); */
    
    return (
        <div className="bookLibrary">
            { props.loggedIn ? <h1 className="library">Welcome {props.user && props.user.displayName}</h1> :
            <h1 className="library">Login to see your library</h1>
            }


            <div className="listing">
            {
                libraryBooks && libraryBooks.map((item, i) => {
                    //handleUndefinedData(item); 
                    return <BookCard //key={item.id}
                        name={item.title} 
                        onChange={loadLibrary}
                        thumbnail={item.thumbnail} 
                        subtitle= {item.subtitle}
                        authors = {item.authors}
                        isLibraryRender={true}
                        //loadLibrary={loadLibrary}
                    />
                    
                })
            }
            </div>
        </div>
    );

}
 
export default Library;