# alldays
alldays - calculates all specific (e.g. sunday) days between two dates.

# Usage

## Install
### `npm install "@2stefant.org/alldays"`

## Declare - in a javascript code file
``` javascript
const {alldays} = require("@2stefant.org/alldays");
```

## Call

### Zero or one argument, index range 0-6, 10-16, 20-26
``` javascript
let days=alldays(); //No args = 0 = sundays current whole year.
console.log(JSON.stringify(days));

days=alldays(4); //4 = thursdays current whole year.
console.log(JSON.stringify(days));

days=alldays(10); //10 = sundays current year until current week.
console.log(JSON.stringify(days));

days=alldays(26); //26 = saturdays current year until current month.
console.log(JSON.stringify(days));
```

### From specific date
``` javascript
days=alldays(2, "2020-10-01"); //2 = tuesdays current whole year.
console.log(JSON.stringify(days));

days=alldays(20, "2020-10-01"); //2 = tuesdays until current month.
console.log(JSON.stringify(days));
```

### Specific date range
``` javascript
days=alldays(15, "2020-10-01", "2020-12-01"); //5 = fridays until current week.
console.log(JSON.stringify(days));
```

# Howto update npm package

Update version in the package.json file
``` json
  "version": "1.5.0",
```
  
Login, add username, password and email
### `npm adduser`

Publish package
### `npm publish --access=public`

Upgrade version in your consumer application
### `npm update "@2stefant.org/alldays"`

