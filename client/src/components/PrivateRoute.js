import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './Auth';

function PrivateRoute ( {component: Component, ...rest} ) {
  const { user } = useAuth();
  return (
    <Route 
      {...rest} 
      render={ (props) => {
        return user ? <Component {...props} /> : <Redirect to='/login' /> 
      }} 
    >
    </Route>
      
  );
}

export default PrivateRoute; 