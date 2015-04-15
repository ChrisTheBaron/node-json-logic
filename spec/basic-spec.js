'use strict';

require('./helper.js');

var basic = require('./examples/basic.json');

var JSONLogic = require('./../index');

describe('Basic', function () {

	describe('should always start with no variables', function () {

		it('should return an empty object if no operations are applied', function () {

			var logic = new JSONLogic();

			var result = logic.execute({});

			assert.deepEqual(result, {});

		});

		it('should return an empty object if no operations are applied - part 2', function () {

			var logic = new JSONLogic();

			var result = logic.execute([]);

			assert.deepEqual(result, {});

		});

	});

	describe('it doing basic logic', function () {

		it('should be able to do && || > < <= => == != ^ ', function () {

			var logic = new JSONLogic();

			var result = logic.execute(basic);

			assert.deepEqual(result, {
				a: true,
				b: false,
				c: true,
				d: false,
				e: true,
				f: false,
				g: true,
				h: false,
				i: true,
				j: false,
				k: true,
				l: false,
				m: true,
				n: false,
				o: true,
				p: false,
				q: true,
				r: false
			});

		});

	});

});
