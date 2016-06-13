<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-attr-common">
        <xsl:param name="cssclass" />
        <xsl:param name="hasId" />
        <xsl:param name="hasName" />
        <xsl:param name="touchEvent" />

        <!--This tells that the control is doing its own binding-->
        <xsl:param name="bind" />

        <xsl:attribute name="class">
            <xsl:value-of select="utils:tokenize(CssClass)"/>
            <xsl:if test="ValidationGroup != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="ValidationGroup"/>
                <xsl:if test="GroupValidator != ''">
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="ValidationGroup"/>-<xsl:value-of select="GroupValidatorJsName"/>
                </xsl:if>
            </xsl:if>
            <xsl:text> </xsl:text>
            <xsl:if test="CanValidate = 'True'">
                <xsl:value-of select="CustomValidator1JsName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CustomValidator2JsName" />
            </xsl:if>
            <xsl:text> </xsl:text>
            <xsl:value-of select="$cssclass"/>
            
        </xsl:attribute>
        <xsl:if test="CssStyles != ''">
            <xsl:attribute name="style">
                <xsl:value-of select="utils:tokenize(CssStyles)"/>
            </xsl:attribute>
        </xsl:if>
        
        <xsl:if test="DisableAutocomplete='True'">
            <xsl:attribute name="autocomplete">off</xsl:attribute>
        </xsl:if>
        
        <xsl:if test="$hasId='yes'">
            <xsl:attribute name="id">
                <xsl:value-of select="/Form/Settings/BaseId"/>
                <xsl:value-of select="Name"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="$hasName='yes'">
            <xsl:attribute name="name">
                <xsl:value-of select="/Form/Settings/BaseId"/>
                <xsl:value-of select="Name"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:attribute name="data-fieldid">
            <xsl:value-of select="Id"/>
        </xsl:attribute>
        <xsl:attribute name="data-af-field">
            <xsl:value-of select="Name"/>
        </xsl:attribute>
        <xsl:if test="$bind">
            <xsl:attribute name="data-ng-model">
                <xsl:text>form.fields.</xsl:text>
                <xsl:value-of select="Name"/>
                <xsl:text>.value</xsl:text>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="BindValue != ''">
            <xsl:attribute name="data-af-bindvalue">
                <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="BindOnChange != ''">
            <xsl:attribute name="data-ng-change">
                <xsl:text>form.fields.</xsl:text>
                <xsl:value-of select="Name"/>
                <xsl:text>.onChange(form);</xsl:text>
            </xsl:attribute>
        </xsl:if>

        <!--Touched fields will no lnoger update with the BindValue-->
        <xsl:choose>
            <xsl:when test="$touchEvent = 'keyup'">
                <xsl:attribute name="data-ng-keyup">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.touched = true;</xsl:text>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$touchEvent = 'mousedown'">
                <xsl:attribute name="data-ng-mousedown">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.touched = true;</xsl:text>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$touchEvent = 'click'">
                <xsl:attribute name="data-ng-click">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.touched = true;</xsl:text>
                </xsl:attribute>
            </xsl:when>
        </xsl:choose>

    </xsl:template>

    <xsl:template name="ctl-attr-placeholder">
        <xsl:choose>
            <xsl:when test="/Form/Settings/LabelAlign = 'inside'">
                <xsl:attribute name="placeholder">
                    <xsl:value-of select="TitleTokenized"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="/Form/Settings/ShowTooltips != 'True'">
                    <xsl:attribute name="placeholder">
                        <xsl:value-of select="ShortDescTokenized"/>
                    </xsl:attribute>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>
