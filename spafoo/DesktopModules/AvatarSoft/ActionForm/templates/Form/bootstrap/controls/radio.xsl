<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-container.xsl"/>
    <xsl:import href="label.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-radio">

        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div>
            <xsl:call-template name="ctl-attr-container" />

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top' or /Form/Settings/LabelAlign = 'inside'">
                <xsl:call-template name="ctl-label" />
                <div class="clearfix"></div>
            </xsl:if>

            <div data-ng-cloak="">
                <xsl:attribute name="class">
                    <!--<xsl:text>control-label </xsl:text>-->
                    <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">
                        <xsl:text> required </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="utils:tokenize(CssClass)"/>
                    <xsl:text> radio </xsl:text>
                    <xsl:if test="Horizontal = 'True'"> radio-inline </xsl:if>
                </xsl:attribute>

                <xsl:attribute name="data-ng-repeat">
                    <xsl:text>o in form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.options</xsl:text>
                    <xsl:if test="LinkTo != ''">
                        <xsl:text>| filter: fnFactoryFilterByField('</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>','</xsl:text>
                        <xsl:value-of select="LinkTo" />
                        <xsl:text>')</xsl:text>
                    </xsl:if>
                </xsl:attribute>

                <!--<xsl:attribute name="style">
                        <xsl:if test="/Form/Settings/LabelAlign = 'top' or /Form/Settings/LabelAlign = 'inside'">
                            <xsl:text>margin-left: 20px;</xsl:text>
                        </xsl:if>x
                    </xsl:attribute>-->

                <label>
                    <xsl:if test="CssStyles != ''">
                        <xsl:attribute name="style">
                            <xsl:value-of select="utils:tokenize(CssStyles)"/>
                        </xsl:attribute>
                    </xsl:if>

                    <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                        <xsl:attribute name="title">
                            <xsl:value-of select="ShortDesc"/>
                        </xsl:attribute>
                    </xsl:if>

                    <input type="radio">
                        <xsl:attribute name="name">
                            <xsl:value-of select="/Form/Settings/BaseId"/>
                            <xsl:value-of select="Name" />
                        </xsl:attribute>
                        <xsl:attribute name="value">
                            <xsl:value-of select="@value"/>
                        </xsl:attribute>
                        <xsl:attribute name="class">
                            <xsl:text>normalCheckBox </xsl:text>
                            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">
                                <xsl:text> required </xsl:text>
                            </xsl:if>
                        </xsl:attribute>

                        <xsl:attribute name="data-ng-model">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.value</xsl:text>
                        </xsl:attribute>

                        <xsl:attribute name="data-ng-truevalue">
                            <xsl:text>o.value</xsl:text>
                        </xsl:attribute>

                        <xsl:attribute name="value">
                            <xsl:text>{{o.value}}</xsl:text>
                        </xsl:attribute>


                        <!--<xsl:if test="Value = @value">
                                <xsl:attribute name="checked">checked</xsl:attribute>
                            </xsl:if>-->
                        <xsl:if test="IsEnabled != 'True'">
                            <xsl:attribute name="disabled">disabled</xsl:attribute>
                        </xsl:if>

                        <xsl:attribute name="data-ng-click">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.touched = true;</xsl:text>
                        </xsl:attribute>

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
                    </input>
                    <span data-ng-bind-html="$sce.trustAsHtml(o.text)"></span>
                </label>
            </div>

            <div class="err-placeholder"></div>
        </div>

    </xsl:template>

</xsl:stylesheet>
