<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-button-single">

        <div>
            <xsl:call-template name="ctl-attr-container">
                <xsl:with-param name="addClasses">
                    <xsl:text>btn-form btnc </xsl:text>
                    <xsl:if test="/Form/Settings/RenderContext = 'Form' and ColOffset > 0">
                        <xsl:text> col-sm-offset-</xsl:text>
                        <xsl:value-of select="ColOffset"/>
                    </xsl:if>
                    <!--<xsl:if test="ButtonAlign = 'controls' and (/Form/Settings/LabelAlign != 'top' and /Form/Settings/LabelAlign != 'inside')">
                        <xsl:text> col-sm-offset-</xsl:text>
                        <xsl:value-of select="/Form/Settings/LabelWidth" />
                    </xsl:if>-->
                    <xsl:text> </xsl:text>
                    <xsl:choose>
                        <xsl:when test="ButtonAlign = 'left'">btnc-left</xsl:when>
                        <xsl:when test="ButtonAlign = 'center'">btnc-center</xsl:when>
                        <xsl:when test="ButtonAlign = 'right'">btnc-right</xsl:when>
                    </xsl:choose>
                </xsl:with-param>
                <xsl:with-param name="fullSpan">true</xsl:with-param>
            </xsl:call-template>
            
            <button type ="button">
              <xsl:if test="IsEnabled != 'True'">
                <xsl:attribute name="disabled">disabled</xsl:attribute>
              </xsl:if>
                <xsl:attribute name="data-loading-text">
                    <xsl:value-of select="utils:localize('button.pleaseWait', 'Please Wait...')"></xsl:value-of>
                </xsl:attribute>
                <xsl:attribute name="class">
                    btn submit form-button af-btn-loading
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
                    <xsl:text> </xsl:text>
                    <xsl:if test="/Form/Settings/RenderContext = 'Form'">
                        <xsl:if test="ButtonAlign = 'block'"> btn-block </xsl:if>
                    </xsl:if>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="utils:tokenize(CssClass)"/>
                </xsl:attribute>

                <xsl:attribute name="id">
                    <xsl:value-of select="/Form/Settings/BaseId"/>
                    <xsl:value-of select="Name"/>
                </xsl:attribute>
                
                <xsl:attribute name="style">
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
                <xsl:if test="not(IsDefaultButton) or IsDefaultButton != 'False'">
                    <xsl:attribute name="data-default-button">on</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="data-submiturl">
                    <xsl:value-of select="/Form/Settings/AjaxSubmitUrl"/>&amp;event=click&amp;b=<xsl:value-of select="Id"/>
                </xsl:attribute>

                <xsl:value-of select="TitleTokenized"/>
            </button>
        </div>
        <xsl:text> </xsl:text>
    </xsl:template>

</xsl:stylesheet>
