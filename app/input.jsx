import React from 'react';
import ReactDOM from 'react-dom';
import ReactTextArea from './reactTextArea.jsx';

const Input = React.createClass({
    getInitialState() {
      this.state = {
        styles:{
          overflow: 'hidden',
          padding: 0,
          outline: 'none',
          resize: 'none',
        }
      };  
      return {};
    },
    handleOnChange() {      
      var element = this.refs.ta;
      this.state.actualHeight = {
        height: "auto"
      };

      this.forceUpdate();

      this.state.actualHeight = {
        height: element.scrollHeight
      };
      this.forceUpdate();
      this.props.textChanged(element.value);
    },
    render() { 
        return (
            <div>
                <h4>Paste Azure AD-issued JWT here</h4>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="textarea1" ref="ta" className="materialize-textarea" style={Object.assign({}, this.state.styles, this.state.actualHeight, this.state.readOnlyStyle)}
				cols={this.props.cols} rows={7} onChange={this.handleOnChange}></textarea>                      
                  </div>
                </div>
            </div>
        );
    }
});

export default Input;