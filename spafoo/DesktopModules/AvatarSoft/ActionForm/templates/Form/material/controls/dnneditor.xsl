<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-dnn-editor">

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

            <div style="text-align: center; height: 0; overflow: visible; ">
                <img alt="" width="32" height="32" style="margin-top: 170px;">
                    <xsl:attribute name="src">
                        <xsl:value-of select="/Form/Settings/ResourceBaseUrl"/>
                        <xsl:text>/images/loader-windows.gif</xsl:text>
                    </xsl:attribute>
                </img>
            </div>
            
            <iframe style="min-height: 250px; background-color: transparent; border:0; box-shadow: none; padding:0;" frameBorder="0" scrolling="no">

                <xsl:attribute name="src">
                    <xsl:value-of select="/Form/Settings/DnnEditorUrl"></xsl:value-of>
                </xsl:attribute>

                <xsl:attribute name="data-content">
                    <xsl:value-of select="Value"/>
                </xsl:attribute>
                
                <xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="cssclass">
                        <xsl:text>form-control </xsl:text>
                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required </xsl:if>
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
            </iframe>
        </div>
    </xsl:template>

</xsl:stylesheet>
