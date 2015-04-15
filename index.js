'use strict';

/**
 * Constructs a new JSONLogic instance with some options
 * @type {Function}
 * @param {{}} options
 * @constructor
 */
var JSONLogic = module.exports = function (options) {

	options = options || {};

	this.strict = options.strict || true;

	this.variables = {};

};

/**
 * Executes one or more logical operations on a set of variables
 * @param {Array|Object} operations
 * @returns {Object|null}
 * @throws Error
 */
JSONLogic.prototype.execute = function (operations) {

	switch (operations.constructor) {

		case Array:
			return this._executeArray(operations);
			break;
		case Object:
			return this._executeObject(operations);
			break;
		default:
			if (this.strict) {
				throw new Error("Invalid call to JSONLogic#execute with: " + JSON.stringify(operations));
			}
			return null;

	}

};

/**
 * Executes a series of operations and then returns the resultant variables
 * @param {Array} operations
 * @returns {{}|null}
 * @private
 */
JSONLogic.prototype._executeArray = function (operations) {

	operations.forEach(function (operation) {

		this._executeObject(operation);

	}.bind(this));

	return this.variables;

};

/**
 * Executes a single operation and then returns the resultant variables
 * @param {Object} operation
 * @private
 */
JSONLogic.prototype._executeObject = function (operation) {

	/*
	 * Here's where the fancy stuff is going to happen
	 */

	var newVariables = {};

	for (var variable in operation) {
		if (operation.hasOwnProperty(variable)) {

			newVariables[variable] = this._calculate(operation[variable]);

		}
	}

	for (var variable in newVariables) {
		if (newVariables.hasOwnProperty(variable)) {

			this.variables[variable] = newVariables[variable];

		}
	}

	return this.variables;

};

JSONLogic.prototype._calculate = function (operation) {

	var func;

	switch (operation.operation) {

		/*
		 * Here's the weird operations
		 */
		case "&&":
			return this._calcAnd(operation);
		case "||":
			return this._calcOr(operation);

		/*
		 * Now the normalish ones
		 */
		case ">":
			func = function (a, b) {
				return a > b
			};
			break;
		case "^":
			func = function (a, b) {
				return !a != !b
			};
			break;
		case ">=":
		case "=>":
			func = function (a, b) {
				return a >= b
			};
			break;
		case "<":
			func = function (a, b) {
				return a < b
			}
			break;
		case "<=":
		case "=<":
			func = function (a, b) {
				return a <= b
			}
			break;
		case "==":
			func = function (a, b) {
				return a === b
			}
			break;
		case "!=":
			func = function (a, b) {
				return a !== b
			}
			break;

		/*
		 * Now we've got static values and variables
		 */
		default:
			if (operation === true || operation === false) {
				return operation;
			} else if (operation.constructor === String) {
				return this.variables[operation];
			}
			throw new Error("Invalid operation to perform: " + JSON.stringify(operation));
			break;
	}

	var a = operation.variables[0];

	if (a.constructor === Object) {
		a = this._calculate(a);
	} else if (a.constructor === String) {
		a = this.variables[a];
	}

	var b = operation.variables[1];

	if (b.constructor === Object) {
		b = this._calculate(b);
	} else if (a.constructor === String) {
		b = this.variables[b];
	}

	return func(a, b);

};

/**
 * Calculates a series of operations until one of them returns false
 * @param operation
 * @returns {boolean}
 * @private
 */
JSONLogic.prototype._calcAnd = function (operation) {

	var result = true;

	operation.variables.forEach(function (val) {

		if (!this._calculate(val)) {
			result = false;
			return false;
		}

	}.bind(this));

	return result;

};

/**
 * Calculates a series of operations until one of them returns true
 * @param operation
 * @returns {boolean}
 * @private
 */
JSONLogic.prototype._calcOr = function (operation) {

	var result = false;

	operation.variables.forEach(function (val) {

		if (!!this._calculate(val)) {
			result = true;
			return false;
		}

	}.bind(this));

	return result;

};
