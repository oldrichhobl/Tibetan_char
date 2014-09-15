/*
  API k databazi SQLite, která obsahuje slovíèka a výsledky

  historie:
    2014-06-24 OH: zalozeny prvni dve funkce otevriDB a dejNextSlovo
  
 */
var Gjkdb = null; //this will become the sqlite database handle, global GJK001

var dbName = 'GJK0006DBs1';
var tableName = 'GJK0006TABs1';

function GjkDebugPrintf(iSeverity, txt) {
    var date = new Date();
    var s, iColor = 'grey';
    var options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "numeric"
    };

    iSeverity = typeof iSeverity !== 'undefined' ? iSeverity : 0;

    if (iSeverity < 3) {
        iColor = 'lime';
    } else {
        if (iSeverity < 5) {
            iColor = 'orange';
        } else {
            if (iSeverity < 7) {
                iColor = 'magenta';
            }
            if (iSeverity < 11) {
                iColor = '#F75D59'; // red
            }
        }
    }

    // http://www.computerhope.com/htmcolor.htm
    s = '<font size="1" color="' + iColor + '">' + txt + '</font> ';
    s = s + '<font size="1" color="cyan">' + date.toLocaleDateString("en-GB-oed", options) + '</font>';
    txt = s;

    app.log(txt);
}

function gjk001OpenDB() {
    var txt;

    if (Gjkdb === null) { // if Gjkdb 
        try {
            if (window.openDatabase) {
                Gjkdb = openDatabase(dbName, "1.0", "HTML5 Database API example", 200000);
                if (!Gjkdb)
                    alert("Error Failed to open the database, check version |" + dbName + "|");
                else {
                    txt = "GJK006.1056 after db = openDatabase(" + dbName + ")";
					//GjkDebugPrintf(0, txt);
				}
            } else
                alert("Error Not supported? Not gonna happen  |" + dbName + "|");
        } catch (err) {
            alert(" catch(err), Not gonna happen  |" + dbName + "|, err=" + err + "|");
        }
    }
}

function createTable(tableName) {
    var sql;

    sql = "CREATE TABLE IF NOT EXISTS " + tableName + "(rowId INTEGER PRIMARY KEY AUTOINCREMENT, w1, w2, p1, p2, a1, a2 TEXT NOT NULL, c1 INTEGER DEFAULT 0, c2 INTEGER DEFAULT 0, st1 INTEGER DEFAULT 0, t1, t2 TIMESTAMP)";

    Gjkdb.transaction(function (tx) {
        tx.executeSql(sql, [], function (result) {
                //GjkDebugPrintf(0, 'GJK0008.74001 OLDA USPECH:|' + sql + "|, result" + result)
            },
            function (tx, error) {
                GjkDebugPrintf(0, 'OLDA008.70066 Failed to create table = sql|' + sql + '|, error=' + error.message)
                return;
            }

        )
    });
}

function executeSql(sql) {
    /*	
	db.transaction(function (tx) {
        tx.executeSql(q1, [], function (result) {
            alert('12SQL failed :|' + q1 + "|, result=" + result);
        })
    });
*/
    Gjkdb.transaction(function (tx) {
        tx.executeSql(sql, [], function (result) {
                //GjkDebugPrintf(0, 'GJK0006.84001 OLDA USPECH:|' + sql + "|, result" + result)
            },
            function (tx, error) {
                GjkDebugPrintf(0, 'OLDA006.80066 Failed = sql|' + sql + '|, error=' + error.message)
                return;
            }
        )
    });
}

function selectFromTable8(t1, q1, clause, fvypln) { // vysledek je vracen do funkce fvypln
    var s2, txt;
    var iMax = -1;
//  vysledek volani pro funkci fvypln(result2)
    var result2 = {
        slovo: "sss1",
        word: ["sss2", "sss"],
		iPocet: 0,
		iRow: 0
    };

    // gjk001OpenDB();
    s2 = "SELECT " + q1 + " FROM " + t1 + ' ' + clause;
    txt = "GJK006.10166 before |" + s2 + "|";
    GjkDebugPrintf(9, txt);
    try {
        Gjkdb.transaction(function (tx) {
			// http://stackoverflow.com/questions/6780911/web-sql-transaction-returns-empty
			tx.executeSql(s2, [],
			function(tx, rs) {
				var result = [];
				for(var i=0; i<rs.rows.length; i++) {
					var row = rs.rows.item(i);
					result[i] = {
                    rowId: row['rowId'],
                    w1: row['w1'],
                    w2: row['w2'],
                    st1: row['st1']
					}
				result2.slovo = result[i].w1;
				result2.word = result[i].w2;
				result2.iRow = result[i].rowId;
				result2.iPocet = i;
				}
				console.log(result); // tohle pise OK na consoli 2014.06.25.  22:44
				console.log(result2); // tohle pise OK na consoli 2014.06.25.  22:44
				fvypln(result2); 
			},
			function (tx, error) {
				txt = "GJK006.160107z ERROR  after |" + s2 + "|, iMax=" + iMax + "|, error=" + error.message;
				GjkDebugPrintf(3, txt);
				alert('GJK006.160107 Failed sql=|' + s2 + "|, error=" + error.message);
				//return;
			});  /*      tx.executeSql(s2, [], function (tx, result) { // je to spatne GJK?? Proc?!	
                        txt = "GJK008.98765 before |" + s2 + "|DELKA:" + result.rows.length;
                        GjkDebugPrintf(77, txt);
                        for (var i = 0; i < result.rows.length; ++i) {
                            var row = result.rows.item(i);
                            result2.slovo = row['w1'];
                            result2.word[i] = row['w2'];
                            iMax = i; //if (i > -1) break;    
							result2.iPocet = iMax;
							break;
                        };
                        app.log("DBAPI.vola fvypln " + result2.slovo);
                        //fvypln(result2);  // tady se vraci konecne vysledek
						return(result2);  // tady se vraci konecne vysledek
                    },
                    function (tx, error) {
                        txt = "GJK006.160107z ERROR  after |" + s2 + "|, iMax=" + iMax + "|, error=" + error.message;
                        GjkDebugPrintf(3, txt);
                        alert('GJK006.160107 Failed sql=|' + s2 + "|, error=" + error.message);
                        return;
                    }
                    // tady nic byt nemuze!!!???txt = "GJK008.80001 before |" + s2 + "|"; GjkDebugPrintf(77, txt);
                )
        */

        txt = "GJK008.90002, sql=|" + s2 + "|";
                GjkDebugPrintf(77, txt);
        }
        )
        txt = "GJK008.90003, sql=|" + s2 + "|";
        GjkDebugPrintf(9, txt);
    } catch (err) {
        alert(" catch(err), table=|" + TableName + "|, sql=|" + s2 + "|, err=" + err + "|");
    }

    txt = "GJK006.33333a selectFromTable8() OK? after |" + s2 + "|, iMax=" + iMax + "|" + ", result2.slovo=|" + result2.slovo + '|';
    GjkDebugPrintf(9, txt);
    return;
}
// ------------------  DBAPI  ------------------------------
// ******  ruzne cesty na datovy soubor  *****************
path_android_asset = 'file:///android_asset/www/';
path_dramatik = 'http://www.dramatik.cz/dramsprt/';
path_jarda = 'http://www.jarda.org/dramsprt/';
path_extSdCard = 'file:///mnt/extSdCard/DramSprt/';
path_local = 'files:///local/data/DramSprt/';

var DBAPI = {
    index: 0,
    nazev: "Lekce èíslo jedna",

    // otevre a nacte databazi (resi i pripad, kdy databaze neni !!)
    otevriDB: function () {
        var t1 = '',
            sl1 = '',
            clause = '';

        gjk001OpenDB();
        app.log("DBAPI.otevriDB ");
        createTable(tableName);
        t1 = "INSERT INTO GJK0006TABs1(w1,w2,p1, p2, a1, a2) VALUES('kocka', 'cat', 'kocska', 'ket', 'brr1', 'brrrr2')";
        executeSql(t1);

        sql1 = ' rowId, w1, w2, p1, p2, a1, a2, MIN(c1), MIN(t1), st1 ';
        //sql1 = ' * ';
        txt = "GJK008.00083 after  selectFromTable8(|" + sql1 + "|)";
        GjkDebugPrintf(0, txt);
        return;
    },
    nactiDataReset: function (path)
    // nacte nova data ze serveru "path" a resetuje zobrazeni
    {
        app.log("DBAPI.nactiDataReset ");
    },



    dejNextSlovo: function (fvypln) {
        app.log("DBAPI.dejNextSlovo ");
        //  
        var clause = '',
            sql1;

        /* this.index++;
		result.slovo = result.slovo + this.index;
		result.word[0] = result.word[0] + " index: " + this.index; */

        // GJK 2014.06.25 11:11
        //t1, q1, clause, arrayAllResults, myDiv, result2) {
        sql1 = ' rowId, w1, w2, p1, p2, a1, a2, MIN(c1), MIN(t1), st1 ';
        //sql1 = ' * ';
        txt = "GJK008.00013 after  selectFromTable8(|" + sql1 + "|)";
        GjkDebugPrintf(0, txt);
        selectFromTable8(tableName, sql1, clause, fvypln);
        //************************************************************
        return;
    }

}

/*
var iMaxTotRow = -1;

function selectFromTabl8b(t1, q1, clause) { // return object result2
    var s2, txt, iRowId=(-1), iMaxTotRow = (-2);
    var result2 = {
        slovo:"bbb1",
        word: ["bbb2", "bbb3"]
    };

    gjk001OpenDB();
    s2 = "SELECT " + q1 + " FROM " + t1 + ' ' + clause;
    txt = "GJK006.10166 before |" + s2 + "|";
    //GjkDebugPrintf(9, txt);
    try {
        Gjkdb.transaction(
            function (transaction) {
                transaction.executeSql(s2, [], function (transaction, result) { // je to spatne GJK?? Proc?!	
                        txt = "GJK008.98765 before |" + s2 + "|, result.rows.length=|" + result.rows.length + '|';
                        //GjkDebugPrintf(77, txt);
						//alert('GJK006.160101 sql=|' + txt + "|");
                        for (var i = 0; i < result.rows.length; ++i) {
                            var row = result.rows.item(i);
							iRowId = row['rowId'];
                            result2.slovo = row['w1'];
                            result2.word[i] = row['w2'];
                            iMaxTotRow = i; //if (i > -1) break;   
							if (iMaxTotRow > (result.rows.length) - 1) {
								txt = "GJK008.9991 before w1=|" + result2.slovo + "|, w2=|" + result2.word[i] + '|, i=|' + i + '|, iMaxTotRow=' + iMaxTotRow + '|';
								GjkDebugPrintf(3, txt);	
							};
						if (i > 3 ) {
							break; // GJK fake		
						}							
                        }
                    },
                    function (transaction, error) {
                        txt = "GJK006.160107z ERROR  after |" + s2 + "|, iMaxTotRow=" + iMaxTotRow + "|, error=" + error.message;
                        GjkDebugPrintf(3, txt);
                        alert('GJK006.160107 Failed sql=|' + s2 + "|, error=" + error.message);
                        return;
                    }
                    // tady nic byt nemuze!!!???txt = "GJK008.80001 before |" + s2 + "|"; GjkDebugPrintf(77, txt);
                )
                txt = "GJK008.92222, sql=|" + s2 + "|, iMaxTotRow=" + iMaxTotRow + '|';
                GjkDebugPrintf(1, txt);
            }
        )
        txt = "GJK008.90003, sql=|" + s2 + "|, iMaxTotRow=" + iMaxTotRow + '|';
        GjkDebugPrintf(9, txt);
    } catch (err) {
        alert(" catch(err), table=|" + TableName + "|, sql=|" + s2 + "|, err=" + err + "|");
    }

    if (iMaxTotRow < 0) {
        result2.slovo = 'NotFound1';
        result2.word[0] = 'NotFound2';
		txt = "GJK006.33333b selectFromTable8() OK? after |" + s2 + "|, iMaxTotRow=" + iMaxTotRow + "|" 
		+ ", result2.slovo=|" + result2.slovo + '|, result2.word[0]=' + result2.word[0] + '|';
    }
	else {
		txt = "GJK006.33333a selectFromTable8() OK? after |" + s2 + "|, iMaxTotRow=" + iMaxTotRow + "|" 
		+ ", result2.slovo=|" + result2.slovo + '|, result2.word[iMaxTotRow]=' + result2.word[iMaxTotRow] + '|';
    }
	txt = txt + ', rowId=|' + iRowId + '|';
	GjkDebugPrintf(9, txt);
    return result2;
}
*/



function showFileExternalxxx() {
    alert("File external - " + cordova.file.applicationStorageDirectory);
};