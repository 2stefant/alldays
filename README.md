# alldays
alldays - calculates all specific (e.g. sunday) days between two dates.

# Install
```
$ npm install @2stefant.org/alldays
```

# Usage

## No arguments means this year.
``` javascript
const alldays = require("@2stefant.org/alldays");

let days=alldays();

console.log(JSON.stringify(days));
```

## From specific date 
``` javascript
const alldays = require("@2stefant.org/alldays");

let days=alldays("2020-10-01");

console.log(JSON.stringify(days));
```

## Specific date range
``` javascript
const alldays = require("@2stefant.org/alldays");

let days=alldays("2020-10-01", "2020-12-01");

console.log(JSON.stringify(days));
```

