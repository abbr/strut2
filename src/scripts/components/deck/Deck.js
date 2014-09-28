'use strict';

/*
The raw format of a deck:
(really just html)

<div> (or any root element)
	<div> (slides.  Can be any immediate child element of the deck.)
	</div>

	<div>
		<img />
		<video />
		<div/> <-- treat this as text or unknown?  Just a content-editable on the slide editor...
		<object />

	</div>
</div>
*/

var Slide = require('./Slide');
var _ = require('lodash');

var defaultConfig = {
	slideWidth: 900,
	slideHeight: 700
}

function Deck(rawDeck) {
	if (rawDeck) {
		var rawString = rawDeck.presentation;
		var dummyEl = document.createElement('div');
		dummyEl.innerHTML = rawString;
		var root = dummyEl.children[0];

		this.slides = _.map(root.children, Slide.create);
		this.config = rawDeck.config;
	} else {
		this.slides = [];
		this.config = _.extend({}, defaultConfig);
	}
}

Deck.prototype = {
	__getArray: function() {
		return this.slides;
	}
};

module.exports = Deck;
