import React from 'react';
import {Route, BrowserRouter as Router, Link} from  'react-router-dom';
import {MenuOutlined} from '@ant-design/icons';

import Sidebar from './components/Sidebar';
import SearchPage from './components/SearchPage';
import Library from './components/Library';

import './css/index.css';
import './css/navbar.css';

function App() {
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
