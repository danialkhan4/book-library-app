import React from 'react';
import '../css/landingpage.css';
import preview from '../preview.png';
function LandingPage() {
  return (
    <div className="landing">
      <h2>Welcome</h2>
      <p>A web application that allows users to search for and create a library of their favorite books.</p>
      <p>Features</p>
      <ul>
        <li>Search for any published book using title, authors, or topic</li>
        <li>Remove or add any book to your library</li>
        <li>Mark books as read, currently reading, or finished</li>
      </ul>

    <p>Click [Login] at the top right to begin.</p>
    <p>Searching for books is enabled without loggin in.</p>

    <h2>Preview</h2>


    <div className="container">
      <img alt="preview" className="image" src={preview}></img>
      <div className="middle">
        <div className="text">Preview</div>
      </div>
    </div>


    </div> 
  );

}

export default LandingPage;