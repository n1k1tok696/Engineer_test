import React from 'react';

function Info (props) {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.nasa_jpl_url}</p>
            <p>{'' + props.is_potentially_hazardous_asteroid}</p>
        </div>
    )
}

export default Info;