<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:import href="label.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-googlechart">
    
        <div>
            <xsl:attribute name="class">
                <!--<xsl:text>control-label </xsl:text>-->

                <xsl:if test="CssClass != ''">
                    <xsl:value-of select="utils:tokenize(CssClass)"/>
                </xsl:if>
                
                <xsl:text> col-sm-</xsl:text>
                <xsl:value-of select="ColSpan"/>

                <xsl:if test="ColOffset > 0">
                    <xsl:text> col-sm-offset-</xsl:text>
                    <xsl:value-of select="ColOffset"/>
                </xsl:if>

                <xsl:text> </xsl:text>
                <xsl:choose>
                    <xsl:when test="Align = 'left'">btnc-left</xsl:when>
                    <xsl:when test="Align = 'center'">btnc-center</xsl:when>
                    <xsl:when test="Align = 'right'">btnc-right</xsl:when>
                </xsl:choose>

            </xsl:attribute>

       
            <!--<xsl:if test="BindValue != ''">-->
            
            <!--</xsl:if>-->

            <xsl:if test="BindShow != ''">
                <xsl:attribute name="data-ng-show">
                    <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="CssStyles != ''">
                <xsl:attribute name="style">
                    <xsl:value-of select="utils:tokenize(CssStyles)"/>
                </xsl:attribute>
            </xsl:if>

            <!--<xsl:value-of select="TitleTokenized" />-->

            <xsl:value-of select="HtmlCodeSanitized" disable-output-escaping="yes"/>
            
        </div>
    </xsl:template>

</xsl:stylesheet>
