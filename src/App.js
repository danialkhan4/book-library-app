import React from 'react';

import {Route, BrowserRouter as Router, Link} from  "react-router-dom";

import Sidebar from './components/Sidebar';
import SearchPage from './components/SearchPage';
import Library from './components/Library';

import './css/index.css';
import './css/navbar.css';

function App() {
	return (
		<Router>
			<div className="App">
				<div className="navElements">
					<Link id="title" to ="/">Books Library</Link>
					<Link to ="/">My Library</Link>
					<Link to ="/search">Search</Link>
					<Link to ="/">Settings</Link>
				</div>

			</div>

			{/* home page (side bar + library)*/}
			<Route path ="/" component={Sidebar}/>
			<Route path ="/" exact component={Library}/>

			{/* search page */}
			<Route path ="/search" component={SearchPage}/>
		</Router>
	);
}

export default App;
