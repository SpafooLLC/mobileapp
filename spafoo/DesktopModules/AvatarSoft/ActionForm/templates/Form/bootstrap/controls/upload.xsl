<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-upload">
        <xsl:param name="addclass" />

        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div>
            <xsl:call-template name="ctl-attr-container">
                <xsl:with-param name="addClasses">fileupload-root</xsl:with-param>
            </xsl:call-template>

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>

            <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                <xsl:attribute name="title">
                    <xsl:value-of select="ShortDesc"/>
                </xsl:attribute>
            </xsl:if>

            <!-- The fileinput-button span is used to style the file input field as button -->
            <span class="btn btn-default fileinput-button pull-left">
                <span>
                    <xsl:value-of select="utils:localize('button.selectFile', 'Select file...')"></xsl:value-of>
                </span>

                <!-- The file input field used as target for the file upload widget -->
                <!--<input id="fileupload" type="file" name="files[]" multiple="" />-->
                <input type="file" name="files">
                    <xsl:call-template name="ctl-attr-common">
                        <xsl:with-param name="cssclass">
                            file-upload <xsl:if test="IsRequired='True' and CanValidate = 'True'">required-file</xsl:if> <xsl:value-of select="$addclass"/>
                        </xsl:with-param>
                        <xsl:with-param name="hasId">yes</xsl:with-param>
                        <xsl:with-param name="hasName">yes</xsl:with-param>
                    </xsl:call-template>
                    <xsl:attribute name="data-uploadurl">
                        <xsl:value-of select="/Form/Settings/UploadUrl"/>&amp;_mid=<xsl:value-of select="/Form/Settings/ModuleId"/>&amp;fieldid=<xsl:value-of select="Id"/>
                    </xsl:attribute>
                    <xsl:attribute name="data-ext">
                        <xsl:value-of select="FileExt"/>
                    </xsl:attribute>
                    <xsl:attribute name="data-limit">
                        <xsl:value-of select="FileLimit"/>
                    </xsl:attribute>
                </input>

            </span>

            <!-- The global progress bar -->
             <xsl:if test="Storage=0">
             <div class="progress progress-success progress-striped col-md-6" style="margin: 9px 10px 0 10px; height: 12px; min-height:12px; display: none; padding: 0;">
                <div class="progress-bar"></div>
             </div>
             </xsl:if>
             <xsl:if test="Storage!=0">
                <div class="progress progress-success progress-striped pull-left" style="margin: 8px 0px 0px 10px; display: none; padding: 0;height: 15px;">
                  <img style="width:150px;height:auto">
                      <xsl:attribute name="src">
                        <xsl:value-of select="/Form/Settings/ResourceBaseUrl"/>
                        <xsl:text>/loader/balls-line.GIF</xsl:text>
                      </xsl:attribute>
                  </img>
                </div>
            </xsl:if>
            <!-- The container for the uploaded files -->
            <div class="files pull-left" style="margin: 6px 10px 0 10px; ">
                <!--<xsl:attribute name="data-val">
                    <xsl:text>{{form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.value}}</xsl:text>
                </xsl:attribute>-->
                <!--<xsl:attribute name="name">
                    <xsl:value-of select="/Form/Settings/BaseId"/>
                    <xsl:value-of select="Name" />
                </xsl:attribute>-->
                <xsl:text>{{form.fields.</xsl:text>
                <xsl:value-of select="Name"/>
                <xsl:text>.value}}</xsl:text>
                
            </div>
            <!-- on init, if file already exists in database for the entryid, then show it here -->
            <!--<div class="files2 pull-left" style="margin: 6px 10px 0 10px; display: none;"></div>-->

            <div style="display: none;" class="relative-url">
                <xsl:text>{{form.fields.</xsl:text>
                <xsl:value-of select="Name"/>
                <xsl:text>.value}}</xsl:text>
            </div>

            <div class="clearfix"></div>

            <script>
                <![CDATA[
                aform_incFileUplad = true;
            ]]>
            </script>

        </div>
    </xsl:template>

</xsl:stylesheet>
