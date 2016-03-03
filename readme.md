# tableConvertCsv.js
----
- `version v1.0.0` - Author: Blind Holmes
----
- [Introduction](https://github.com/hewenhan/webTableConvertCsv#introduction)
- [Usage](https://github.com/hewenhan/webTableConvertCsv#usage)
- [Methods](https://github.com/hewenhan/webTableConvertCsv#methods)

----

## Introduction
This is a tools of make HTML TABLE convert to a Comma-Separated Values file and download.
This can be more convenient for the development of people's daily.
Let's see a example of this plugin in USE:
	- [Live demo](http://hewenhan.github.io/webTableConvertCsv/)

## Usage
As you can see in the example files, you will need to include:
 - The JavaScript file `tableConvertCsv.js`

### Including files:
```html
<script src="tableConvertCsv.js" type="text/javascript"></script>
```

###Required HTML structure
Start your HTML document with the compulsory [HTML DOCTYPE declaration](http://www.corelangs.com/html/introduction/doctype.html) on the 1st line of your HTML code. You might have troubles with sections heights otherwise. The examples provided use HTML 5 doctype `<!DOCTYPE html>`.

Set you want to download Table's ID like:
```html
<table id="table">
	<tr>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td></td>
		<td></td>
	</tr>
</table>
```

###Initialization
All you need to constructor function befor use.
like this:
```javascript
var csv = new csv();
```
And you should call the function after table is loaded.
like this:
```javascript
window.onload = function () {
	csv.download({
		tableId: 'table'
	});
};
```
A more complex initialization with all options set could look like this:
```javascript
csv.download({
	filename: 'webTable',
	tableId: 'table',
	boolean: true
});
```

#### Options
- `filename`: (default`webTable`) the filename of you want to download to path.
- `tableId`: (default`table`) you want to download Table's ID.
- `boolean`: (default`true`) create time stamp after the filename while download to path.

## Methods
### csv.getTableToArr(tableId)
return the id table orgin as Array
```javascript
csv.getTableToArr('table')
```

### csv.getTableToMap(tableId)
if table-td has set rowspan attributes > 2,then return a map array of need to create empty td.
it will return 3 arameters:
```array
[
	{
	    tr: 3,
	    td: 2,
	    span: 6
	},
	{
	    tr: 1,
	    td: 5,
	    span: 3
	},
	{
	    tr: 3,
	    td: 3,
	    span: 7
	}
]
```
#### The Arameters Explain
- `tr`: the number of first row need to create empty table-td.
- `td`: the number of the table-td has rowspan attributes order from left to right.
- `span`: the number of last row need to create empty table-td.

### csv.getCsvArr(tableId)
return the arr of table after check rowspan attributes,and create right empty td.
```javascript
csv.getCsvArr('table')
```

### csv.getCsvStrEncode(tableId)
return the string of CSV format with URLENCODE.
```javascript
csv.getCsvStrEncode('table')
```

### csv.download(obj)
create a link of target table and download.
```javascript
csv.download({
	filename: 'webTable',
	tableId: 'table',
	boolean: true
});
```
#### Options
- `filename`: (default`webTable`) the filename of you want to download to path.
- `tableId`: (default`table`) you want to download Table's ID.
- `boolean`: (default`true`) create time stamp after the filename while download to path.