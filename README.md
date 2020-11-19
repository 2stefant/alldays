# alldays
alldays - calculates all specific (e.g. sunday) days between two dates.

# Usage

## Install
```
$ npm install "@2stefant.org/alldays"
```

## Declare - in a javascript code file
``` javascript
const alldays = require("@2stefant.org/alldays");
```

## Call

### Zero or one argument, index range 0-6, 10-16, 20-26
``` javascript
let days=alldays(); //No args = 0 = sundays this whole year.
console.log(JSON.stringify(days));

days=alldays(4); //4 = thursdays this whole year.
console.log(JSON.stringify(days));

days=alldays(10); //10 = sundays this year until current week.
console.log(JSON.stringify(days));

days=alldays(26); //26 = saturdays this year until current month.
console.log(JSON.stringify(days));
```

### From specific date
``` javascript
days=alldays(2, "2020-10-01"); //2 = tuesdays this whole year.
console.log(JSON.stringify(days));

days=alldays(20, "2020-10-01"); //2 = tuesdays until current month.
console.log(JSON.stringify(days));
```

### Specific date range
``` javascript
days=alldays(15, "2020-10-01", "2020-12-01"); //5 = fridays until current week.
console.log(JSON.stringify(days));
```

