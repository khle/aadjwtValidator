import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main.jsx';
import Result from './result.jsx';

const RouterMixin = require('react-mini-router').RouterMixin;

const App = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'home',
        '/verify/:jwt': 'verify'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    home: function() {
        return <Main />;
    },

    verify: function(jwt) {
        return <Result jwt={jwt}></Result>;
    },

    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }

});

ReactDOM.render(<App/>, document.getElementById('container'));