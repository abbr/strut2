'use strict';

var _ = require('lodash');

// Action to be added to undo history
class UpdateStyle {
  constructor(component, newStyle) {
    this._oldStyle = _.clone(component.style);
    this._newStyle = newStyle;
    this._component = component;
  }

  apply() {
    var component = this._component;
    _.assign(component.style, this._newStyle);
    component.trigger('change');
  }

  unapply() {
    var component = this._component;
    component.style = _.clone(this._oldStyle);
    component.trigger('change');
  }
}

module.exports = function(component, newStyle) {
  var action = new UpdateStyle(component, newStyle);
  action.apply();
};
