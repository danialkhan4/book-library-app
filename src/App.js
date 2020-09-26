import React from 'react';
import {Route, BrowserRouter as Router, Link} from  'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Button } from 'antd';
import {MenuOutlined, LogoutOutlined} from '@ant-design/icons';
import GoogleButton from 'react-google-button'

import Sidebar from './components/Sidebar';
import SearchPage from './components/SearchPage';
import Library from './components/Library';

import './css/index.css';
import './css/navbar.css';


/* firebase hooks*/
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


/* firebase app */
firebase.initializeApp({
    apiKey: "AIzaSyCbb11Pr-rx9Sk6oFW95_eP8LmZpxEdJEM",
    authDomain: "book-library-app-8eb19.firebaseapp.com",
    databaseURL: "https://book-library-app-8eb19.firebaseio.com",
    projectId: "book-library-app-8eb19",
    storageBucket: "book-library-app-8eb19.appspot.com",
    messagingSenderId: "553206836295",
    appId: "1:553206836295:web:ca4ff0892ff6fd281b1562",
    measurementId: "G-KFFN83VGEQ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	const [loggedIn] = useAuthState(auth);
	return ( 
		<Router>
			<div className="App">

				<div className="navbar">

					<div className="title"><Link id="title" to ="/">Books Library</Link></div>

					<a href="#/" className="toggle"><MenuOutlined />
						<span className="menu-item"></span>
						<span className="menu-item"></span>
						<span className="menu-item"></span>
					</a>

					<div className="buttons">
						<ul>
						<li><Link to ="/">My Library</Link></li>
						<li><Link to ="/search">Search</Link></li>
						<li><Link to ="/">Settings</Link></li>
						</ul>
					</div>
					<div className="google-login">
					{loggedIn ? <Button onClick={logout}><LogoutOutlined />Log out</Button> : 
					<GoogleButton className="google-login" onClick={googleLogin} type="light"/>}
					</div>
				</div>
			</div> 

			{/* home page (side bar + library)*/}
			<Route path ="/" component={Sidebar}/>
			{loggedIn ? <Route path ="/" exact component={Library}/> : <Route path ="/" exact component={SearchPage}/>}
			

			{/* search page */}
			<Route path ="/search" component={SearchPage}/>
		</Router>
	);
}


function googleLogin() {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider);
}

function logout() {
	console.log("logged out");
	auth.signOut();
}



export default App;
