import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './Auth.js';

import { Typography, message } from 'antd';
import GoogleButton from 'react-google-button';

import '../css/login.css'


function Login() {
  const { login } = useAuth();
  const { Text, Title  } = Typography;
  const history = useHistory();
  
  async function handleLogin() {
    try {
      await login();
      history.push('/library'); // if logged in, redirect to /library
    } catch {
       message.error('Error occurred');
    }
  }
  return (
    <div className="login-card">
        <Title level={5}>── Login ──</Title>
        <GoogleButton id="google-login" onClick={handleLogin} type="dark"/>
    </div>

  );

}

export default Login;