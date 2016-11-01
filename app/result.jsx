import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './appbar.jsx';
import Input from './input.jsx';
import Decoded from './decoded.jsx';
import ContentEditable from 'react-contenteditable';
import axios from 'axios';
import _ from 'lodash';

const Navigate = require('react-mini-router').navigate;

const Result = React.createClass({
  onHome() {
    Navigate('/')
  },
  componentWillMount() {
    var jwt = this.props.jwt;
    axios.post('/validate/', {
        jwt: jwt,
    })
    .then(response => {
      const firstValid = _.find(response.data, o => o.valid === true);
      if (firstValid) {
        this.setState({data: firstValid});  
      } else {
        const firstInvalid = _.find(response.data, o => o.valid === false);
        this.setState({data: firstInvalid});
      }
      console.log(this.state);
    })
    .catch(error => {
      console.log(error);
    });
  },
  render() {
    const segments = this.props.jwt.split('.');
    const state = this.state;
    return (      
      <div>
        <AppBar />
        <div className="row">                  
          <div className="col s6" >
            <div className="card">
              <div className="card-content">
                <span className="card-title">Encoded</span>
                <p>
                    <span style={{color: '#C2185B',}}>{segments[0]}</span>
                    <span style={{color: 'black',}}>.</span>
                    <span style={{color: '#689F38',}}>{segments[1]}</span>
                    <span style={{color: 'black',}}>.</span>
                    <span style={{color: '#1976D2',}}>{segments[2]}</span>
                </p> 
              </div>
            </div>
          </div>
          <div className="col s6" >
            <div className="card">
              <div className="card-content">
                <span className="card-title">Decoded</span>
                <Decoded data={state}></Decoded>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s1 offset-s11">
            <a onClick={this.onHome} className="btn-floating btn-large waves-effect waves-light pink"><i className="material-icons">done</i></a>  
          </div>
        </div>
      </div>
    );
  }
});

export default Result;