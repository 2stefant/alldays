# alldays
_alldays_ calculates all specific (e.g. sunday) days between \
two iso week days (1-7 means monday to sunday) \
and returns a list of strings in YYYY-MM-DD short calendar iso format.

# Usage

## Install
`npm install "@2stefant.org/alldays"`

## Declare - in a javascript code file
``` javascript
const {alldays} = require("@2stefant.org/alldays");
```
## Call

### Implemented so far
In the examples below, only options 1-7 are verified stable so far. \
The higher options are NOT IMPLEMENTED YET.

Additionally the method _alldaysVerbose_ aids in assisting during  \
implementation and securing the correct days, it returns detailed information:
```javascript
//alldaysVerbose()
return {
    searchCriteria: string,
    alldays: string[],
    logs: string
};
```

### Zero or one argument, index range 1-7, 10-17, 20-27
``` javascript
let days=alldays(); //No args = 7 = sundays current whole year.
console.log(JSON.stringify(days));

days=alldays(4); //4 = thursdays current whole year.
console.log(JSON.stringify(days));

days=alldays(17); //17 = sundays current year until current week.
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

### Update version in the package.json file
``` json
  "version": "1.X.0",
```
### Commit changes to github repo

### Open npm prompt, perform login to npm (add username, password and email)
`npm adduser`

### Publish package
`npm publish --access=public`

### Upgrade version in your consumer application
`npm update "@2stefant.org/alldays"`

