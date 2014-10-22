module.exports = {
  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  },

  componentWillUnmount: function() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },

  getDefaultProps: function () {
    return {
      top: 0,
      left: 0
    };
  },

  getInitialState: function () {
    return {
      top: this.props.top,
      left: this.props.left,
      dragging: false
    };
  },

  onMouseDown: function (e) {
    // only left mouse button
    if (e.button !== 0) return;

    var computedStyle = window.getComputedStyle(this.getDOMNode());
    var pos = {
      top: parseInt(computedStyle.top, 10),
      left: parseInt(computedStyle.left, 10)
    };

    if (this.onDragStart) {
      this.onDragStart();
    }

    this.setState({
      dragging: true,
      oleft: pos.left,
      otop: pos.top,
      ox: e.pageX,
      oy: e.pageY
    });

    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp: function (e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseMove: function (e) {
    if (!this.state.dragging) return;
    var scale = this.props.containerScale || 1;

    var dx = (e.pageX - this.state.ox) / scale;
    var dy = (e.pageY - this.state.oy) / scale;

    if (!this._doesntDragSelf) {
      this.setState({
        left: this.state.oleft + dx,
        top: this.state.otop + dy
      });
    }

    if (this.onDrag) {
      this.onDrag({
        left: this.state.left,
        top: this.state.top,
        dx: dx,
        dy: dy
      });
    }

    e.stopPropagation();
    e.preventDefault();
  }
};
