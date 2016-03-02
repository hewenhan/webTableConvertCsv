DOCUMANTION:
	READY:
		insert this Code in html head tag;
		<script src="tableConvertCsv.js" type="text/javascript"></script>

	METHOD:
		after "tableConvertCsv.js" is loaded;
			Create a function first:
				var downloadCsv = new downloadCsv();
			use the function to download table in CSV:
				downloadCsv(filename, tableId, boolean);
					filename(string): set the file name;
					tableId(string): target table's elementId;
					boolean(true or false): create timestamp after end of filename in path or not;

USAGE:

<script src="tableConvertCsv.js" type="text/javascript"></script>

<table id="table">
	<tr>
		<td>row 1, cell 1</td>
		<td>row 1, cell 2</td>
	</tr>
	<tr>
		<td>row 2, cell 1</td>
		<td>row 2, cell 2</td>
	</tr>
</table>

<button onclick="downloadCsv('webTableToCsv', 'table')">downloadCsv</button>

<script>
    //使用前先构造函数
    var downloadCsv = new downloadCsv();
</script>


EXAMPLE:
	http://hewenhan.github.io/webTableConvertCsv/