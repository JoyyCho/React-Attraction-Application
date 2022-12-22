import React from 'react';
import '../css/main.css';
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

export const Card = (props) => {

    return (              
      
      <div key={props.attraction._id} className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img 
          className="card-img-top" 
          data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
          alt="Thumbnail [100%x225]" 
          style={{height: 225, width: '100%', display: 'block'}}
          src={props.attraction.attraction_img}
          data-holder-rendered="true" />
        <div className="card-body">
        <h5 className="text-center mb-3 bg-info text-light">{props.attraction.name}</h5>
          <ul className="list-group list-unstyled mb-4">   
            <li className="list-group-item"><strong><em>Country</em></strong>: {props.attraction.country}</li>
            <li className="list-group-item"><strong><em>Affiliation</em></strong>: {props.attraction.affiliation}</li>
            <li className="list-group-item text-truncate"><strong><em>Key</em></strong>: {props.attraction.key}</li>
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">                
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  <Link to={`/attractions/edit/${props.attraction._id}`}>Edit</Link>
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {props.onDelete(props.attraction._id)}}>Delete</button>
            </div>
            <small className="text-muted">{props.attraction.type}</small>
          </div>
        </div>  
      </div>
    </div>
    )
}          
 
export default Card;