/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var FreeFormBox = require('widgets/FreeFormBox.jsx');
require('components/SlideComps.css');

var FreeForm = React.createClass({
	componentWillMount: function() {
		this.props.model.on('change', this.onModelUpdated, this);
	},

	componentWillUnmount: function() {
		this.props.model.off(null, null, this);
	},

	onModelUpdated: function() {
		this.forceUpdate();
	},

	onChange: function(e) {
		this.props.model.updateStyle(e);
	},

	onMouseDown() {
		this.props.slide.selectComponent(this.props.model);
	},

	onClick(e) {
		e.stopPropagation();
	},

	shouldComponentUpdate: function() {
		return false;
	},

	render: function() {
		var model = this.props.model;

		return (
			<FreeFormBox
				style={model.style}
				selected={model.selected}
				onChange={this.onChange}
				onClick={this.onClick}
				onMouseDown={this.onMouseDown}
				className="strt-slide-comp"
				containerScale={this.props.containerScale}
				doesntDragSelf={true}>
				<div dangerouslySetInnerHTML={{__html: model.content}} />
			</FreeFormBox>
		);
	}
});

module.exports = FreeForm;
