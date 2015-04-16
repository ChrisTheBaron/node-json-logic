'use strict';

require('./helper.js');

var recurse = require('./examples/recurse.json');

var JSONLogic = require('./../index');

describe('Recurse it doing recursive logic', function () {

	it('should be able to do > < <= => == != recursively', function () {

		var logic = new JSONLogic();

		var result = logic.execute(recurse);

		assert.deepEqual(result, {a: false});

	});

});
