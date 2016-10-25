import React from 'react';
import ReactDOM from 'react-dom';
//import Highlight from 'react-highlighter';
import ReactTextArea from './reactTextArea.jsx';
var Highlight = require('react-highlighter');


var Encoded = React.createClass({
    render() {        
        return (
            <div>
                <h4>Encoded</h4>
                <div className="row">
                  <div className="input-field col s12">
                    <ReactTextArea id="textarea1" className="materialize-textarea" rows={7}>
                    <Highlight search="brown">The quick brown fox jumps over the lazy dog</Highlight>
                    </ReactTextArea>
                    
                  </div>
                </div>
            </div>
        );
    }
});

/*
<ReactTextArea id="textarea1" className="materialize-textarea" rows={7}>
                    </ReactTextArea>
*/

export default Encoded;