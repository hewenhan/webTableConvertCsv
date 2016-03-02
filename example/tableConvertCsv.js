var downloadCsv = function (filename, tableId, boolean) {
    return function (filename, tableId, boolean) {
        var getTableToArr = function (tableId) {
            var table = document.getElementById(tableId);
            var arr = [];
            var tr = table.getElementsByTagName('tr');
            for (var i = 0; i < tr.length; i++) {
                arr[i] = [];
                var th = tr[i].getElementsByTagName('th');
                for (var j = 0; j < th.length; j++) {
                    arr[i][j] = th[j].innerText;
                }
                var td = tr[i].getElementsByTagName('td');
                for (var j = 0; j < td.length; j++) {
                    arr[i][j] = td[j].innerText;
                }
            }
            return arr;
        };

        var getTableToMap = function (tableId) {
            var table = document.getElementById(tableId);
            var tr = table.getElementsByTagName('tr');
            var map = [];
            for (var i = 0; i < tr.length; i++) {
                var td = tr[i].getElementsByTagName('td');
                for (var j = 0; j < td.length; j++) {
                    var rowSpan = td[j].rowSpan;
                    if (rowSpan >= 2) {
                        map.push({
                            tr: i + 1,
                            td: j,
                            span: rowSpan + i
                        });
                    }
                }
            }
            var sortTd = function (a, b) {
                return a.td - b.td;
            };
            return map.sort(sortTd);
        };

        var insertEmptyTd = function (array, mapArr) {
            var arr = array;
            var map = mapArr;
            for (var i = 0; i < map.length; i++) {
                var td1 = map[i].td;
                var tr1 = map[i].tr;
                for (var j = 0; j < map.length; j++) {
                    var span2 = map[j].span - 1;
                    var td2 = map[j].td;
                    var tr2 = map[j].tr;
                    if (tr1 <= span2 && td1 > td2 && tr1 !== tr2) {
                        map[i].td++;
                    }
                }
            }
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < map.length; j++) {
                    var tr = map[j].tr;
                    var td = map[j].td;
                    var span = map[j].span;
                    if (tr === i) {
                        for (var k = tr; k < span; k++) {
                            arr[k].splice(td, 0, '');
                        }
                    }
                }
            }
            return arr;
        };


        var takeCsvArr = function (tableId) {
            var regLastCode = function (str, patt) {
                var reg = new RegExp(patt, "ig");
                while ((result = reg.exec(str)) !== null) {
                    var lastIndex = reg.lastIndex;
                }
                var startIndex = lastIndex - patt.length;
                var endIndex = lastIndex;
                return str.substring(0, startIndex) + str.substring(endIndex);
            };
            var tr = insertEmptyTd(getTableToArr(tableId), getTableToMap(tableId));
            var tableStr = '';
            for (var i = 0; i < tr.length; i++) {
                var td = tr[i];
                var trTdStr = '';
                for (var j = 0; j < td.length; j++) {
                    var text = td[j];
                    text = text.replace(/"/g, '""');
                    text = encodeURIComponent(text);
                    var thCellStr = "%22" + text + "%22%2c";
                    trTdStr += thCellStr;
                }
                trTdStr = regLastCode(trTdStr, '%2c');
                if (trTdStr !== '') {
                    tableStr += trTdStr + '%0a';
                }
            }
            return tableStr;
        };

        var downloadFile = function (fileName, content) {
            var aLink = document.createElement('a');
            var blob = new Blob([content]);
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt);
        };
        var timestr = new Date().getTime();
        if (!boolean) {
            timestr = '';
        }

        downloadFile(filename + timestr + '.csv', decodeURIComponent(takeCsvArr(tableId)));
    };
};