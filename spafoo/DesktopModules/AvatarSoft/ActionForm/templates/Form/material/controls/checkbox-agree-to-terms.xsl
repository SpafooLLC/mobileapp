<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="label.xsl"/>
  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-checkbox-agree-to-terms">

    <div>
      <xsl:call-template name="ctl-attr-container">
        <xsl:with-param name="addClasses">
          <xsl:text> form-checkbox-agree-to-terms </xsl:text>
          <xsl:if test="ColOffset > 0">
            <xsl:text> col-sm-offset-</xsl:text>
            <xsl:value-of select="ColOffset"/>
          </xsl:if>
        </xsl:with-param>
        <xsl:with-param name="withLabelColumn">false</xsl:with-param>
      </xsl:call-template>

      <div class="checkbox">
        <label class="">
          <input type="checkbox">
            <xsl:call-template name="ctl-attr-common">
              <xsl:with-param name="cssclass">
                <xsl:text> normalCheckBox </xsl:text>
                <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required </xsl:if>
              </xsl:with-param>
              <xsl:with-param name="hasId">yes</xsl:with-param>
              <xsl:with-param name="hasName">yes</xsl:with-param>
              <xsl:with-param name="bind">yes</xsl:with-param>
              <xsl:with-param name="touchEvent">click</xsl:with-param>
            </xsl:call-template>
            <xsl:if test="Value = 'True'">
              <xsl:attribute name="checked">checked</xsl:attribute>
            </xsl:if>
            <xsl:if test="IsEnabled != 'True'">
              <xsl:attribute name="disabled">disabled</xsl:attribute>
            </xsl:if>
          </input>
          <xsl:choose>
            <xsl:when test="PageId != '-1' and PageId != ''">
                <!--<xsl:value-of select="utils:formatString(utils:localize('agreeToTerms.text', 'Agree to &lt;a href=&quot;{0}&quot;&gt;Terms and Conditions&lt;/a&gt;'), utils:navigateUrl(PageId/Value))" disable-output-escaping="yes"></xsl:value-of>-->
                <xsl:value-of select="utils:formatString(utils:localize('agreeToTerms.text', 'Agree to &lt;a href=&quot;{0}&quot;&gt;Terms and Conditions&lt;/a&gt;'), utils:navigateUrl(PageId))" disable-output-escaping="yes"></xsl:value-of>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="utils:formatString(utils:localize('agreeToTerms.text', 'Agree to &lt;a href=&quot;{0}&quot;&gt;Terms and Conditions&lt;/a&gt;'), utils:tokenize(Url))" disable-output-escaping="yes"></xsl:value-of>
            </xsl:otherwise>
          </xsl:choose>

          <!--<xsl:value-of select="TitleTokenized"/>-->
        </label>
        <div class="err-placeholder"></div>
      </div>
    </div>

  
    
    
    
    
    
    
  </xsl:template>

</xsl:stylesheet>
