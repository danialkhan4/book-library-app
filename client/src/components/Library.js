import React from 'react';
import axios from 'axios';
import '../css/library.css';
function Library(props) {
    function loadLibrary() {
        console.log("retreiving library");
        axios.get('/library')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            //TODO: error messages
            console.log(error);
        })
    }
    return (
        <div>
            { props.loggedIn ? <h1 className="library">Welcome {props.user && props.user.displayName}</h1> :
            <h1 className="library">Login to see your library</h1>
            }
            <button className="library" onClick={loadLibrary}>load</button>
        </div>
    );

}
 
export default Library;