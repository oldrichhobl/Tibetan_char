//*****************************************************************
// Seznam .svg souboru v adresari ulozi do souboru LISTDIR.XML
//        =  varianta universální pro DMD 4.7 23.4.2010 oh.
//*****************************************************************
var path = ".\\";
var Text = "Folder ";
var NameMSXMLDom = 'Msxml2.DOMDocument';
var rootTagName  = "SHOWX";
var namespaceURL = "";
var wsh = WScript.CreateObject ("WScript.Shell");
//
// Create FileSystemObject object to access the file system.
var fso = WScript.CreateObject("Scripting.FileSystemObject");
//
// Get Folders collection.
var oFolder = fso.GetFolder(wsh.ExpandEnvironmentStrings(path));
var oFiles = new Enumerator(oFolder.Files);   // Files collection
//
// Create an empty document as an ActiveX object
    var xml = new ActiveXObject(NameMSXMLDom);
    xml.async = false;
    xml.loadXML('<?xml version="1.0" encoding="Windows-1250" standalone="yes" ?>\n' +
        '<?xml-stylesheet type="text/xsl" href="listdir.xsl" ?>\n' +
        '<SHOWX>\n'+
        '<INFO> <SUBJECT>Empty </SUBJECT><AUTHOR>O.Hobl </AUTHOR><EMAIL>hobl@hoblapech.cz  </EMAIL> <VERSION>2.00  </VERSION> </INFO>\n' + 
        '<ORIGIN>\n<DATE>03.04.2001</DATE><SESTAVAN typses="unknown">1 </SESTAVAN> <SESTAVATX>Seznam souborů</SESTAVATX>\n' +   
        '<ADDRESS/></ORIGIN>\n'+
        '</SHOWX>' );

//
// informaxce do hlavicky seznamu 
var datum = new Date();
xml.selectSingleNode("//ORIGIN/DATE").text = datum;
xml.selectSingleNode("//ORIGIN/ADDRESS").text = oFolder.Path;

Text = Text + oFolder + "\n\n";
Text = Text + "Name\t\tSize\n";
// vytvorime seznam souboru XML
var doc = xml.documentElement;
var files = xml.createElement('FILES');
var typses;
var nazevtlacitka = '';
//
// nacteme si soubor pro konverzi
    var xslDom = new ActiveXObject(NameMSXMLDom);
    xslDom.async = false;
    if (!xslDom.load('copy.xsl')) {
		WScript.Echo("Nelze načíst file: copy.xsl  -  " + xslDom.parseError.reason);
		WScript.Quit();
    }


//
// pres vsechny soubory :
// WScript.Echo("pres vsechny file " );

for (; !oFiles.atEnd(); oFiles.moveNext())   
{
  var oFile = oFiles.item();
  if (oFile.name.toUpperCase().indexOf('.SVG') > 0 )
  {
//  WScript.Echo("Nove file:" + oFile.name);

    var file = xml.createElement('FILE');
    var name = xml.createElement('FNAME'); name.text = oFile.name;
    file.appendChild(name);
    // a ted si nacteme soubor sestavy a vytahneme z nej typ a nazev
    var xmlfakt = new ActiveXObject(NameMSXMLDom);
    xmlfakt.async = false;
    if (!xmlfakt.load(oFile.name)) {
		WScript.Echo("Nelze načíst file:" + oFile.name + xmlfakt.parseError.reason);
		WScript.Quit();
    }
    
    // upravime a ulozime soubor pod jinym nebo stejnym  jmenem  **********************************
    // var outname = oFile.name.substr(4);
    var outname = oFile.name;
    var outputXML =  new ActiveXObject(NameMSXMLDom);
    outputXML.async = false;
//  transformace do vystupniho objektu
    WScript.Echo(outname);
    xmlfakt.transformNodeToObject(xslDom, outputXML);
//  ulozeni do souboru se spravnym kodovanim
    
    outputXML.save(outname);
/*
    if (!outputXML.loadXML(xmlfakt.transformNode(xslDom))) {
		WScript.Echo("Nelze načíst outputXML  " +  outputXML.parseError.reason);
		WScript.Quit();
    }
*/    
    // ***********************************************************************
    //
    typses = null;
//    WScript.Echo(" select single");
    var name = xml.createElement('DATE'); 
    var cisf = xmlfakt.selectSingleNode("//ORIGIN/DATE");
    var da = '1.1.1999';
    if( cisf != null ) da = cisf.text ;
    // normalizace datumu - prectem a vypisem v sortovatelnem tvaru
    name.text = DateStd(da);       
    file.appendChild(name);

    // var cisf =  "SESTAVAN"; //xmlfakt.selectSingleNode("//ORIGIN/SESTAVAN");
    var cisf = xmlfakt.selectSingleNode("//COMMENT");
    var da = '??';
    if( cisf != null ) da = cisf.text ;
    var name = xml.createElement('SESTAVAN');
    name.text = da;
    file.appendChild(name);

    var name = xml.createElement('SESTAVATX');
    var sestavatx = "sestavatx"; // xmlfakt.selectSingleNode("//ORIGIN/SESTAVATX");
    name.text = sestavatx;
    file.appendChild(name);

    var name = xml.createElement('DEFFILE'); // soubor definice formulare
    var cisf = "deffile"; // xmlfakt.selectSingleNode("//ORIGIN/DEFFILE");
    name.text = cisf;
    file.appendChild(name);

   
 //       	WScript.Echo('sestavatx.text=' + nazevtlacitka.length);
        
    files.appendChild(file);
        
  }	
}
doc.appendChild(files);
xml.save('listdir.xml');
WScript.Quit();

//***
function DateStd(da)
// standardní datum sortovatelné
{
    re = /\./g;
    rr = /\d+\./g;

    // je-li v datumu tečka je to dd.mm.rrrr
    ar = da.match(rr);
    if (ar != null){ // mame v poli dd. a mm. tak to vobratim
	    // WScript.Echo("pole "+ar[0] + ">>" + ar[1]);
     da = ar[1] + ar[0] + da.substr(ar.lastIndex);	    
     da = da.replace(re,'-');  // zamenim jeste tecky za pomlcky aby tomu rozumel parse
    }
    //  WScript.Echo(da);
   var d = new Date(Date.parse(da));
   var  s = d.getYear()+"/";
   if (d.getMonth()<9) s +='0';
   s += (d.getMonth() + 1) + "/";
   if (d.getDate()<10) s +='0';
   s += d.getDate();
   return(s);
}
//*** End
