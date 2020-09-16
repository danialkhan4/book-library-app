import React from 'react';
import { Button, Layout } from 'antd';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BookSearch from './components/BookSearch';

import './index.css';


function App() {
	return (
		<div className="App">
			<Navbar />
			<Sidebar />
			<BookSearch />
		</div>
	);
}

export default App;
