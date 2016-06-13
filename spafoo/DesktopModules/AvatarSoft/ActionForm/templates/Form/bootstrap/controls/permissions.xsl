<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-permissions">
        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div>
            <xsl:call-template name="ctl-attr-container" />

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
                <br/>
            </xsl:if>

            <div>
                <xsl:attribute name="class">
                    <xsl:value-of select="utils:tokenize(CssClass)"/>
                </xsl:attribute>

                <xsl:if test="CssStyles != ''">
                    <xsl:attribute name="style">
                        <xsl:value-of select="utils:tokenize(CssStyles)"/>
                    </xsl:attribute>
                </xsl:if>

                <table class="table table-hover text-center table-borderless table-inline ">
                    <thead>
                        <tr>
                            <th></th>

                            <th class=" text-center">
                                <xsl:attribute name="data-ng-repeat">
                                    <xsl:text>filterName in form.fields.</xsl:text>
                                    <xsl:value-of select="Name"/>
                                    <xsl:text>.optionsFilters</xsl:text>
                                </xsl:attribute>
                                <xsl:attribute name="data-ng-bind">filterName</xsl:attribute>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <xsl:attribute name="data-ng-repeat">
                                <xsl:text>opts in form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>.optionsByName</xsl:text>
                            </xsl:attribute>
                            <td data-ng-bind="opts[0].text" style="text-align: left;">
                            </td>

                            <td>
                                <xsl:attribute name="data-ng-repeat">
                                    <xsl:text>po in opts</xsl:text>
                                </xsl:attribute>

                                <input type="checkbox" class="normalCheckBox">
                                    <xsl:attribute name="name">
                                        <!--the minus here is important, it triggers some js code-->
                                        <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name" />-$index
                                    </xsl:attribute>
                                    <xsl:attribute name="id">
                                        <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name" />$index
                                    </xsl:attribute>

                                    <xsl:attribute name="data-ng-model">
                                        <xsl:text>po.selected</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="data-ng-truevalue">
                                        <xsl:text>po.value</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="value">
                                        <xsl:text>{{po.value}}</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="data-ng-change">
                                        <xsl:text>concatValues(form.fields.</xsl:text>
                                        <xsl:value-of select="Name"/>
                                        <xsl:text>)</xsl:text>
                                    </xsl:attribute>

                                    <xsl:if test="IsEnabled != 'True'">
                                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                                    </xsl:if>
                                </input>
                                <!--<xsl:attribute name="data-ng-bind">po.text</xsl:attribute>-->
                            </td>


                            <!--<xsl:attribute name="data-ng-bind">filterName</xsl:attribute>-->
                            <!--{{
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.optionsByValue</xsl:text>
                            }}-->
                        </tr>
                    </tbody>
                </table>


                <!--<label>

                    <input type="checkbox" class="normalCheckBox">
                        <xsl:attribute name="name">
                            -->
                <!--the minus here is important, it triggers some js code-->
                <!--
                            <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name" />-$index
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name" />$index
                        </xsl:attribute>

                        <xsl:attribute name="data-ng-model">
                            <xsl:text>o.selected</xsl:text>
                        </xsl:attribute>

                        <xsl:attribute name="data-ng-truevalue">
                            <xsl:text>o.value</xsl:text>
                        </xsl:attribute>

                        <xsl:attribute name="value">
                            <xsl:text>{{o.value}}</xsl:text>
                        </xsl:attribute>

                        <xsl:attribute name="data-ng-change">
                            <xsl:text>concatValues(form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>)</xsl:text>
                        </xsl:attribute>

                        <xsl:if test="IsEnabled != 'True'">
                            <xsl:attribute name="disabled">disabled</xsl:attribute>
                        </xsl:if>
                    </input>
                    {{ o.text }}
                </label>-->
            </div>
        </div>


    </xsl:template>

</xsl:stylesheet>
