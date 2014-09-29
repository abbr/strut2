/**
* @jsx React.DOM
*/
'use strict';

var React = require('react/addons');
var ImagePreview = require('./ImagePreview');
var CropOverlay = require('../CropOverlay');

var ImageCropper = React.createClass({
	getDefaultProps: function() {
		return {
			overlay: {
				width: 250,
				height: 100,
				top: 25,
				left: 25
			}
		}
	},

	getInitialState: function() {
		return {
			overlay: {
				width: this.props.overlay.width,
				height: this.props.overlay.height,
				top: this.props.overlay.top,
				left: this.props.overlay.left
			}
		}
	},

	onDraw: function() {
		this.onChange({
			width: this.state.overlay.width,
			height: this.state.overlay.height,
			top: this.state.overlay.top,
			left: this.state.overlay.left
		});
	},

	onChange: function(e) {
		if (this.props.onChange) {
			// Gotta get the canvas!!!
			e.src = this.getDOMNode().children[0];
			this.props.onChange(e);
		}
	},

	render: function() {
		return (
			<ImagePreview
				src={this.props.src}
				scale={true}
				onDraw={this.onDraw}
				className={(this.props.className||'') + ' wdgt-img-cropper'}>
				<div className="wdgt-crop-filter" />
				<CropOverlay
						width={this.state.overlay.width}
						height={this.state.overlay.height}
						top={this.state.overlay.top}
						left={this.state.overlay.left}
						onChange={this.onChange}
				/>
			</ImagePreview>
		);
	}
});

module.exports = ImageCropper;
