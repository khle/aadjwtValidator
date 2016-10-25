import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './appbar.jsx';
import Input from './input.jsx';
import ContentEditable from 'react-contenteditable';

const Navigate = require('react-mini-router').navigate;

const Result = React.createClass({
  onHome() {
    Navigate('/')
  },
  render() {
    const segments = this.props.jwt.split('.');
    return (      
      <div>
        <AppBar />
        <div className="row">                  
          <div className="col s6" >
            <p>
              <span style={{color: '#C2185B',}}>{segments[0]}</span>
              <span style={{color: 'black',}}>.</span>
              <span style={{color: '#689F38',}}>{segments[1]}</span>
              <span style={{color: 'black',}}>.</span>
              <span style={{color: '#1976D2',}}>{segments[2]}</span>
            </p>  
          </div>
          <div className="col s6" >
            <p>{this.props.jwt}</p> 
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

/*
<ContentEditable html={this.props.jwt} disabled={true} />
*/