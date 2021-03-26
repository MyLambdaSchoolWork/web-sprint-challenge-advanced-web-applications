import React, { useState } from "react";
import styled from 'styled-components';

import eyeVisible from '../assets/iconmonstr-eye-thin.svg';
import eyeNotVisible from '../assets/iconmonstr-eye-off-thin.svg';
import axios from "axios";

const initialValues = {
  username: '',
  password: '',
}

const initialFocus = {
  username: false,
  password: false,
};

const Login = () => {
  const [ values, setValues ] = useState(initialValues) // user input values
  const [ error, setError ] = useState('')
  const [ focus, setFocus ] = useState(initialFocus) // whether form element should be focused
  const [ passwordVisible, setPasswordVisible ] = useState(false)

  function onSubmit(evt){
    evt.preventDefault()
    axios.post('http://localhost:5000/api/login', values)
      .then( res => {
        console.log(res)
        localStorage.setItem('not_a_secret_token', res.data.payload)
      })
      .catch( err => {
        console.log(err.response)
      })
  }

  function onChange(evt) {
    const { name, value } = evt.target
    setValues({ ...values, [name]: value })
  }

  function onFocus(evt) {
    const { name } = evt.target
    setFocus({ ...focus, [name]: true })
  }
  
  // dunno react calls the event onBlur, but it runs when element loses focus
  function onBlur(evt) {
    const { name } = evt.target
    const value = values[name] === '' ? false : true
    setFocus({...focus, [name]: value});
  }
  
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        {/* <h2>Build login form here</h2> */}
        <form onSubmit={onSubmit}>
          <DivFieldsetStyled>
            <LabelStyled 
              focus={focus.username}
              htmlFor='username'
            >
              Username
            </LabelStyled>
            <InputStyled 
              id='username'
              type='text'
              name='username'
              value={values.username}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </DivFieldsetStyled>
          <DivFieldsetStyled>
            <LabelStyled 
              focus={focus.password}
              htmlFor='password'
            >
              Password
            </LabelStyled>
            <InputStyled 
              id='password'
              type={passwordVisible ? 'text' : 'password'}
              name='password'
              value={values.password}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <ImgEyeStyled 
              src={passwordVisible ? eyeNotVisible : eyeVisible}
              alt=''
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </DivFieldsetStyled>
          <button type='submit'>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

// Thank you Chris from css tricks for giving me the css to make the "fieldset" work, ready to copy and paste
// https://css-tricks.com/snippets/css/non-form-fieldset-look/
const DivFieldsetStyled = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 10px auto;
  padding: 10px;
  position: relative;
  text-align: left;
  width: 300px;
`

const LabelStyled = styled.label`
  background: #fff;
  color: ${props => {
    return props.focus ? 'black' : 'grey'
  }};
  font-size: ${props => {
    return props.focus ? '18px' : '24px'
  }};
  line-height: 1;
  margin-top: ${props => {
    return props.focus ? '-9px' : '8px'
  }}; /* negative margin half of fontsize, other margin trial and error ig */
  padding: 0 3px;
  position: absolute;
  top: 0;
  transition: margin-top 0.15s, font-size 0.15s, color 0.15s; // transitions from over input to part of div
`

const InputStyled = styled.input`
  border: none;
  display: inline-block;
  font-size: 20px;
  outline: none;
  width: 250px;
`

const ImgEyeStyled = styled.img`
  display: inline-block;
  height: 16px;
  margin-top: 4px;
  width: 20px;
`
//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.