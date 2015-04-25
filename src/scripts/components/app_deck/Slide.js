var Util = require('Util');
var PureSlide = require('components/deck/Slide');

class Slide {
	constructor(pureSlide, appSlideState) {
		this.pureSlide = pureSlide || new PureSlide();
		this.selectedComponents = [];

		_.extend(this, appSlideState);
	}

	get id() {
		return this.pureSlide.id;
	}

	get components() {
		return this.pureSlide.components;
	}

	selectComponent(comp) {
		this.selectedComponents.forEach((c) => c.setSelected(false));
		this.selectedComponents = [comp];
		comp.setSelected(true);
	}

	multiSelectComponents(boundingBox) {

	}

	addComponent(type, options) {
		this.pureSlide.addComponent(type, options);
	}
};

module.exports = Slide;
