# extended-date

```
//               Standar methods
.getDate
.getDay
.getFullYear
.getHours
.getMilliseconds
.getMinutes
.getMonth
.getSeconds
.getTime
.toJSON
.valueOfsetDate

//              Setting methods are chainable
.setFullYear
.setHours
.setMilliseconds
.setMinutes
.setMonth
.setSeconds
.setTime
**/

```

|Getters and Setters|
|-------------------|
|year               |
|month              |
|date               |
|hours              |
|minutes            |
|seconds            |
|milliseconds       |
|time               |

```
let a = new DateTime(2014, 0, 1);

a.year = 2015;
a.year          //2015
```

|Diffs (DateTime)|
|---------|
|diffYears|
|diffMonths|
|diffDays|
|diffHours|
|diffMinutes|
|diffSeconds|
|diffMilliseconds|

|Diff in (DateTime, round down)|
|---|
|diffInYears|
|diffInMonths|
|diffInDays|
|diffInHours|
|diffInMinutes|
|diffInSeconds|
|diffInMilliseconds|

```
let a = new DateTime(2014, 0, 1),
    b = new DateTime(2015, 1, 1);

a.diffMonths(b)         //1
a.diffInMonths(b)       //13.02...
a.diffInYears(b)        //1.08...
a.diffInYears(b, true)) //1 (round down)
b.diffInYears(a, true)) //-1 (round up)
```

|add/sub (year, month, day, ...) like in setFullYear, setMonths, ...|
|----|
|addYears|
|addMonths|
|addDays|
|addHours|
|addMinutes|
|addSeconds|
|addMilliseconds|

|other|
|---|
|format|
|clone|
|toDate|
|toUTCDate|
|toUTC|
|getDayOfYear|
|setDayOfYear(day, min, sec, ...)|

##DateTime statics

|methods|
|---|
|now|
|get => new DateTime()|
|getUTC|
|today => DateTime.get().setHours(0, 0, 0, 0)|
|todayUTC => DateTime.getUTC().setHours(0, 0, 0, 0)|
|locale - see below|
|format - see below|

``` js
DataTime.locale(lang)      //set lang
DataTime.locale(lang, definition) //add locale

//definition
{
    'ampm': 'am,pm'.split(','),
    'monthsLong': 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
    'monthsShort': 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
    'daysLong': 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
    'daysShort': 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
}

DateTime.get().format('{yyyy}-{MM}-{dd}')   //2017-02-20
//format strings like here: https://docs.angularjs.org/api/ng/filter/date

```