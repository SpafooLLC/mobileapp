<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-textbox">
        <xsl:param name="type" />
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

            <!--render the control-->
            <input type="$type">
                <xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="cssclass">
                        form-control <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if> <xsl:value-of select="$addclass"/>
                    </xsl:with-param>
                    <xsl:with-param name="hasId">yes</xsl:with-param>
                    <xsl:with-param name="hasName">yes</xsl:with-param>
                    <xsl:with-param name="bind">yes</xsl:with-param>
                    <xsl:with-param name="touchEvent">keyup</xsl:with-param>
                </xsl:call-template>
                <xsl:if test="Mask != ''">
                    <xsl:attribute name="data-input-mask">
                        <xsl:value-of select="Mask"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="/Form/Settings/ClientSideValidation ='True' and ConfirmationOf != ''">
                    <xsl:attribute name="data-password-confirm">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="ConfirmationOf"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="type">
                    <xsl:value-of select="$type"/>
                </xsl:attribute>

                <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                    <xsl:attribute name="title">
                        <xsl:value-of select="ShortDesc"/>
                    </xsl:attribute>
                </xsl:if>
                
                <xsl:call-template name="ctl-attr-placeholder" />

                <!--<xsl:attribute name="value">
                    <xsl:value-of select="Value"/>
                </xsl:attribute>-->
                <xsl:if test="IsEnabled != 'True'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:if test="Readonly = 'True'">
                    <xsl:attribute name="readonly">readonly</xsl:attribute>
                </xsl:if>

                <xsl:if test="AutocompleteUrl != ''">
                    <xsl:attribute name="data-autocomplete">
                        <xsl:value-of select="AutocompleteUrl"/>
                    </xsl:attribute>
                </xsl:if>

                <!--<xsl:if test="BindEnable != ''">
                    <xsl:attribute name="data-ng-disabled">
                        <xsl:text>!(</xsl:text>
                        <xsl:value-of select="BindEnable"/>
                        <xsl:text>)</xsl:text>
                    </xsl:attribute>
                </xsl:if>-->
                
            </input>

        </div>
    </xsl:template>

</xsl:stylesheet>
