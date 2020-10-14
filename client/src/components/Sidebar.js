import React from 'react';
import '../css/sidebar.css';

import { Menu, Button } from 'antd';
import 'antd/dist/antd.css';

function Sidebar() {
	return (
        <div className="sidebar">
            <Menu style={{ width: 252 }} mode="inline">
                <Menu.ItemGroup key="g1" title="My Books">
                    <Menu.Item key="1">Reading</Menu.Item>
                    <Menu.Item key="2">Want to read</Menu.Item>
                    <Menu.Item key="3">Read</Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup key="g2" title="Bookshelves">
                    <Menu.Item key="4">Favorites</Menu.Item>
                </Menu.ItemGroup>
            
            </Menu>
            <Button style={{marginTop: 185, marginLeft:120}}className="create-button"type="dashed">+ Create</Button>
        </div>
    );
}


export default Sidebar;