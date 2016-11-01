import React from 'react';
import ReactDOM from 'react-dom';

const Decoded = React.createClass({
    render() {                
        if (this.props.data) {                        
            const spaces = ' ';
            const toString = s => {
                return '"' + s + '"';
            }
            const possibleArrayToString = arr => {
                if (Array.isArray(arr)) {
                    return '[' + arr.map(a => toString(a)) + ']';
                } else {
                    return toString(arr);
                }    
            };
            
            const kvpHeader = _.map(this.props.data.data.decoded.header, (value, key) => {
                return <div key={key}>{spaces.replace(/ /g, '\u00a0\u00a0')}{toString(key)}: {toString(value)},</div>;
            });
            const kvpPayload = _.map(this.props.data.data.decoded.payload, (value, key) => {
                return <div key={key}>{spaces.replace(/ /g, '\u00a0\u00a0')}{toString(key)}: {possibleArrayToString(value)},</div>;
            });            
            
            return  <div>
                        <div style={{color: '#C2185B',}}>
                            <div>&#123;</div>
                                {kvpHeader}
                            <div>&#125;</div>
                        </div>
                        <div style={{color: '#689F38',}}>
                            <div>&#123;</div>
                                {kvpPayload}
                            <div>&#125;</div>
                        </div>
                        <div style={{backgroundColor: '#1976D2', color: '#FFFFFF', paddingTop: '10px', paddingBottom: '10px', textAlign: 'center'}}>
                            <div>
                                {this.props.data.data.valid ? 'Valid' : 'Invalid'}
                            </div>    
                        </div>
                    </div>;
        } else {
            return (
                <p>
                </p>
            );    
        }
    }
});

export default Decoded;