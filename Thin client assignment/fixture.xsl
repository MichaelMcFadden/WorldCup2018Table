<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">  
<xsl:template Game="/">
<html>
  <body>
  <table >
      <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th></th>
            <th>Away Team </th>
            <th>Predicted Score</th>
      </tr>
                <xsl:for-each select="Fixtures/Game">
                <xsl:sort select="title"/>
      <tr>
            <td><xsl:value-of select="Date"/></td>
            <td><xsl:value-of select="HomeTeam"/></td>
            <th> v </th>
            <td><xsl:value-of select="AwayTeam"/></td>
            <td><xsl:value-of select="Venue"/></td>
     </tr>
                 </xsl:for-each>
  </table>
 
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>