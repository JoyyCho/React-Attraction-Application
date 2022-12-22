import React, { useState } from "react";
import "../css/add.css";
import { useNavigate } from 'react-router-dom';
import dataService from '../services/dataService';

const CreateForm = (props) => {

  const [name, setName] = useState("");
  const [attraction_img, setAttractionImg] = useState("")
  const [country, setCountry] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("");
  // eslint-disable-next-line
  const [errors,  setErrors] = useState({});

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({})

    dataService.addAtraction({ name, attraction_img, country, affiliation, key, type}, (error) => {
      console.log(error)
      if(!error){
        navigate('/')
      }else{
        // eslint-disable-next-line
        switch(error.status){
          case 400: { setErrors(error.data.message._message); break; }
          case 401: { setErrors(error.data); break;} //this may need to be fixed
        }
      }
    })
  };

return (
 <form className="form-create" onSubmit={handleSubmit}>
   <h1 className="h3 mb-3 font-weight-normal text-center">Add an attraction</h1>
   <label htmlFor="inputName">
     Name
   </label>
   <input
     type="name"
     id="inputName"
     name="name"
     onChange={(e) => { setName(e.target.value); }}
     className="form-control"
     placeholder="Name of Attraction"
     autoFocus
     value={name}
   />
   <label htmlFor="inputAttractionImg" className="mt-3">
     Attraction Img URL
   </label>
   <input
     type="attraction_img"
     id="inputAttractionImg"
     name="attraction_img"
     onChange={(e) => { setAttractionImg(e.target.value); }}
     className="form-control"
     placeholder="Attraction Img URL"
     value={attraction_img}
   />
   <label htmlFor="inputCountry" className="mt-3">
     Country
   </label>
   <input
     type="country"
     id="inputCountry"
     name="country"
     onChange={(e) => { setCountry(e.target.value); }}
     className="form-control"
     placeholder="Country of Attraction"
     value={country}
   />
    <label htmlFor="inputAffiliation" className="mt-3">
     Affiliation
   </label>
   <input
     type="affiliation"
     id="inputAffiliation"
     name="affiliation"
     onChange={(e) => { setAffiliation(e.target.value); }}
     className="form-control"
     placeholder="Affiliation"
     value={affiliation}
   />
   <label htmlFor="inputKey" className="mt-3">
     Key
   </label>
   <input
     type="key"
     id="inputKey"
     name="key"
     onChange={(e) => { setKey(e.target.value); }}
     className="form-control"
     placeholder="Key Point"
     value={key}
   />
    <label htmlFor="inputType" className="mt-3">
     Type
   </label>
   <input
     type="type"
     id="inputType"
     name="type"
     onChange={(e) => { setType(e.target.value); }}
     className="form-control"
     placeholder="Type of Attraction"
     value={type}
   />
   <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">
     Add
   </button>
 </form>
);
};

export default CreateForm;