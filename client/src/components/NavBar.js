import React from 'react';import authService from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate()
  
  const logout = () =>{
    authService.signout().catch( err => console.log(err))
  }

    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/#" className="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          <strong>My Attractions</strong>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample07">
          <nav className="navbar-nav mr-auto">
            <div className="nav-item active">
              { authService.isAuthenticated() ? <Link className="nav-link" to="/attractions/create">Add an attraction</Link> : ''}
            </div>
          </nav>
          
          <nav className="navbar-nav d-block float-right">
          { authService.isAuthenticated() ? 
            <div className="nav-item active dropdown d-block float-right">
              <Link className="nav-link dropdown-toggle" to="/#" id="dropdown07" data-toggle="dropdown" aria-expanded="false">
                {authService.showEmail()}              
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" onClick={ () => logout() }>Sign out</Link>
              </div>
            </div>
          :
            <div className="d-flex">
              <Link className="nav-link nav-item" to="/signin">Sign in</Link>
              <Link className="nav-link nav-item" to="/register">Register</Link>
            </div> 
            }
          </nav>
        </div>
      </div>
    </nav>
    );
}
 
export default NavBar;