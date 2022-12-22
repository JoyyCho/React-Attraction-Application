import axios from "axios";

class dataService {

 getAttractions(callback){
  axios.get(`${process.env.REACT_APP_API_URL}/attractions`, {
    headers:
    {
      'x-auth-token' : localStorage.getItem('token')
    }
  })
  .then((response) => {
      callback(response.data)
   })
 }

 getOneAttraction(getId, callback){
  axios.get(`${process.env.REACT_APP_API_URL}/attractions/${getId}`,{
    headers:
    {
      'x-auth-token' : localStorage.getItem('token')
    }
  })
  .then((response) => {
    callback(response.data)
  })
 }

 updateAttraction(updateId, credentials, callback){
  axios.put(`${process.env.REACT_APP_API_URL}/attractions/${updateId}`, credentials, {
    headers:
    {
      'x-auth-token' : localStorage.getItem('token')
    }
  })
  .then((response) => {
    if(response.status === 200){ 
      callback(null) 
    }})
  .catch((error) => {
      // console.log(error)
      callback(error.response)
    })
 }

 addAtraction(credentials, callback){
  axios.post(`${process.env.REACT_APP_API_URL}/attractions`, credentials, {
    headers:
    {
      'x-auth-token' : localStorage.getItem('token')
    }
  })
  .then( (response) => {
    if(response.status === 201){    
        console.log(response)
        callback(null) 
    }  
  })          
  .catch((error) => {
    // console.log(error)
    callback(error.response)
  })
}

 deleteAttraction(deleteId, callback){
    axios.delete(`${process.env.REACT_APP_API_URL}/attractions/${deleteId}`, {
      headers:
      {
        'x-auth-token' : localStorage.getItem('token')
      }
    })
    .then( (response) => {
      if(response.status === 201){
        console.log(response)
        callback(null) 
      }
    })          
    .catch((error) => {
      // console.log(error)
      callback(error.response)
    })
  }     
}

export default new dataService();