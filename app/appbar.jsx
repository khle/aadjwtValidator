import React from 'react';
import ReactDOM from 'react-dom';

var AppBar = React.createClass({
    render() {        
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper teal">
                      <a href="#" className="brand-logo center">Azure AD JWT Decode and Validate</a>
                      <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="#">Start</a></li>                            
                      </ul>
                    </div>
                </nav>
            </div>
        );
    }
});

export default AppBar;