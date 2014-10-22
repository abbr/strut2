/**
 * @jsx React.DOM
 */
var Draggable = require('interactions/Draggable');
var React = require('react/addons');

var DraggableElement = React.createClass({
  propTypes: {
    vert: React.PropTypes.bool,
    horiz: React.PropTypes.bool,
    onDrag: React.PropTypes.func,
    onDragStart: React.PropTypes.func
  },

  mixins: [Draggable],
  render: function() {
    var style = this.props.style || {};
    delete this.props.style;

    if (this.props.vert) {
      style.top = this.state.top;
    }

    if (this.props.horiz) {
      style.left = this.state.left;
    }

    if (!this.props.vert && !this.props.horiz) {
      style.top = this.state.top;
      style.left = this.state.left;
    }

    return (
      <div
        {...this.props}
        onMouseDown={this.onMouseDown}
        style={style}>
        {this.props.children}
      </div>
    );
  },

  onDrag: function(e) {
    if (this.props.onDrag) {
      this.props.onDrag(e);
    }
  },

  onDragStart: function() {
    if (this.props.onDragStart) {
      this.props.onDragStart();
    }
  }
});

module.exports = DraggableElement;