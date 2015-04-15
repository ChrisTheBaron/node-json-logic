# node-json-logic
Package for expressing logical operations in JSON. Useful for storing logical procedures in a database.
## Examples of use
```javascript
var JSONMath = require('json-logic');
var logic = new JSONLogic();
var result = logic .execute({
	"a": {
		"operation": "||",
		"variables": [
			{
				"operation": "<",
				"variables": [
					5,
					1
				]
			},
			{
				"operation": "&&",
				"variables": [
					{
						"operation": "==",
						"variables": [
							8,
							2
						]
					},
					true
				]
			}
		]
	}
});
```
After this has executed, the value of `a`  will be `false`.

You can also pass in an array of operations to perform, and even reference variables inside the procedure
``` javascript
[
	{
		"a": true,
		"b": false
	},
	{
		"c": {
			"operation": "&&",
			"variables": [
				"a",
				"b"
			]
		}
	},
	{
		"c": "c"
	}
]
```
After this the value of `a` will be `true`, `b` will be `false` and `c` will be `false`.
