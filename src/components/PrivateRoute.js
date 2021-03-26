import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({component:Component, componentProps, ...rest}){
  return (
    <Route {...rest}
      render = {(props) => {
        return localStorage.getItem('not_a_secret_token') ? <Component {...props} {...componentProps} /> : <Redirect to='/' />
      }}
    />
  );
}

//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in