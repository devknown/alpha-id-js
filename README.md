<h4 align="center">AlphaID.js - Convert any integer to a short alphanumeric version</h4>

<p align="center">
   <a href="https://github.com/devknown/alpha-id-js/releases">
   <img alt="Release" src="https://img.shields.io/github/v/release/devknown/alpha-id-js">
   <a href="https://github.com/devknown/alpha-id-js/actions/workflows/tests.yml">
   <img alt="Tests" src="https://github.com/devknown/alpha-id-js/actions/workflows/tests.yml/badge.svg">
   <a href="https://github.com/devknown/alpha-id-js/actions/workflows/build.yml">
   <img alt="Build" src="https://github.com/devknown/alpha-id-js/actions/workflows/build.yml/badge.svg">
   <a href="https://github.com/devknown/alpha-id-js/blob/main/LICENSE">
   <img alt="License" src="https://img.shields.io/github/license/devknown/alpha-id-js">
   <a href="https://www.npmjs.com/package/alpha-id-js">
   <img alt="Downloads" src="https://img.shields.io/npm/dy/alpha-id-js">
</p>

# AlphaID.js

AlphaID.js is a library that let you convert any integer to a short alphanumeric version. It can be useful for generating short, unique, and obfuscated identifiers.

## AlphaID Library Versions

- [PHP Version](https://github.com/devknown/alpha-id)
- [JavaScript Version](https://github.com/devknown/alpha-id-js)
- [Python Version](https://github.com/devknown/alpha-id-py)

# Installation

You can install AlphaID.js using npm:

```bash
npm i alpha-id-js
```

Via CDN:

```html
<script src="https://unpkg.com/alpha-id-js"></script>
```

# Getting Started

Simple usage looks like:

```javascript
const AlphaID = require('alpha-id-js');
// or from browser ->  <script src="https://unpkg.com/alpha-id-js"></script> 

const encodedString = AlphaID.convert(258456357951);
console.log(encodedString);
// Output: '4y7exoH'

const originalNumber = AlphaID.recover('4y7exoH');
console.log(originalNumber);
// Output: 258456357951
```

Configuring a Global Key

You can set a global key that will be used for encoding and decoding if no specific key is provided. This can be done using the `config` method:

```javascript
const AlphaID = require('alpha-id-js');

AlphaID.config('my_key');

const encodedString = AlphaID.convert(258456357951);
console.log(encodedString);
// Output: '4ymMZq9'

const originalNumber = AlphaID.recover('4ymMZq9');
console.log(originalNumber);
// Output: 258456357951
```

## License

AlphaID is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
