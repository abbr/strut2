/**
* @jsx React.DOM
*/
var React = require('react/addons');
var Draggable = require('interactions/Draggable');

var DeltaDragControl = React.createClass({
	mixins: [Draggable],

	dragStarted: function() {
		if (this.props.onDeltaDragStart) {
			this.props.onDeltaDragStart();
		}
	},

	onDrag: function(e) {
		if (this.props.onDeltaDrag) {
			this.props.onDeltaDrag(this.props.direction, e);
		}
	},

	componentWillMount: function() {
		this._doesntDragSelf = true;
	},

	render: function() {
		return (
		<div className={this.props.className}
			onMouseDown={this.onMouseDown}>
			{this.props.children}
		</div>);
	}
});

module.exports = DeltaDragControl;