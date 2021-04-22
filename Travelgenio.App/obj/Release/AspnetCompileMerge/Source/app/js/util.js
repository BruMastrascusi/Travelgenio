function getEmptyGuid(){
    return "00000000-0000-0000-0000-000000000000";
};

function isGuidEmpty(field){
    return (field ==="00000000-0000-0000-0000-000000000000");
};
function evenRound(num, decimalPlaces) {
    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    var i = Math.floor(n), f = n - i;
    var e = 1e-8; // Allow for rounding errors in f
    var r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}

function devolverMes(mesInteger){
    var mes = "";
    switch (mesInteger) {
        case 0:
            mes = "Enero";
            break;
        case 1:
            mes = "Febrero";
            break;
        case 2:
            mes = "Marzo";
            break;
        case 3:
            mes = "Abril";
            break;
        case 4:
            mes = "Mayo";
            break;
        case 5:
            mes = "Junio";
            break;
        case 6:
            mes = "Julio";
            break;
        case 7:
            mes = "Agosto";
            break;
        case 8:
            mes = "Setiembre";
            break;
        case 9:
            mes = "Octubre";
            break;
        case 10:
            mes = "Noviembre";
            break;
        case 11:
            mes = "Diciembre";
    }
    return mes;
};/**
 * Created by usuario on 27/10/2017.
 */

function RemoveAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëğÇçĞÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿı';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

function TryParseInt(str,defaultValue) {
    var retValue = defaultValue;
    if(str != null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

function Workbook() {
    if(!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function JSON_a_Excel(data,defCols,title) {
    if (data.length==0) return;
    var ws = {};
    var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
    var initRow=0;
    if (title!=null){
        for(var I = 0; I != title.length; ++I) {
            var cell_r = XLSX.utils.encode_cell({c: 0, r: initRow});
            ws[cell_r] = {v: title[I], t: 's'};
            ++initRow;
        }
    }
    var C=-1;
    angular.forEach(defCols, function (col,index){
        if(data[0].hasOwnProperty(col.field)) {
            ++C;
            var cell = {v: col.name };
            var cell_ref = XLSX.utils.encode_cell({c: C, r: initRow});
            cell.t = 's';
            ws[cell_ref] = cell;
        }
    });
    var R = initRow+1;
    for(var ind = 0; ind != data.length; ++ind) {
        C=-1;
        angular.forEach(defCols, function (col,index) {
            if(data[ind].hasOwnProperty(col.field)){
                ++C;
                if(range.s.r > R) range.s.r = R;
                if(range.s.c > C) range.s.c = C;
                if(range.e.r < R) range.e.r = R;
                if(range.e.c < C) range.e.c = C;

                var cell = {v: data[ind][col.field] };
                if(cell.v != null) {
                    var cell_ref = XLSX.utils.encode_cell({c: C, r: R});
                    if (col.type == 'd') {
                        cell.t='d';
                        cell.v=data[ind][col.field];
                    } else {
                        cell.t = col.type;
                    }
                    ws[cell_ref] = cell;
                }
            }
        });
        ++R;
    }
    range.s.r=0;
    if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function exportExcel(data,columnas,titulo,wsName,filename) {
    var ws_name = wsName;
    var ws = JSON_a_Excel(data, columnas,titulo);
    var wb = new Workbook();
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});

    var blob =new Blob([s2ab(wbout)], {type: "application/octet-stream"});
    download(blob, filename,"application/octet-stream");

}