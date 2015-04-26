var Util = require('Util');
var PureSlide = require('components/deck/Slide');

class Slide {
	constructor(pureSlide, appSlideState) {
		this.pureSlide = pureSlide || new PureSlide();
		this.selectedComponents = [];
		this.editedComponents = [];

		_.extend(this, appSlideState);
	}

	get id() {
		return this.pureSlide.id;
	}

	get components() {
		return this.pureSlide.components;
	}

	selectComponent(comp) {
		this.selectedComponents.forEach((c) => c.setSelectedUndoable(false));
		this.selectedComponents = [comp];
		comp.setSelectedUndoable(true);
	}

	editComponent(comp) {
		this.editedComponents.forEach((c) => c.setEditing(false));
		this.editedComponents = [comp];
		comp.setEditing(true);
	}

	multiSelectComponents(boundingBox) {

	}

	unselectComponents() {
		this.selectedComponents.forEach((c) => c.setSelectedUndoable(false));
		this.selectedComponents = [];
	}

	stopEditingComponents() {
		this.editedComponents.forEach((c) => c.setEditing(false));
		this.editedComponents = [];
	}

	addComponent(type, options) {
		this.pureSlide.addComponent(type, options);
	}
};

module.exports = Slide;
