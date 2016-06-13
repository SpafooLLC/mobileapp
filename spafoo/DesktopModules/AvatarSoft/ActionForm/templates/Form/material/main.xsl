<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="controls/attr-common.xsl"/>
    <xsl:import href="controls/attr-container.xsl"/>
    <xsl:import href="controls/label.xsl"/>
    
    <xsl:import href="controls/main.xsl"/>

    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template match="/">
      <!--<xsl:copy-of select="."/>-->
        <div class="bstrap3-material form-root" data-ng-controller="ActionFormCtrl">

            <xsl:attribute name="style">
                <xsl:value-of select="/Form/Settings/Background"/>;
                <xsl:text>padding: </xsl:text><xsl:value-of select="/Form/Settings/Padding"/><xsl:text>px;</xsl:text>
                <xsl:text>color: </xsl:text><xsl:value-of select="/Form/Settings/TextColor"/><xsl:text>;</xsl:text>
            </xsl:attribute>

            <xsl:attribute name="data-ng-init">
                <xsl:text>init(</xsl:text>
                <!--<xsl:value-of select="/Form/Settings/JsonUrl"/>-->
                <xsl:value-of select="/Form/Settings/JsonModel"/>
                <xsl:text>)</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="id">
                <xsl:value-of select="/Form/Settings/BaseId"/>
                <xsl:text>root</xsl:text>
            </xsl:attribute>

            <xsl:choose>
                <xsl:when test="/Form/Settings/OpenFormMode = 'Popup'">

                    <!-- Button trigger modal -->
                    <!--
                    <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                        <xsl:attribute name="data-target">
                        </xsl:attribute>
                        Launch demo modal
                    </button>-->

                    <!-- Modal -->
                    <div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <xsl:attribute name="class">
                            <xsl:text>modal fade </xsl:text>
                            <xsl:value-of select="/Form/Settings/CssName"/>
                        </xsl:attribute>
                        <xsl:attribute name="data-moduleid">
                            <xsl:value-of select="/Form/Settings/ModuleId"/>
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="/Form/Settings/BaseId"/>
                            <xsl:text>popup</xsl:text>
                        </xsl:attribute>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <xsl:attribute name="style">
                                    <xsl:value-of select="/Form/Settings/Background"/>;
                                </xsl:attribute>
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                        <xsl:text disable-output-escaping="yes"><![CDATA[&times;]]></xsl:text>
                                    </button>
                                    <h4 class="modal-title">
                                        <xsl:value-of select="/Form/Settings/Title"></xsl:value-of>
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    <xsl:call-template name="form" />
                                </div>
                                <!--<div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>-->
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->

                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="form" />
                </xsl:otherwise>
            </xsl:choose>
        </div>

    </xsl:template>

    <xsl:template name="form">

        <!--<xsl:attribute name="data-ng-app">
                <xsl:text>ActionForm</xsl:text>
                <xsl:value-of select="/Form/Settings/ModuleId" />
            </xsl:attribute>-->

        <div class="row">

            <xsl:if test="/Form/Settings/LeftSidebarHtml != ''">
                <div class="col-sm-4 submit-confirm2">
                    <xsl:value-of select="/Form/Settings/LeftSidebarHtml" disable-output-escaping="yes" />
                </div>
            </xsl:if>

            <xsl:if test="/Form/Settings/RightSidebarHtml != ''">
                <div class="col-sm-4 pull-right submit-confirm2">
                    <xsl:value-of select="/Form/Settings/RightSidebarHtml" disable-output-escaping="yes" />
                </div>
            </xsl:if>

            <div>
                <xsl:attribute name="class">
                    <xsl:text>c-form  form-horizontal </xsl:text>
                    <!--<xsl:if test="/Form/Settings/LabelAlign != 'top'"> form-horizontal </xsl:if>-->
                    <xsl:value-of select="/Form/Settings/FieldSpacing" />
                    <xsl:text> label-align-</xsl:text>
                    <xsl:value-of select="/Form/Settings/LabelAlign" />

                    <xsl:choose>
                        <xsl:when test="/Form/Settings/LeftSidebarHtml != '' and /Form/Settings/RightSidebarHtml != ''">
                            <xsl:text> col-sm-4 </xsl:text>
                        </xsl:when>
                        <xsl:when test="/Form/Settings/LeftSidebarHtml != '' or /Form/Settings/RightSidebarHtml != ''">
                            <xsl:text> col-sm-8 </xsl:text>
                        </xsl:when>
                        <xsl:otherwise> col-sm-12 </xsl:otherwise>
                    </xsl:choose>

                </xsl:attribute>

                <xsl:choose>
                    <xsl:when test="/Form/Settings/HasCustomLayout = 'True'">
                        <xsl:value-of select="/Form/Settings/LayoutHtml" disable-output-escaping="yes" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:for-each select="/Form/Fields/Field">
                            <xsl:if test="position() = 1 or RowIndex != preceding-sibling::node()[1]/RowIndex">
                                <xsl:if test="position() > 1">
                                    <xsl:text disable-output-escaping="yes">&lt;/div&gt;</xsl:text>
                                </xsl:if>
                                <xsl:text disable-output-escaping="yes">&lt;div class="form-group"&gt;</xsl:text>
                            </xsl:if>

                            <!--<xsl:apply-templates select="."></xsl:apply-templates>-->
                            <xsl:call-template name="ctl-render" />
                        </xsl:for-each>

                        <!--close last row-->
                        <xsl:if test="/Form/Fields/Field">
                            <xsl:text disable-output-escaping="yes">&lt;/div&gt;</xsl:text>
                        </xsl:if>
                        <div class="clearfix"></div>

                    </xsl:otherwise>
                </xsl:choose>

                <div class="alert alert-danger server-error" style="display: none;">
                </div>
            </div>

            <!--<div class="pull-right submit-progress" style="display: none;">
            <img>
                <xsl:attribute name="src">
                    <xsl:value-of select="/Form/Settings/FormTemplateFolder" />
                    <xsl:text>/img/loading.gif</xsl:text>
                </xsl:attribute>
            </img>
        </div>-->

            <div class="alert alert-info submit-confirm" style="display: none; text-align: center;">

            </div>

        </div>
    </xsl:template>
</xsl:stylesheet>
