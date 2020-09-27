import React from 'react';
import {Route, BrowserRouter as Router, Link} from  'react-router-dom';
import firebase from './firebase'
import {auth, firestore} from './firebase'

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
	return ( 
		<Router>
			<div className="App">

				<div className="navbar">

					<div className="title"><Link id="title" to ="/">Books Library</Link></div>

					<div className="buttons">
						<ul>
						<li><Link to ="/library">My Library</Link></li>
						<li><Link to ="/search">Search</Link></li>
						<li><Link to ="/">Settings</Link></li>
						</ul>
					</div>
					<div className="google-login"> 
						{renderLogin(loggedIn)}
					</div>
				</div>
				<Sidebar />
			</div> 
			<Route exact path ="/search" component={SearchPage}/>		
			<Route path="/library">
				<Library loggedIn={loggedIn} />
			</Route>	
		</Router>
	);
}

function renderLogin(loggedIn) {
	return (
		loggedIn ? <Button onClick={logout}><LogoutOutlined />Log out</Button> :
		<GoogleButton onClick={googleLogin} type="dark"/>
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
