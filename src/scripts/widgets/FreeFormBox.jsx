/*
Shows control points and ant box around its content.
Events from control points get bubbled up to outside event handlers instead
of being handled by the box itself.
*/

var React = require('react/addons');
var Draggable = require('interactions/Draggable');
var DeltaDragControl = require('./DeltaDragControl');
var Resizable = require('interactions/Resizable');

var resizeDirections = [
	'n',
	'w',
	's',
	'e',
	'nw',
	'sw',
	'ne',
	'se'
];

var FreeFormBox = React.createClass({
	mixins: [Draggable, Resizable],

	getDefaultProps: function() {
		return {
			width: 0,
			height: 0
		}
	},

	onDrag: function(e) {
		if (this.props.onChange) {
			this.props.onChange({
				left: this.state.left,
				top: this.state.top,
				width: this.state.width,
				height: this.state.height
			});
		}
	},

	onResize: function(e) {
		this.onDrag();
	},

	getInitialState: function() {
		return {
			width: this.props.width,
			height: this.props.height
		};
	},

	render: function() {
		var resizeControls = resizeDirections.map(function(d) {
			return (
				<ResizeControl
					key={d}
					onDeltaDrag={this.onDeltaDrag}
					onDeltaDragStart={this.onDeltaDragStart}
					direction={d}
					className={"wdgt-resize-point wdgt-" + d} />
			);
		}, this);

		return (
			<div
				onMouseDown={this.onMouseDown}
				className="wdgt-crop-overlay"
				style={{
					top: this.state.top + 'px',
					left: this.state.left + 'px',
					width: this.state.width + 'px',
					height: this.state.height + 'px'
				}}>
				<div className="wdgt-grid-dashed-h" />
				<div className="wdgt-grid-dashed-v" />
				{resizeControls}
			</div>
		);
	}
});

module.exports = FreeFormBox;