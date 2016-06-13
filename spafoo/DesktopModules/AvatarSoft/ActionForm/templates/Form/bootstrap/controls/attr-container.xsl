<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-attr-container">

        <!--the control always goes full space, for exmaple inline form button-->
        <xsl:param name="fullSpan" />
        <xsl:param name="addClasses" />
        <xsl:param name="withLabelColumn" />

        <xsl:attribute name="class">
            <xsl:text>field-container </xsl:text>
            <xsl:text>af-slide </xsl:text>
            <xsl:if test="CssClass != ''">
                <xsl:text> form-group-</xsl:text>
                <xsl:value-of select="CssClass"/>
            </xsl:if>

            <!--Apply offsets only if the label didn't already apply it-->
            <!--if the offset was not applied by the label, apply it her-->

            <xsl:if test="(ColOffset > 0 and (/Form/Settings/LabelAlign = 'top' or /Form/Settings/LabelAlign = 'inside')) or $withLabelColumn = 'false'">
                <xsl:text> col-sm-offset-</xsl:text>
                <xsl:value-of select="ColOffset"/>
            </xsl:if>

            <xsl:text> col-sm-</xsl:text>
            <xsl:choose>
                <xsl:when test="$fullSpan">
                    <xsl:value-of select="ColSpan"/>
                </xsl:when>
                <xsl:when test="/Form/Settings/LabelWidth > 0 and /Form/Settings/LabelAlign != 'top' and /Form/Settings/LabelAlign != 'inside' and $withLabelColumn != 'false'">
                    <xsl:value-of select="ColSpan - /Form/Settings/LabelWidth"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="ColSpan"/>
                </xsl:otherwise>
            </xsl:choose>

            <xsl:text> </xsl:text>
            <xsl:value-of select="$addClasses"/>
            
        </xsl:attribute>

        <xsl:if test="BindShow != ''">
            <xsl:choose>
                <xsl:when test="BindPreserveLayout = 'True'">
                    <xsl:attribute name="data-ng-style">
                        <xsl:text>{ visibility: </xsl:text>
                        <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                        <xsl:text> ? 'visible' : 'hidden' } </xsl:text>
                    </xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="data-ng-show">
                        <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                    </xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>

    </xsl:template>

</xsl:stylesheet>
