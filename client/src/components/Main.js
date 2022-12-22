import React, { useState, useEffect } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import dataService from '../services/dataService';

const Main = () => {

  const [attractions, setAttractions] = useState([]);
  // eslint-disable-next-line
  const [data, setData] = useState([]); //the first data
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dataService.getAttractions( attractions => {
      setAttractions(attractions)
      setData(attractions)
    })
  }, [] )

  const handleSearch = (e) => {
      e.preventDefault();
      setSearchValue(e.target.value);

      if(searchValue.length > 0){
        const searchedAttractions = attractions.filter((attraction) => {
          return attraction.name.includes(searchValue)
        }) 
        setAttractions(searchedAttractions)
      }else{
        setAttractions(data)
      }
  }

  const onDelete = ( deleteId ) => {
    console.log(deleteId)
    console.log('trying to delete')
    dataService.deleteAttraction( deleteId, ( err ) => {
      console.log(err)
      if(err){
        if(err.status === 401){
          console.log('Unauthorized')
        }
        return;
      }
      const updatedAttractions = attractions.filter( attraction => {
        return attraction._id !== deleteId
      })
      setAttractions(updatedAttractions)
      console.log(updatedAttractions)
    })
  }

      return (
      <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input type="text" className="form-control" onChange={handleSearch} placeholder="Search this attraction" value={searchValue}/>
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
        { attractions.map( attraction => {
          return (
            <Card key={attraction._id} attraction={ attraction } onDelete={onDelete} href={attraction._id} />
          )
        })
      }
      </div>
    </div>
  </div>
</div>
  );}
  
export default Main;