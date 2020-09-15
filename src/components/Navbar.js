import React from 'react';
import '../css/navbar.css';
function Navbar() {
	return (
        <div className="navBar">
            <div className="nav">
                <a id="title">Books Library</a>
                <a>My Library</a>
                <a>Search</a>
                <a>Settings</a>
            </div>
        </div>
	);
}


export default Navbar;