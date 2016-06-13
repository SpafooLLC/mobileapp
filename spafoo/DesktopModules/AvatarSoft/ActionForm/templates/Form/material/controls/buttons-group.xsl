<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                xmlns:utils="af:utils">

    <xsl:import href="attr-container.xsl"/>
    <xsl:import href="button.xsl"/>
    <xsl:import href="image-button.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <!--This template renders button bar for actions-->
    <!--<xsl:template match="/Form/Settings/RenderAction">
        
    </xsl:template>-->

    <!--This template is used to render a button bar, called from template above and /main.xsl-->
    <xsl:template name="ctl-buttons-group">

        <div>
            <xsl:attribute name="class">
                <xsl:text>field-container col-sm-</xsl:text>
                <xsl:value-of select="ColSpan" />
                <xsl:text> </xsl:text>
                <xsl:if test="ColOffset > 0">
                    <xsl:text> col-sm-offset-</xsl:text>
                    <xsl:value-of select="ColOffset" />
                </xsl:if>
                <xsl:text> </xsl:text>
                <xsl:choose>
                    <xsl:when test="ButtonAlign = 'left'">btnc-left</xsl:when>
                    <xsl:when test="ButtonAlign = 'center'">btnc-center</xsl:when>
                    <xsl:when test="ButtonAlign = 'right'">btnc-right</xsl:when>
                </xsl:choose>
            </xsl:attribute>

          <xsl:if test="IsEnabled = 'True'">
            <xsl:for-each select="ButtonsList/Item">
                <xsl:for-each select="/Form/Fields/Field[Name=current()/text()]">
                    <xsl:choose>
                        <xsl:when test ="InputType = 'image-button'">
                            <xsl:call-template name="ctl-image-button" />
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:call-template name="ctl-button" />
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>
                <xsl:text> </xsl:text>
            </xsl:for-each>
          </xsl:if>

        </div>
        <div class="clearfix"></div>

    </xsl:template>

</xsl:stylesheet>
