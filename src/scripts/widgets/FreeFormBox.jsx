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

	onDrag: function(e) {
		if (this.props.onChange) {
			this.props.onChange({
				left: e.left,
				top: e.top,
				width: this.props.style.width,
				height: this.props.style.height
			});
		}
	},

	onResize: function(e) {
		if (this.props.onChange) {
			// console.log(e);
			this.props.onChange({
				left: e.left != null ? e.left : this.props.style.left,
				top: e.top != null ? e.top : this.props.style.top,
				width: e.width != null ? e.width : this.props.style.width,
				height: e.height != null ? e.height : this.props.style.height
			});
		}
	},

	_onMouseDown(e) {
		this.onMouseDown(e);
	},

	_renderResizeControl: function(d) {
		return (
			<DeltaDragControl
				key={d}
				onDeltaDrag={this.onDeltaDrag}
				onDeltaDragStart={this.onDeltaDragStart}
				direction={d}
				className={"wdgt-resize-point wdgt-" + d} />
		);
	},

	render: function() {
		var resizeControls = resizeDirections.map(this._renderResizeControl);

		return (
			<div
				onMouseDown={this._onMouseDown}
				className="wdgt-crop-overlay"
				style={this.props.style}>
				<div className="wdgt-grid-dashed-h" />
				<div className="wdgt-grid-dashed-v" />
				{resizeControls}
				{this.props.children}
			</div>
		);
	}
});

module.exports = FreeFormBox;
