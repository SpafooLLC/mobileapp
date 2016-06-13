<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:import href="label.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-image">
        <xsl:param name="addClass"></xsl:param>

        <div>
            <xsl:attribute name="class">
                <xsl:value-of select="$addClass"/>
                <xsl:if test="LabelCssClass != ''">
                    form-group-<xsl:value-of select="utils:tokenize(LabelCssClass)"/>
                </xsl:if> 

                <xsl:text> col-sm-</xsl:text>
                <xsl:value-of select="ColSpan"/>

                <xsl:if test="ColOffset > 0">
                    <xsl:text> col-sm-offset-</xsl:text>
                    <xsl:value-of select="ColOffset"/>
                </xsl:if>

            </xsl:attribute>

            <xsl:if test="BindShow != ''">
                <xsl:attribute name="data-ng-show">
                    <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                </xsl:attribute>
            </xsl:if>

            <!--<xsl:if test="ShowLabel = 'True'">
                <xsl:call-template name="ctl-label">
                    <xsl:with-param name="for"><xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name"/></xsl:with-param>
                </xsl:call-template>
            </xsl:if>-->

            <img>
                <xsl:attribute name="src">
                    <xsl:choose>
                        <xsl:when test="ImageURL != ''">
                            <xsl:value-of select="ImageURL" disable-output-escaping="yes"/>
                        </xsl:when>
                        <xsl:when test="Image != ''">
                            <xsl:value-of select="Image" disable-output-escaping="yes"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="/Form/Settings/PortalHomeUrl "/>
                            <xsl:text>/</xsl:text>
                            <xsl:value-of select="PortalImage" disable-output-escaping="yes"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>

                <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                    <xsl:attribute name="title">
                        <xsl:value-of select="ShortDesc"/>
                    </xsl:attribute>
                </xsl:if>
                
                <xsl:if test="CssStyles != ''">
                    <xsl:attribute name="style">
                        <xsl:value-of select="utils:tokenize(CssStyles)"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="class">
                    <xsl:if test="CssClass != ''">
                        <xsl:value-of select="utils:tokenize(CssClass)"/>
                    </xsl:if>
                </xsl:attribute>
            </img>
            <!--<p>
                    <xsl:call-template name="ctl-attr-common">
                        <xsl:with-param name="cssclass">static</xsl:with-param>
                    </xsl:call-template>
                    <xsl:value-of select="Value" disable-output-escaping="yes"/>
                </p>-->
        </div>

    </xsl:template>

</xsl:stylesheet>
