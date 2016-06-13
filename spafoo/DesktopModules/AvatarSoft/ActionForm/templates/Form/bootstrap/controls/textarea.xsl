<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-textarea">
        <xsl:param name="addclass" />

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
            <textarea rows="10">
                <xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="cssclass">
                        <xsl:text>form-control </xsl:text>
                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required </xsl:if>
                        <xsl:value-of select="$addclass"/>
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
                       
                <xsl:if test="IsEnabled != 'True'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:if test="$addclass = 'richedit'">
                    <xsl:attribute name="data-af-richedit"></xsl:attribute>
                </xsl:if>
                <xsl:value-of select="Value"/>
            </textarea>
        </div>
    </xsl:template>

</xsl:stylesheet>
