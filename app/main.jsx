import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './appbar.jsx';
import Input from './input.jsx';

const Navigate = require('react-mini-router').navigate;

const Main = React.createClass({
  onVerify() {
    console.log('onVerify ', this.state);
    const jwt = this.state.jwt;
    console.log('onVerify ', jwt);
    Navigate(`/verify/${jwt}`)
  },
  onTextChanged(jwt) {
    this.setState({
      jwt: jwt
    });  
  },
  render() {
        return (
            <div>
                <AppBar />
                <div className="row">                  
                    <div className="col s12" ><Input textChanged={this.onTextChanged} /></div>                    
                </div>
                <div className="row">
                  <div className="col s1 offset-s11">
                    <a onClick={this.onVerify} className="btn-floating btn-large waves-effect waves-light pink"><i className="material-icons">play_arrow</i></a>  
                  </div>
                </div>
            </div>
        );
    }
});

export default Main;