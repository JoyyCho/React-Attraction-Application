import axios from "axios";
import jwt_decode from "jwt-decode";

class authService {
  signin(credentials, callback) {

   axios.post(`${process.env.REACT_APP_API_URL}/users/login`, credentials )
        .then( (response) => {
          console.log(response)
          console.log(response.headers['x-auth-token'])
          // eslint-disable-next-line
          if(response.status === 200){ 
              localStorage.setItem('token', response.headers['x-auth-token'])
              console.log(response)
              callback(null) 
          }
        })
        .catch( (error) => {
         callback(error.response)
        })
  }

  register(registrationData, callback) {

    axios.post(`${process.env.REACT_APP_API_URL}/users/register`, registrationData )
          .then( (response) => {
            console.log(response)
            if(response.status === 201){ 
                localStorage.setItem('token', response.headers['x-auth-token'])
                callback(null) 
            }
          })          
          .catch((error) => {
            callback(error.response)
          })

  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if( token !== 'undifined' ) return token !== null  // if we have token, will return true. It not, will return false
  }

  getToken(){
    let token = localStorage.getItem('token');
    if( token !== 'undifined' ) return token
  }
  
  showEmail(){
    let token = localStorage.getItem('token');
    let decoded = jwt_decode(token); 
    return decoded.email
  }

  signout() {
    return localStorage.removeItem('token')
  }
}

export default new authService();