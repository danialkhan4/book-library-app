import React from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import './index.css';

function App() {
	return (
		<div className="App">
            <Navbar />
            <Sidebar />
		</div>
	);
}

export default App;
