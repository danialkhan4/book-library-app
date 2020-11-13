import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './Auth.js';
import { Button, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';


function Logout() {
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/"); // if logged out, redirect to homepage
    } catch {
       message.error('Logout failed');
    }
  }
  return <Button onClick={handleLogout} size="medium"><LogoutOutlined />Logout</Button>;

}

export default Logout;