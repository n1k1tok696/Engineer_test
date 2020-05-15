import React from 'react';
import {
    Link
  } from "react-router-dom";

function Info (props) {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.nasa_jpl_url}</p>
            <p>{'' + props.is_potentially_hazardous_asteroid}</p>
            <Link to='/' >Back</Link>
        </div>
    )
}

export default Info;