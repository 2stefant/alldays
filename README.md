# alldays
_alldays_ calculates all specific (e.g. sunday) days between \
two iso week days (1-7 means monday to sunday) \
and returns a list of strings in YYYY-MM-DD short calendar iso format.

# Technologies
This npm package is written with:
- Visual Studio Code
- Typescript
- Jest, JavaScript Testing Framework with Code coverage enabled as default
- TSLint, static analysis tool
- Moment.js, javaScript date library for parsing, validating, manipulating and formatting dates

# Usage

## Install
`npm install "@2stefant.org/alldays"`

## Upgrade to newer version
`npm update "@2stefant.org/alldays"`

## Declare - in a javascript code file
``` javascript
const {alldays, dayMetrics, dayInWeek} = require("@2stefant.org/alldays");
```
## Call

### Implemented so far
In the examples below, only options 1-7 are verified stable so far. \
The higher options are NOT IMPLEMENTED YET.

### Detailed information
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

### Day metrics
The method _dayMetrics_ provides various Day related metrics such as: \
day, dayBefore, weekStartDay, currentWeek, quarter, currentYearStartDay etc.
```javascript
return dayMetrics("2020-11-22");

// Other useful methods:
console.log(dayInWeek"2020-11-22",1)); // 2020-11-16, monday.
console.log(dayInWeek"2020-11-22",5)); // 2020-11-20, friday.
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

# How to update an npm package

### Update version in the package.json file
``` json
  "version": "1.X.0",
```
### Commit changes to github repo

### Open npm prompt, perform login to npm (add username, password and email)
`npm adduser`

### Publish package
First time
`npm publish --access=public`

Next time
`npm publish`

