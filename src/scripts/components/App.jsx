/**
 * @jsx React.DOM
 */
'use strict';

window.log = require('logger/Log');
window.log.config = {
	debug: true
};

require('polyfills');
require('components/Features');

var React = require('react/addons');

require('bootstrap.css');
require('main.css');

var subViews = {
	editor: require('components/editor/Editor.jsx')
};

var App = React.createClass({
	getInitialState: function() {
		return {
			view: 'editor'
		};
	},

	render: function() {
		var CurrentView = subViews[this.state.view];
		return (
			<div>
				<CurrentView />
			</div>
		);
	}
});

var Root = require('widgets/Root.jsx');

React.renderComponent(<Root><App /></Root>, document.getElementById('content')); // jshint ignore:line

module.exports = App;
