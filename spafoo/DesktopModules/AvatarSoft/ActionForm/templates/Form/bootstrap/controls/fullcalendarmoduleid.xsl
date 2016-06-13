<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template match="/Form/Fields/Field[InputType = 'fullcalendarmoduleid']">
        <xsl:call-template name="ctl-fullcalendarmoduleid" />
    </xsl:template>
    
    <xsl:template name="ctl-fullcalendarmoduleid">
        <div>
            <xsl:call-template name="ctl-attr-container" />

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>

          <input type="hidden">
            <xsl:attribute name="name">
              <xsl:value-of select="/Form/Settings/BaseId"/>
              <xsl:value-of select="Name" />
            </xsl:attribute>

            <xsl:attribute name="data-fieldid">
              <xsl:value-of select="Id"/>
            </xsl:attribute>
            <xsl:attribute name="data-af-field">
              <xsl:value-of select="Name"/>
            </xsl:attribute>


            <xsl:attribute name="value">
              <xsl:value-of select="Value" />
            </xsl:attribute>

            <xsl:attribute name="data-ng-model">
              <xsl:text>form.fields.</xsl:text>
              <xsl:value-of select="Name"/>
              <xsl:text>.value</xsl:text>
            </xsl:attribute>

            <xsl:if test="BindValue != ''">
              <xsl:attribute name="data-af-bindvalue">
                <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')" />
              </xsl:attribute>
            </xsl:if>

            <xsl:attribute name="data-val">
              <xsl:text>{{ form.fields.</xsl:text>
              <xsl:value-of select="Name"/>
              <xsl:text>.value }}</xsl:text>
            </xsl:attribute>

          </input>

        </div>
    </xsl:template>

</xsl:stylesheet>
