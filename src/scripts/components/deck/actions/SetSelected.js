'use strict';

class SetSelected {
  constructor(component, newValue) {
    this._oldValue = component.selected;
    this._newValue = newValue;
    this._component = component;
  }

  apply() {
    this._component.selected = this._newValue;
    this._component.trigger('change');
  }

  unapply() {
    this._component.selected = this._oldValue;
    this._component.trigger('change');
  }
}

module.exports = function(component, newValue) {
  if (newValue === component.selected) return;

  var action = new SetSelected(component, newValue);
  action.apply();
}
