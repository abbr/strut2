/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var DraggableElement = require('widgets/DraggableElement.jsx');
var ResizableBox = require('widgets/ResizableBox.jsx');
require('components/SlideComps.css');

var FreeForm = React.createClass({
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
			<DraggableElement
				className="strt-slide-comp"
				containerScale={this.props.containerScale}
				dangerouslySetInnerHTML={{__html: model.content}}
			/>
		);
	}
});

module.exports = FreeForm;