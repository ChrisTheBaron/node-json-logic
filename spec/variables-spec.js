'use strict';

require('./helper.js');

var variables = require('./examples/variables.json');

var JSONLogic = require('./../index');

describe('Recurse it doing variable logic', function () {

	it('should be able to do > < <= => == != with variables', function () {

		var logic = new JSONLogic();

		var result = logic.execute(variables);

		assert.deepEqual(result, {a: true, b: true, c: true});

	});

});
