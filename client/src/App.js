import React, { useState, useEffect } from 'react';
import {Route, BrowserRouter as Router, Link} from  'react-router-dom';
import firebase from './firebase'
import {auth, firestore} from './firebase'

import axios from 'axios';

import { Button } from 'antd';
import {MenuOutlined, LogoutOutlined} from '@ant-design/icons';
import GoogleButton from 'react-google-button'

import Sidebar from './components/Sidebar';
import SearchPage from './components/SearchPage';
import Library from './components/Library';
import LandingPage from './components/LandingPage';

import './css/index.css';
import './css/navbar.css';


/* firebase hooks*/
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


function App() {
	const [loggedIn] = useAuthState(auth);
	const [user, setUser] = useState(null);
	
 	useEffect( () => {
		setUser(auth.currentUser);
	}, [loggedIn]);  
	
	useEffect(() => {
		if (user) {
			console.log("POSTING: " + user.uid);
			axios.post('/user', {
				uid: user.uid
			})
		} 
	}, [user]);  

	return ( 
		<Router>
			<div className="App">

				<div className="navbar">

					<div className="title"><Link id="title" to ="/">Books Library</Link></div>

					<div className="buttons">
						<ul>
						<li><Link to ="/">My Library</Link></li>
						<li><Link to ="/search">Search</Link></li>
						<li><Link to ="/settings">Settings</Link></li>
						</ul>
					</div>
				</div>
					<div className="google-login"> 
						{renderLogin(loggedIn)}
					</div>
				<Sidebar />
			</div> 
			<Route exact path ="/search" component={SearchPage}/>		
			<Route exact path="/">
				<Library loggedIn={loggedIn} user={user}/>
			</Route>	
		</Router>
	);
}

function renderLogin(loggedIn, user) {
	return (
		loggedIn ? <Button className="user-button" onClick={logout}><LogoutOutlined />Log out</Button> :
		<GoogleButton onClick={googleLogin} type="dark"/>
	);
}

function googleLogin() {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider);
}

function logout(user) {
	console.log("logged out");
	auth.signOut();
}



export default App;
