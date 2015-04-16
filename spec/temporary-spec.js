'use strict';

require('./helper.js');

var variables = require('./examples/temporary.json');

var JSONLogic = require('./../index');

describe('Recurse it doing maths with temporary variables', function () {

	it('should be able to do logic with temporary variables', function () {

		var logic = new JSONLogic();

		var result = logic.execute(variables, {a: true, b: true});

		assert.deepEqual(result, {c: true});

	});

});
