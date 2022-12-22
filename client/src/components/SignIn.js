import React, { useState } from "react";
import "../css/signin.css";
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,  setErrors] = useState({});
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    
    event.preventDefault();
    setErrors({})
    
    authService.signin({ email , password }, (error) => {
      if(!error){
        navigate('/')
      } else {
        // eslint-disable-next-line
        switch(error.status){
          case 422: { setErrors(error.data.errors); break; }
          case 401: { setErrors(error.data); break;}
        }
      }
    })
  };

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
      <input
        type="email"
        id="inputEmail"
        name="email"
        onChange={(e) => { setEmail(e.target.value); }}
        className="form-control"
        placeholder="Email address"
        autoFocus
      />
      {
        errors.email && <div className="alert alert-danger">{errors.email.message}</div>
      }
      <input
        type="password"
        id="inputPassword"
        name="password"
        onChange={(e) => { setPassword(e.target.value); }}
        className="form-control"
        placeholder="Password"
      />
      {
        errors.password && <div className="alert alert-danger">{ errors.password.message }</div>
      }
      {
        errors.serverMessage && <div className="alert alert-danger">{ errors.serverMessage }</div>
      }
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default SignIn;
