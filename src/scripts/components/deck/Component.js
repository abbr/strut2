'use strict';

var Css = require('html/Css');
var Events = require('events/Events');
var _ = require('lodash');

var key = 0;
function Component(node, options) {
	this.key = ++key;
	_.extend(this, Events);
	if (typeof node === 'string') {
		options = options || {};
		this.nodeName = node;
		this.content = '';
		this.style = {};
		this.classes = [];

		_.extend(this, options);
	} else { // have a node with content
		this.nodeName = node.nodeName;
		this.content = node.innerHTML;
		this.style = Css.textToObject(node.style.cssText);
		this.classes = node.className.split(' ');
	}
}

Component.prototype = {
	addClass: function(klass) {

	},

	updateStyle: function(newStyle) {
		_.assign(this.style, newStyle);
	},

	replaceStyle: function(newStyle) {
		this.style = newStyle;
	},

	replaceContent: function() {
		
	}
};

module.exports = Component;
