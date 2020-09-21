import React from 'react';
import '../css/sidebar.css';

import { Menu } from 'antd';
import 'antd/dist/antd.css';

function Sidebar() {
	return (
        <div className="sidebar">
            <Menu
                style={{ width: 256 }}
                mode="inline"
                className="sidebar"
            >
                <Menu.ItemGroup key="g1" title="Shelf 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup key="g2" title="Shelf">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            
            </Menu>
        </div>
    );
}


export default Sidebar;