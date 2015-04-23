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

	onBoxUpdated: function() {
		// Set on the model props
	},

	onModelUpdated: function() {
		// re-render
		this.forceUpdate();
	},

	onChange: function(e) {
		this.props.model.updateStyle(e);
		this.props.model.trigger('change');
	},

	shouldComponentUpdate: function() {
		return false;
	},

	componentDidMount: function() {
		// figure out or size
		// If it isn't set on the model already, compute it from the rendered node
		// and set it on the model
	},

	render: function() {	
		var model = this.props.model;
		// model has all the attributes of the node on it... we should pull
		// those out an apply them to ourself

		// Will use 'FreeFormBox' which bubble resize/drag events up to us
		// When we receive those events we'll save them in to our model.
		// The model knows how to serialize itself and since it serializes
		// into a DOM structure that serialized format can be used for
		// rendering it too.

		// How about our slide previews?
		// We'll need to update them... either via events from the model
		// or events bubbled out and pushed back through the UI

		return (
			<FreeFormBox
				style={model.style}
				onChange={this.onChange}
				className="strt-slide-comp"
				containerScale={this.props.containerScale}
				doesntDragSelf={true}>
				<div dangerouslySetInnerHTML={{__html: model.content}} />
			</FreeFormBox>
		);
	}
});

module.exports = FreeForm;