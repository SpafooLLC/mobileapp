<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-country">
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
            <select>
                <xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="cssclass">
                        <xsl:text>form-control </xsl:text>
                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
                        <xsl:value-of select="$addclass"/>
                    </xsl:with-param>
                    <xsl:with-param name="hasId">yes</xsl:with-param>
                    <xsl:with-param name="hasName">yes</xsl:with-param>
                    <xsl:with-param name="touchEvent">click</xsl:with-param>
                </xsl:call-template>

                <xsl:if test="IsEnabled != 'True'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>

                <xsl:attribute name="data-ng-model">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.selected</xsl:text>
                </xsl:attribute>

                <xsl:attribute name="data-ng-change">
                    <xsl:text>loadRegions('</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>');form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.value = form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.selected.value</xsl:text>;

                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.ddValue = form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.selected.value</xsl:text>;

                    <xsl:if test="BindOnChange != ''">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.onChange(form);</xsl:text>
                    </xsl:if>
                </xsl:attribute>

                <xsl:attribute name="data-ng-init">
                    loadRegions('<xsl:value-of select="Name"/>');
                </xsl:attribute>

                <xsl:if test="BindValue != ''">
                    <xsl:attribute name="data-af-bindvalue">
                        <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')"/>
                    </xsl:attribute>
                    <xsl:attribute name="data-af-bindfrom">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.options</xsl:text>
                    </xsl:attribute>
                </xsl:if>

                <xsl:attribute name="data-ng-options">
                    <xsl:text>o as o.text for o in form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.options</xsl:text>
                    <!--<xsl:text> track by o.text</xsl:text>-->
                    <xsl:if test="LinkTo != ''">
                        <xsl:text>| filter: fnFactoryFilterByField('</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="LinkTo" />
                        <xsl:text>')</xsl:text>
                    </xsl:if>
                </xsl:attribute>

                <xsl:attribute name="data-val">
                    <xsl:text>{{form.fields.</xsl:text>
                    <xsl:value-of select="Name" />
                    <xsl:text>.value}}</xsl:text>
                </xsl:attribute>

                <!--<xsl:if test="Empty != ''">
                    --><!--<xsl:if test="/Form/Settings/LabelAlign != 'inside'" >--><!--
                    <option value="">
                        <xsl:value-of select="Empty" />
                    </option>
                </xsl:if>-->

                <!--<xsl:if test="/Form/Settings/LabelAlign = 'inside'">
                    <option value="">
                        <xsl:attribute name="selected">
                            <xsl:text>selected</xsl:text>
                        </xsl:attribute>
                        <xsl:value-of select="Title"/>
                    </option>
                </xsl:if>
                --><!--</xsl:if>-->

                <option value="">
                    <xsl:choose>
                        <xsl:when test="/Form/Settings/LabelAlign = 'inside'">
                            <xsl:value-of select="Title"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="Empty" />
                        </xsl:otherwise>
                    </xsl:choose>
                </option>
                
            </select>
          
        </div>
    </xsl:template>
   

</xsl:stylesheet>
