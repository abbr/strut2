module.exports = {
  componentWillUnmount: function() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },

  componentWillMount: function() {
    this._draggable = {
      dragging: false,
    };
  },

  onMouseDown: function (e) {
    // only left mouse button
    if (e.button !== 0) return;

    if (!this._draggable.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }

    if (this.onDragStart) {
      this.onDragStart();
    }

    var draggable = this._draggable;
    draggable.dragging = true;
    var computedStyle = window.getComputedStyle(this.getDOMNode());
    draggable.oleft = parseInt(computedStyle.left, 10) || 0;
    draggable.otop = parseInt(computedStyle.top, 10) || 0;
    draggable.ox = e.pageX;
    draggable.oy = e.pageY;

    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp: function (e) {
    this._draggable.dragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseMove: function (e) {
    var draggable = this._draggable;
    if (!draggable.dragging) return;

    var scale = this.props.containerScale || 1;
    var dx = (e.pageX - draggable.ox) / scale;
    var dy = (e.pageY - draggable.oy) / scale;

    if (!this.props.doesntDragSelf) {
      this.setState({
        left: draggable.oleft + dx,
        top: draggable.otop + dy
      });
    }

    if (this.onDrag) {
      this.onDrag({
        left: draggable.oleft + dx,
        top: draggable.otop + dy,
        dx: dx,
        dy: dy
      });
    }

    e.stopPropagation();
    e.preventDefault();
  }
};
