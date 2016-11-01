import React from 'react';
import ReactDOM from 'react-dom';

var AppBar = React.createClass({
    render() {        
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper teal">
                      <span className="brand-logo center">Azure AD JWT Decode and Validate</span>                      
                    </div>
                </nav>
            </div>
        );
    }
});

export default AppBar;