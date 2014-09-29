'use strict';

var ops = {
	n: function(e) {
		this.setState({
			top: this._otop + e.dy,
			height: this._oheight - e.dy
		});
	},

	s: function(e) {
		this.setState({
			height: this._oheight + e.dy
		});
	},

	w: function(e) {
		this.setState({
			left: this._oleft + e.dx,
			width: this._owidth - e.dx
		});
	},

	e: function(e) {
		this.setState({
			width: this._owidth + e.dx
		});
	},

	nw: function(e) {
		this.setState({
			top: this._otop + e.dy,
			height: this._oheight - e.dy,
			left: this._oleft + e.dx,
			width: this._owidth - e.dx
		});
	},

	ne: function(e) {
		this.setState({
			top: this._otop + e.dy,
			width: this._owidth + e.dx,
			height: this._oheight - e.dy
		});
	},

	sw: function(e) {
		this.setState({
			width: this._owidth - e.dx,
			left: this._oleft + e.dx,
			height: this._oheight + e.dy
		});
	},

	se: function(e) {
		this.setState({
			width: this._owidth + e.dx,
			height: this._oheight + e.dy
		});
	}
};

module.exports = {
	onDeltaDragStart: function() {
		this._otop = this.state.top;
		this._oleft = this.state.left;
		this._owidth = this.state.width;
		this._oheight = this.state.height;
	},

	onDeltaDrag: function(d, e) {
		ops[d].call(this, e);
		if (this.onResize)
			this.onResize();
	}
};