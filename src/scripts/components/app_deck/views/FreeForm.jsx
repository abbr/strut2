/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var DraggableElement = require('widgets/DraggableElement.jsx');
require('components/SlideComps.css');

var FreeForm = React.createClass({
	render: function() {	
		var model = this.props.model;
		// model has all the attributes of the node on it... we should pull
		// those out an apply them to ourself

		// DraggableElement and down is what'll actually get stringified
		// when rendering the presentation.
		// `ResizableBox` will be an outer element that, when it changes,
		// passes new props down into the DraggableElement.
		// This is because `ResizableBox` is an application level view
		// and not a view that should be in the final presentation.
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