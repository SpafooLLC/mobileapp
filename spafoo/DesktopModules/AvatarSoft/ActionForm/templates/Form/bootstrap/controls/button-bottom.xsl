<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-button-bottom">
        <xsl:param name="context" />

        <button type ="button">
            <xsl:attribute name="data-loading-text">
                <xsl:value-of select="utils:localize('button.pleaseWait', 'Please Wait...')"></xsl:value-of>
            </xsl:attribute>
            <xsl:attribute name="class">
                af-slide btn btn-pane submit form-button af-btn-loading
                <xsl:text> </xsl:text>
                <xsl:value-of select="ButtonSize"></xsl:value-of>
                <xsl:text> </xsl:text>
                <xsl:choose>
                  <xsl:when test="ButtonType!=''">
                    <xsl:value-of select="ButtonType"></xsl:value-of>
                  </xsl:when>
                  <xsl:otherwise>btn-default</xsl:otherwise>
                </xsl:choose>

                <!--apply alignment only when not in custom layout-->
                <xsl:if test="/Form/Settings/RenderContext = 'Form'">
                    <xsl:text> </xsl:text>
                    <xsl:choose>
                        <xsl:when test="ButtonAlign = 'left'"></xsl:when>
                        <xsl:when test="ButtonAlign = 'controls'"></xsl:when>
                        <xsl:when test="ButtonAlign = 'center'">btn-center</xsl:when>
                        <xsl:when test="ButtonAlign = 'right'">pull-right</xsl:when>
                        <xsl:otherwise>btn-block</xsl:otherwise>
                    </xsl:choose>
                </xsl:if>

                <xsl:if test="CssClass != ''">
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="utils:tokenize(CssClass)"/>
                    <xsl:text> form-group-</xsl:text>
                    <xsl:value-of select="utils:tokenize(CssClass)"/>
                </xsl:if>
            </xsl:attribute>

            <xsl:attribute name="style">
                <xsl:text>margin: 2px;</xsl:text>
                <xsl:if test="CssStyles != ''">
                    <xsl:value-of select="utils:tokenize(CssStyles)"/>
                </xsl:if>
            </xsl:attribute>

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
            <xsl:attribute name="data-submiturl">
                <xsl:value-of select="/Form/Settings/AjaxSubmitUrl"/>&amp;event=click&amp;b=<xsl:value-of select="Id"/>
            </xsl:attribute>

            <xsl:value-of select="TitleTokenized"/>
        </button>
    </xsl:template>

</xsl:stylesheet>
