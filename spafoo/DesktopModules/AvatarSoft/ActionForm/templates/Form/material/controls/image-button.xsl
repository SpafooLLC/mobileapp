<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">
	<xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-image-button">
		<div>
			<xsl:call-template name="ctl-attr-container">
				<xsl:with-param name="addClasses">
					<xsl:choose>
						<xsl:when test="ButtonAlign = 'left'">btnc-left</xsl:when>
						<xsl:when test="ButtonAlign = 'center'">btnc-center</xsl:when>
						<xsl:when test="ButtonAlign = 'right'">btnc-right</xsl:when>
					</xsl:choose>
				</xsl:with-param>
			</xsl:call-template>
        <a href="" type ="image">

            <xsl:attribute name="id">
                <xsl:value-of select="/Form/Settings/BaseId"/>
                <xsl:value-of select="Name"/>
            </xsl:attribute>

            <xsl:attribute name="class">
                submit form-button
                <xsl:text> </xsl:text>
                <xsl:value-of select="utils:tokenize(CssClass)"/>
            </xsl:attribute>
            <!--<xsl:if test="CssStyles != ''">
                <xsl:attribute name="style">
                    <xsl:value-of select="utils:tokenize(CssStyles)"/>
                </xsl:attribute>
            </xsl:if>-->

            <xsl:if test="ShortDesc != ''">
                <xsl:attribute name="title">
                    <xsl:value-of select="ShortDesc"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="BindShow != ''">
                <xsl:attribute name="data-ng-show">
                    <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="BindOnChange != ''">
                <xsl:attribute name="data-ng-click">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.onChange(form);</xsl:text>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="not(CausesValidation) or CausesValidation != 'False'">
                <xsl:attribute name="data-validation">on</xsl:attribute>
            </xsl:if>

          <xsl:if test="IsEnabled = 'True'">
            <xsl:attribute name="data-submiturl">
              <xsl:value-of select="/Form/Settings/AjaxSubmitUrl"/>&amp;event=click&amp;b=<xsl:value-of select="Id"/>
            </xsl:attribute>
          </xsl:if>

            <!--<xsl:attribute name="src">
                <xsl:value-of select="ImageURL"/>
            </xsl:attribute>-->
            <img>
                <xsl:attribute name="src">
                    <xsl:value-of select="ImageURL"/>
                </xsl:attribute>
				<xsl:if test="CssStyles != ''">
					<xsl:attribute name="style">
						<xsl:value-of select="utils:tokenize(CssStyles)"/>
					</xsl:attribute>
				</xsl:if>
            </img>

        </a>

    </div>
    </xsl:template>

</xsl:stylesheet>
