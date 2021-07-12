1. [Setup](#setup)
2. [Run](#run)
3. [Testing](#testing)
4. [Development](#development)
5. [Git commits](#git-commits)
6. [Coding style](#coding-style)

Setup
=====

Run
===

Testing
=======

Development
===========

* Sublime Text 3: http://www.sublimetext.com/3
* Sublime TypeScript plugin: https://github.com/Microsoft/TypeScript-Sublime-Plugin
* Atom: https://atom.io/
* Visual Studio Code: https://code.visualstudio.com/

Git commits
===========

Branch convention:
`insa-[App shorthand]-[Card numner]`

Example:
`insa-co-123`

Commit message:
`[App shorthand] Action`
`Card name`

Example:

`[CO] Fix product title input`
`(CO-1) Product form is broken`

Eslint
======

We use Eslint to lint code follow bellow coding style
Setup Eslint in vscode by following steps:
- At root folder InsaServices, run `npm install`
- Open settings of vscode Preferences > Settings
- Search for `eslint` > edit setting.json file
- Add these rules and save:
```
    "eslint.run": "onSave",
	"eslint.codeAction.showDocumentation": {
		"enable": true
	},
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	}
```

Finnaly, whenever you change something and save them, eslint will help you to fix the code by configured convention and show the warning on invalid code that it can't fix automatically

Coding style
============

Basic rule is: blend in. New code should match the style of existing code. When in doubt,
look around the code to find similar constructs. We use tabs for indentation, ensure that
your editor does not convert them to spaces.

Try to get as much type coverage with TypeScript as possible. Always specify types of
parameters and return values of functions. Use descriptive, specific names for variables and functions.
For example, instead of:

```js
function copy(id) {}
```

do:

```js
function copyProduct(productId: string): void {}
```

Avoid too long lines or too deep indentation levels - they harm readability. Extract
things into additional variables or functions to make things readable. Prefer early return
from a function instead of nesting `if` statements.

Separate blocks of code visually by putting empty lines around them.

Examples of some common syntax constructs (pay attention to spacing and punctuation):

```js
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}

// ES6 "let of" syntax.
for (let item of items) {
    console.log(item);
}

switch (document.type) {
    case DocumentType.Foo: {
        console.log("foo");
        break;
    }
    case DocumentType.Bar: {
        console.log("bar");
        break;
    }
    default: {
        console.log("default");
        break;
    }
}

// ES6 arrow function.
collection.find().map(doc => console.log(doc));

setTimeout(function(): void {
    console.log("timeout");
}, 200);

const enum AnimalType {
    Horse,
    Monkey,
    Human, // Last entry should end with a comma.
} // No semicolon here - this is declaration, not a statement.

interface Animal {
    type: AnimalType;
    name: string;
    height: number;
}

let animal: Animal = { // Don't forget the type.
    type: AnimalType.Human,
    name: "Sven Svensson",
    height: 200, // Last entry should end with a comma.
}; // This is a statement, and therefore should end with a semicolon.

let animals: Animal[] = [{
    /* ... */
}, {
    /* ... */
}];
```
