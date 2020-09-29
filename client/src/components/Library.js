import React from 'react';

import '../css/library.css';
function Library(props) {
    return (
        <div>
            { props.loggedIn ? <h1 className="library">Welcome {props.user && props.user.displayName}</h1> :
            <h1 className="library">Login to see your library</h1>
            }
        </div>
    );

}

export default Library;