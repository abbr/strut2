/*
Shows control points and ant box around its content.
Events from control points get bubbled up to outside event handlers instead
of being handled by the box itself.
*/

var Css = require('html/Css');
var DeltaDragControl = require('./DeltaDragControl');
var Draggable = require('interactions/Draggable');
var React = require('react/addons');
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

	componentWillMount() {
		this._lastClick = 0;
	},

	onDrag(e) {
		if (this.props.onChange) {
			this.props.onChange({
				left: e.left,
				top: e.top,
				width: this.props.style.width,
				height: this.props.style.height
			});
		}
	},

	onResize(e) {
		if (this.props.onChange) {
			this.props.onChange({
				left: e.left != null ? e.left : this.props.style.left,
				top: e.top != null ? e.top : this.props.style.top,
				width: e.width != null ? e.width : this.props.style.width,
				height: e.height != null ? e.height : this.props.style.height
			});
		}
	},

	onClick(e) {
		if (this.props.onClick) {
			this.props.onClick(e);
		}
	},

	_onMouseDown(e) {
		if (this.props.onMouseDown) {
			this.props.onMouseDown(e);
		}
		this.onMouseDown(e);
	},

	_renderResizeControl(d) {
		return (
			<DeltaDragControl
				key={d}
				onDeltaDrag={this.onDeltaDrag}
				onDeltaDragStart={this.onDeltaDragStart}
				onClick={this.props.onClick}
				direction={d}
				className={"wdgt-resize-point wdgt-" + d} />
		);
	},

	render() {
		if (this.props.selected) {
			var resizeControls = resizeDirections.map(this._renderResizeControl);
		}

		return (
			<div
				onMouseDown={this._onMouseDown}
				onClick={this.onClick}
				className={Css.toClassString({
					"wdgt-crop-overlay": true,
					selected: this.props.selected,
				})}
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
