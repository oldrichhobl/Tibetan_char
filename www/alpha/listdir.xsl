<?xml version="1.0" encoding="Windows-1250"  ?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/TR/REC-html40">
<xsl:output method="html" encoding="windows-1250" /> 

 <xsl:template match="/">
   <html> <head><title>SHOWINDX</title>
<style type="text/css">
<xsl:comment><![CDATA[
BODY {
    FONT-SIZE: 1em; FONT-FAMILY: Arial CE,Helvetica CE,Arial,Helvetica, sans-serif;
    BackGround-color:e2ffe6;
}

H1 {
	font-size: 20pt;
	margin : 0,0,0,0;
	padding: 0 20 0 20;
	text-align: center;
}
H3 {
	font-size: 10pt;
	margin : 0,0,0,0;
	padding: 0 20 0 20;
	text-align: center;
}
table {
	width: 90%;
	BackGround-color:e2ffe6;

	}
	 
thead td, thead th {
	text-align: center;
	font-size: 14px; 
	background-color: oldlace;
	color: black;
	font-weight: bold;
	border: solid 1px black;
	}	
	
td	{
	color: #000;
	padding-right: 2px;
	font-size: 12px;

	border-bottom: solid 1px #d8d8d8;
	border-left: solid 1px #d8d8d8;
	}

.bg1 {
	font:8pt Verdana;
	background-color: #EFEFEF;
	color:black
}
.bg0 {
	font:8pt Verdana;
	background-color: #FFFFCE;
	color:black
}

    ]]>
   </xsl:comment>
</style>

   </head>
   <body>
          <xsl:apply-templates/>
   </body></html>
 </xsl:template>

 <xsl:template match="SHOWX">
 <H1> Seznam souborů</H1> 
  <H3>
  V tabulce je seznam souborů XML v adresáři: <xsl:value-of select="//ORIGIN/ADDRESS"/>
  </H3>
 <!-- vlastni tabulka -->
 <TABLE>
 <THEAD>
 <TR>
 
 <TD>c. </TD> 
 <TD>Jméno souboru </TD> 
 <TD>Datum</TD>
 <TD>Typ</TD>
 <TD>Název </TD>
 <TD>Podrobný popis</TD>

 </TR>
 </THEAD>
 <TBODY>
   <xsl:for-each select="//FILES/FILE" >
      <TR>
      <TD align="right">
        <xsl:value-of select="position()"/>.
      </TD>  
      
      <TD align="left">
      <A>
      <!-- attributes are applied to the current parent element (i.e. 'A') -->
       <xsl:attribute name="href">
		   <xsl:value-of select="FNAME"/>
       </xsl:attribute>
       <xsl:value-of select="FNAME"/> 
      </A>
		 
      </TD>
      <TD>
         <xsl:value-of select="DATE"/> 
      </TD>
      <TD>
         <img width="200px" heigth="80px"> 
            <xsl:attribute name="src">
		   <xsl:value-of select="FNAME"/>
            </xsl:attribute>
         </img>   
      </TD>

      <TD>
         <xsl:value-of select="SESTAVAN"/> 
      </TD>
      <TD>
           <xsl:attribute name="title">
		     <xsl:value-of select="POPIS2"/>
           </xsl:attribute> 
         <xsl:value-of select="POPIS"/> 
         &#160;
      </TD>
    </TR>
   </xsl:for-each>
   </TBODY>
 </TABLE>
              <!-- xsl:value-of select="@typses"/ --> 
</xsl:template>				  

<!-- tabulka INFO -->
<!-- tabulka ORIGIN -->

</xsl:stylesheet>
