/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Geometry = require('math/Geometry');
var _ = require('lodash');
var ComponentViewFactory = 
	require('components/app_deck/views/ComponentViewFactory');
	
require('components/OperatingTable.css');

var OperatingTable = React.createClass({
	_computeOtsSquare: function() {
		var deck = this.props.deck;
		var slideWidth = deck.config.slideWidth;
		var slideHeight = deck.config.slideHeight;

		var rootElSize = window.getComputedStyle(this.refs.rootEl.getDOMNode());

		if (!rootElSize)
			return {};

		var width = parseInt(rootElSize.width);
		var height = parseInt(rootElSize.height);

		var scale = Geometry.getFitSquareScaleFactor(
			slideWidth,
			slideHeight,
			width,
			height - 20
		);

		var leftOffset = (width - slideWidth * scale) / 2;
		var topOffset = (height - slideHeight * scale) / 2;

		return {
			transform: 'scale(' + scale + ')',
			marginLeft: leftOffset + 'px',
			width: slideWidth,
			height: slideHeight
		};
	},

	_resized: function() {
		this.setState({
			otsStyle: this._computeOtsSquare()
		});
	},

	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		this._resized();

		window.addEventListener('resize', this._resized);
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize', this._resized);
	},

	renderComponent: function(component) {
		var Node = ComponentViewFactory(component);
		return <Node model={component} key={component.key} />
	},

	render: function() {
		var slide = this.props.deck.getSelectedSlide();
		var components = null;
		if (slide) {
			components = slide.components.map(this.renderComponent);
		}

		return (
			<div className="strt-operating-table" ref="rootEl">
				<div className="strt-ot-slide" style={this.state.otsStyle}>
					{components}
				</div>
			</div>
		);
	}
});

module.exports = OperatingTable;
