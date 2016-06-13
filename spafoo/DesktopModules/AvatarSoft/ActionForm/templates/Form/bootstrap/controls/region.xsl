<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-region">

        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div>
            <xsl:call-template name="ctl-attr-container">
                <xsl:with-param name="addClasses">region-root</xsl:with-param>
            </xsl:call-template>

            <xsl:if test="CountryField != ''">
                <xsl:attribute name="data-ng-init">
                    <xsl:text>wireRegion('</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>','</xsl:text>
                    <xsl:value-of select="CountryField"/>
                    <xsl:text>')</xsl:text>
                </xsl:attribute>

                <xsl:attribute name="data-country">
                    <xsl:value-of select="/Form/Settings/BaseId"/>
                    <xsl:value-of select="CountryField"/>
                </xsl:attribute>
            </xsl:if>

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>

            
            <input type="hidden">
                <xsl:attribute name="name">
                    <xsl:value-of select="/Form/Settings/BaseId"/>
                    <xsl:value-of select="Name"/>
                </xsl:attribute>

                <xsl:attribute name="value">
                    <xsl:text>{{ countries['</xsl:text>
                    <xsl:value-of select="CountryField"/>
                    <xsl:text>'].regions.length ? form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.ddValue : form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.tbValue }}</xsl:text>
                </xsl:attribute>

            </input>
            
            <div class="region-loading" data-ng-cloak="" style="font-style: italic; padding: 8px; color: #626262; position: absolute;">
                <xsl:attribute name="data-ng-show">
                    <xsl:text>countries['</xsl:text>
                    <xsl:value-of select="CountryField"/>
                    <xsl:text>'].loading</xsl:text>
                </xsl:attribute>
                <xsl:value-of select="utils:localize('message.pleaseWait', 'Please wait...')"></xsl:value-of>
            </div>

            <input type="text" style="">
                <xsl:call-template name="ctl-attr-common">
                    <xsl:with-param name="cssclass">
                        <xsl:text>form-control region-textbox </xsl:text>
                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required </xsl:if>
                    </xsl:with-param>
                </xsl:call-template>

                <xsl:call-template name="ctl-attr-placeholder" />

                <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                    <xsl:attribute name="title">
                        <xsl:value-of select="ShortDesc"/>
                    </xsl:attribute>
                </xsl:if>

                <!--<xsl:attribute name="value">
                    <xsl:value-of select="Value"/>
                </xsl:attribute>-->

                <xsl:attribute name="data-ng-model">
                    form.fields.<xsl:value-of select="Name"/>.tbValue
                </xsl:attribute>
                
                <xsl:attribute name="id">
                    <xsl:value-of select="/Form/Settings/BaseId"/>
                    <xsl:value-of select="Name"/>
                    <xsl:text>tb</xsl:text>
                </xsl:attribute>

                <xsl:attribute name="data-ng-hide">
                    <xsl:text>countries['</xsl:text>
                    <xsl:value-of select="CountryField"/>
                    <xsl:text>'].regions.length || </xsl:text>
                    <xsl:text>countries['</xsl:text>
                    <xsl:value-of select="CountryField"/>
                    <xsl:text>'].loading</xsl:text>
                </xsl:attribute>

                <xsl:attribute name="data-ng-change">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.value = form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.tbValue</xsl:text>;
                </xsl:attribute>

                <!--<xsl:attribute name="ng-model">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.tbValue</xsl:text>
                    </xsl:attribute>-->
                <!--<xsl:if test="BindValue != ''">
                        <xsl:attribute name="data-af-bindvalue">
                            <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')"/>
                        </xsl:attribute>
                    </xsl:if>-->
                <xsl:if test="IsEnabled != 'True'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
            </input>

            <xsl:if test="CountryField != ''">

                <select data-ng-cloak="">

                    <xsl:call-template name="ctl-attr-common">
                        <xsl:with-param name="cssclass">
                            <xsl:text>form-control region-dropdown</xsl:text>
                            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
                        </xsl:with-param>
                    </xsl:call-template>

                    <xsl:attribute name="id">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name"/>
                        <xsl:text>dd</xsl:text>
                    </xsl:attribute>
                
                    <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                        <xsl:attribute name="title">
                            <xsl:value-of select="ShortDesc"/>
                        </xsl:attribute>
                    </xsl:if>

                    <xsl:if test="IsEnabled != 'True'">
                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                    </xsl:if>

                    <xsl:attribute name="data-ng-model">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.ddValue</xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="data-ng-change">
                        <xsl:text>loadRegions('</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>');form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.value = form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.ddValue</xsl:text>;

                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.ddValue = form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.value</xsl:text>;

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
                            <xsl:text>countries['</xsl:text>
                            <xsl:value-of select="CountryField"/>
                            <xsl:text>'].regions</xsl:text>
                        </xsl:attribute>
                    </xsl:if>

                    <!--warning, ngOptions does not work without ngModel, so we'll do a repeat -->
                    <xsl:attribute name="data-ng-options">
                        <xsl:text>c.value as c.text for c in countries['</xsl:text>
                        <xsl:value-of select="CountryField"/>
                        <xsl:text>'].regions</xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="data-val">
                        <xsl:text>{{form.fields.</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>.value}}</xsl:text>
                    </xsl:attribute>
                    
                    <xsl:attribute name="data-ng-show">
                        <xsl:text>countries['</xsl:text>
                        <xsl:value-of select="CountryField"/>
                        <xsl:text>'].regions.length &amp;&amp; !</xsl:text>
                        <xsl:text>countries['</xsl:text>
                        <xsl:value-of select="CountryField"/>
                        <xsl:text>'].loading</xsl:text>
                    </xsl:attribute>

                    <xsl:choose>
                        <xsl:when test="ShortDesc = '' and /Form/Settings/LabelAlign = 'inside'">
                                <option value="">
                                <xsl:attribute name="selected">
                                    <xsl:text>selected</xsl:text>
                                </xsl:attribute>
                                <xsl:value-of select="Title" />
                            </option>
                        </xsl:when>
                        <xsl:otherwise>
                            <option value=""></option>
                        </xsl:otherwise>
                    </xsl:choose>
                    <!--<xsl:if test="BindValue != ''">
                        <xsl:attribute name="data-af-bindvalue">
                            <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')"/>
                        </xsl:attribute>
                    </xsl:if>-->
                </select>
                
            </xsl:if>
            
        </div>
    </xsl:template>

</xsl:stylesheet>
