<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:import href="label.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-static">
    
        <div>
            <xsl:call-template name="ctl-attr-container" >
                <xsl:with-param name="withLabelColumn">false</xsl:with-param>
                <xsl:with-param name="addClasses">
                    <xsl:choose>
                        <xsl:when test="Align = 'left'">btnc-left</xsl:when>
                        <xsl:when test="Align = 'center'">btnc-center</xsl:when>
                        <xsl:when test="Align = 'right'">btnc-right</xsl:when>
                    </xsl:choose>
                </xsl:with-param>
            </xsl:call-template>
            
            <xsl:if test="CssStyles != ''">
                <xsl:attribute name="style">
                    <xsl:value-of select="utils:tokenize(CssStyles)"/>
                </xsl:attribute>
            </xsl:if>
                
            <input type="text" style="width:0!important;height:0!important;opacity:0!important;position:absolute!important;" tabindex="-1">
                <xsl:attribute name="data-ng-model">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.value</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="name">
                    <xsl:value-of select="/Form/Settings/BaseId"/>
                    <xsl:value-of select="Name"/>
                </xsl:attribute>

                <xsl:attribute name="data-fieldid">
                    <xsl:value-of select="Id"/>
                </xsl:attribute>
                <xsl:attribute name="data-af-field">
                    <xsl:value-of select="Name"/>
                </xsl:attribute>

                <xsl:choose>
                    <xsl:when test="BindValue != ''">
                        <xsl:attribute name="data-af-bindvalue">
                            <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')" />
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:otherwise>

                        <xsl:attribute name="value">
                            <xsl:text>{{$sce.trustAsHtml(form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.value)}}</xsl:text>
                        </xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>
            </input>

            <!--<xsl:value-of select="TitleTokenized" />-->
            <p style="margin: 4px 4px;">
				
                <xsl:attribute name="name">
                    <xsl:value-of select="/Form/Settings/BaseId"/>
                    <xsl:value-of select="Name" />
                </xsl:attribute>

                <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                    <xsl:attribute name="title">
                        <xsl:value-of select="ShortDesc"/>
                    </xsl:attribute>
                </xsl:if>
                               
                <xsl:attribute name="data-ng-model">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.value</xsl:text>
                </xsl:attribute>

                <xsl:choose>
                    <xsl:when test="BindValue != ''">
                        <xsl:attribute name="data-af-bindvalue">
                            <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')" />
                        </xsl:attribute>
                    </xsl:when>
                    <xsl:otherwise>

                        <xsl:attribute name="data-ng-bind-html">
                            <xsl:text>$sce.trustAsHtml(form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.value)</xsl:text>
                        </xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>

                <!--<xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="hasId">yes</xsl:with-param>
                    <xsl:with-param name="hasName">yes</xsl:with-param>
                    <xsl:with-param name="cssclass">static</xsl:with-param>
                    <xsl:with-param name="bind">yes</xsl:with-param>
                </xsl:call-template>
                <xsl:attribute name="data-val">
                    <xsl:text>{{ form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.value }}</xsl:text>
                </xsl:attribute>-->
                <!--<xsl:value-of select="Value" disable-output-escaping="yes"/>-->
            </p>
        </div>
    </xsl:template>

</xsl:stylesheet>
