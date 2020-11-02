import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './Auth.js';

import { message } from 'antd';
import GoogleButton from 'react-google-button';


function Login() {
  const { login } = useAuth();
  const history = useHistory();

  async function handleLogin() {
    try {
      await login();
      history.push('/library');
    } catch {
       message.error('Error occurred');
    }
  }
  return (
    <div>
      <GoogleButton onClick={handleLogin} type="dark"/>
    </div>

  );

}

export default Login;