<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-itemwithqty">

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
            <select class="input-xs">
                <xsl:attribute name="id">
                    <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name"/>Qty
                </xsl:attribute>
                <xsl:call-template name="ctl-itemwithqty-option">
                    <xsl:with-param name="count">20</xsl:with-param>
                    <xsl:with-param name="i">1</xsl:with-param>
                    <xsl:with-param name="val">
                        <xsl:value-of select="substring-before(Value,' ')"/>
                    </xsl:with-param>
                </xsl:call-template>
                <xsl:if test="IsEnabled != 'True'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
            </select>

            <input type="text">
                <xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="cssclass">
                        <xsl:text>form-control </xsl:text>
                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
                    </xsl:with-param>
                    <xsl:with-param name="hasId">yes</xsl:with-param>
                    <xsl:with-param name="hasName">yes</xsl:with-param>
                </xsl:call-template>

                <xsl:call-template name="ctl-attr-placeholder" />

                <xsl:attribute name="value">
                    <xsl:value-of select="substring-after(Value,' ')"/>
                </xsl:attribute>
                <xsl:if test="IsEnabled != 'True'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
            </input>
        </div>
    </xsl:template>

    <xsl:template name="ctl-itemwithqty-option">
        <xsl:param name="i">1</xsl:param>
        <xsl:param name="count"></xsl:param>
        <xsl:param name="val"></xsl:param>
        <option>
            <xsl:if test="$i = $val">
                <xsl:attribute name="selected">selected</xsl:attribute>
            </xsl:if>
            <xsl:value-of select="$i" />
        </option>

        <xsl:if test="$i &lt; $count">
            <xsl:call-template name="ctl-itemwithqty-option">
                <xsl:with-param name="count">
                    <xsl:value-of select="$count" />
                </xsl:with-param>
                <xsl:with-param name="i">
                    <xsl:value-of select="$i + 1" />
                </xsl:with-param>
                <xsl:with-param name="val">
                    <xsl:value-of select="$val" />
                </xsl:with-param>
            </xsl:call-template>
        </xsl:if>

    </xsl:template>

</xsl:stylesheet>
