<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xsvg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"

    >

<xsl:output method="xml" indent = "yes" encoding="UTF-8" /> 
  
          <xsl:template match = "/" > 
               <xsl:copy > 
                    <xsl:apply-templates /> 
               </xsl:copy> 
          </xsl:template> 
          
          <xsl:template match="comment()[1]" >  
                 <xsl:element name="COMMENT">
                    <xsl:value-of select = "." />
                 </xsl:element> 
          </xsl:template> 
          

          <xsl:template match="xsvg:g[name(child::*[1])='g']" > 
               <!-- <gg  transform="scale(0.3) translate(0 -150) " >   --> 
                 <xsl:element name="{local-name()}">
                    <xsl:attribute name="transform">
                      <xsl:text>scale(0.3)</xsl:text>
                    </xsl:attribute>
                    <xsl:apply-templates select = "*" />
                 </xsl:element> 
          </xsl:template> 

           <xsl:template match = "node()|@*" > 
               <xsl:copy > 
                    <xsl:apply-templates select = "node()|@*" /> 
               </xsl:copy> 
          </xsl:template> 
         

</xsl:stylesheet>
