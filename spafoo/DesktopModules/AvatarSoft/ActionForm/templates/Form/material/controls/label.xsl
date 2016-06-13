<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-label">
        <xsl:param name="for">
            <xsl:value-of select="/Form/Settings/BaseId"/>
            <xsl:value-of select="Name"/>
        </xsl:param>

        <xsl:param name="name">
            <xsl:value-of select="Name"/>
        </xsl:param>

        <div>
            <xsl:attribute name="class">
                label-<xsl:value-of select="/Form/Settings/LabelAlign"/> 
                <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
                    <xsl:if test="/Form/Settings/LabelWidth > 0">
                        <xsl:text> col-sm-</xsl:text>
                        <xsl:value-of select="/Form/Settings/LabelWidth"/>
                        <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:if test="ColOffset > 0">
                        <xsl:text> col-sm-offset-</xsl:text>
                        <xsl:value-of select="ColOffset"/>
                        <xsl:text> </xsl:text>
                    </xsl:if>
                </xsl:if>
            </xsl:attribute>
            <label class="">
                <xsl:if test="$for">
                    <xsl:attribute name="for">
                        <xsl:value-of select="$for"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="class">
                    <xsl:text>control-label af-slide</xsl:text>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="utils:tokenize(LabelCssClass)"/>
                    <xsl:text> </xsl:text>

                    <xsl:if test="IsRequired='True' and CanValidate = 'True'">required </xsl:if>
                    <!--<xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">-->

                    <!--</xsl:if>-->

                </xsl:attribute>
                <xsl:attribute name="style">
                    <xsl:value-of select="utils:tokenize(LabelCssStyles)"/>
                </xsl:attribute>

                <xsl:if test="BindShow != ''">
                    <xsl:choose>
                        <xsl:when test="BindPreserveLayout = 'True'">
                            <xsl:attribute name="data-ng-style">
                                <xsl:text>{ visibility: </xsl:text>
                                <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                                <xsl:text> ? 'visible' : 'hidden' } </xsl:text>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="data-ng-show">
                                <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                            </xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:if>

                <xsl:value-of select="TitleTokenized"/>
                <xsl:text> </xsl:text>
              <xsl:if test="ShortDescTokenized != ''">
                <xsl:if test="/Form/Settings/ShowTooltips = 'True'">
                    <span class="glyphicon glyphicon-info-sign popupOnHover">
                        <xsl:attribute name="data-placement">
                            <xsl:text>top</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-original-title">
                            <xsl:value-of select="TitleTokenized"/>
                        </xsl:attribute>
                        <xsl:attribute name="data-container">
                            <xsl:text>body</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-content">
                            <xsl:value-of select="/Form/Fields/Field[Name[text()=$name]]/ShortDescTokenized" />
                        </xsl:attribute>
                    </span>
                </xsl:if>
              </xsl:if>
            </label>
        </div>

    </xsl:template>
</xsl:stylesheet>
