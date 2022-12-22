import React, { useState } from "react";
import "../css/signin.css";
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = (props) => {

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,  setErrors] = useState({});

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    
    authService.register({ first_name: first_name, last_name: last_name, email:email , password: password }, (error) => {

      if(!error){
        navigate('/')
      } else {
        // eslint-disable-next-line
        switch(error.status){
          case 400: { setErrors(error.data._message); break; }
          case 401: { setErrors(error.data); break;}
        }
      }
    })
  };

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Registration Form</h1>
      <input
        type="first_name"
        id="inputFirstName"
        name="first_name"
        onChange={(e) => { setFirstName(e.target.value); }}
        className="form-control"
        placeholder="First Name"
        autoFocus
      />
      {
        errors.first_name && <div className="alert alert-danger">{errors.first_name}</div>
      }
      <input
        type="last_name"
        id="inputLastName"
        name="last_name"
        onChange={(e) => { setLastName(e.target.value); }}
        className="form-control"
        placeholder="Last Name"
      />
      {
        errors.email && <div className="alert alert-danger">{errors.email.message}</div>
      }
      <input
        type="email"
        id="inputEmail"
        name="email"
        onChange={(e) => { setEmail(e.target.value); }}
        className="form-control"
        placeholder="Email address"
      />
      {
        errors.email && <div className="alert alert-danger">{errors.email._message}</div>
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
        Register
      </button>
    </form>
  );
};

export default Register;
