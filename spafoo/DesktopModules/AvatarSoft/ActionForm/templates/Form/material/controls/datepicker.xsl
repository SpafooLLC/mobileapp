<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-datepicker">

        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div>
            <xsl:call-template name="ctl-attr-container" />

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>
            <input type="text" data-dom-watch="change">
                <xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="cssclass">
                        <xsl:text>form-control datepicker </xsl:text>
                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
                    </xsl:with-param>
                    <xsl:with-param name="hasId">yes</xsl:with-param>
                    <xsl:with-param name="hasName">yes</xsl:with-param>
                    <xsl:with-param name="bind">yes</xsl:with-param>
                    <xsl:with-param name="touchEvent">keyup</xsl:with-param>
                </xsl:call-template>

                <xsl:call-template name="ctl-attr-placeholder" />

                <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                    <xsl:attribute name="title">
                        <xsl:value-of select="ShortDesc"/>
                    </xsl:attribute>
                </xsl:if>

                <xsl:attribute name="data-dateformat">
                    <xsl:choose>
                        <xsl:when test="DateFormat!=''">
                            <xsl:value-of select = "DateFormat"></xsl:value-of>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="/Form/Settings/DateFormat"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
                <xsl:attribute name="data-theme">
                    <xsl:value-of select="/Form/Settings/jQueryTheme"/>
                </xsl:attribute>
                <!--<xsl:attribute name="value">
                    <xsl:value-of select="Value"/>
                </xsl:attribute>-->
                <xsl:if test="Flag[text()='yearpick']">
                    <xsl:attribute name="data-changeyear">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="Flag[text()='monthpick']">
                    <xsl:attribute name="data-changemonth">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="YearRange != ''">
                    <xsl:attribute name="data-yearrange">
                        <xsl:value-of select = "YearRange"></xsl:value-of>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="JsonOptions != ''">
                    <xsl:attribute name="data-opts">
                        <xsl:value-of select = "JsonOptions"></xsl:value-of>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="IsEnabled != 'True'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
            </input>
            
        </div>
    </xsl:template>

</xsl:stylesheet>
