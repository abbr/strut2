/**
 * @jsx React.DOM
 */
'use strict';

window.log = require('logger/Log');
window.log.config = {
	debug: true
};

var React = require('react/addons');

require('bootstrap.css');
require('main.css');

var App = React.createClass({
	render: function() {
		return (
			<div>
				Experiment!
			</div>
		);
	}
});

var Root = require('widgets/Root.jsx');

React.renderComponent(<Root><App /></Root>, document.getElementById('content')); // jshint ignore:line

module.exports = App;
