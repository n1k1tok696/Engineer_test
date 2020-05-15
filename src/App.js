import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './App.css';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Info from './components/Info.js';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      input: '',
      key: 'cwfTFta0fJk7EDahoj8qFOXMLUMUC4wOQACA5oAs',
      aster: null,
      error:false,
    }
  }

  componentDidUpdate() {
    if (this.state.aster) {
      
    }
  }

  change(e) {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  async makeCall(asteroid) {
    try {
      const { key } = this.state
      const result = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroid}?api_key=${key}`)
      const resp = await result.json()
      this.setState({
        asterObj: resp
      })
    }
    catch(e) {
      console.log(e)
      this.setState({
        error: true,
      })
    }
  }

  async randomAsteroid() {
    const { key } = this.state
    const result = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${key}`)
    const resp = await result.json()
    await this.setState({
      aster: resp.near_earth_objects[this.getRandom()]
    })

    this.makeCall(this.state.aster.id)

      // .then(res => res.json())
      // .then(data => this.setState({
      //   aster: data.near_earth_objects
      // }, () => console.log(aster[this.getRandom(aster.length)])))
    
    // console.log(this.state.aster)
  }

  getRandom() {
    return Math.floor(Math.random() * 20);
  }

  render() {
    console.log(this.state.asterObj)
    const {input,asterObj,error} = this.state
    return (
      <div className="App">
          <Switch>
            <Route exact path='/'>
            {asterObj &&
              <Redirect to="/info"/>
            }
              <Button 
                variant="contained"
                color="primary"
                disabled={input ? false : true} 
                onClick={() => this.makeCall(this.state.input)}  
              >Choose</Button>
              <TextField
                id="outlined-basic"
                label="Enter Asteroid ID"
                variant="outlined"
                onChange={e => this.change(e)}
                name="input"
                value={input}
                error={error}
              />
              <Button 
                variant="contained"
                color="primary"
                onClick={() => this.randomAsteroid()}
              >Random Asteroid</Button>
              </Route>
              <Route path="/info">
              {asterObj &&
                  <Info 
                    name={asterObj.name}
                    nasa_jpl_url={asterObj.nasa_jpl_url}
                    is_potentially_hazardous_asteroid={asterObj.is_potentially_hazardous_asteroid}
                  />
              }
              </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
