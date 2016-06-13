<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <!--<xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:import href="label.xsl"/>-->
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template match="/Form/Fields/Field[InputType = 'fullcalendar']">
        <xsl:call-template name="ctl-fullcalendar" />
    </xsl:template>
    
  <xsl:template name="ctl-fullcalendar">
     
    <script type="text/javascript" src="/DesktopModules/AvatarSoft/ActionForm/js/FullCalendar/moment.min.js"></script>
    <script type="text/javascript" src="/DesktopModules/AvatarSoft/ActionForm/js/FullCalendar/fullcalendar.min.js"></script>
    <script type="text/javascript" src="/DesktopModules/AvatarSoft/ActionForm/js/FullCalendar/jquery-ui.custom.min.js"></script>


    <link rel="stylesheet" type="text/css" href="/DesktopModules/AvatarSoft/ActionForm/js/FullCalendar/fullcalendar.css"></link>
    <link rel="stylesheet" type="text/css" href="/DesktopModules/AvatarSoft/ActionForm/js/FullCalendar/fullcalendar.print.css"></link>
    <link rel="stylesheet" type="text/css" href="/DesktopModules/AvatarSoft/ActionForm/js/FullCalendar/jquery-ui.min.css"></link>

    <div>


      <xsl:attribute name="class">
        <!--<xsl:text>fullcalendar</xsl:text>-->

        <xsl:if test="CssClass != ''">
          <xsl:value-of select="utils:tokenize(CssClass)"/>
        </xsl:if>

        <xsl:text> col-sm-</xsl:text>
        <xsl:value-of select="ColSpan"/>

        <xsl:if test="ColOffset > 0">
          <xsl:text> col-sm-offset-</xsl:text>
          <xsl:value-of select="ColOffset"/>
        </xsl:if>

        <xsl:text> </xsl:text>
        <xsl:choose>
          <xsl:when test="Align = 'left'">btnc-left</xsl:when>
          <xsl:when test="Align = 'center'">btnc-center</xsl:when>
          <xsl:when test="Align = 'right'">btnc-right</xsl:when>
        </xsl:choose>

      </xsl:attribute>


      <!--<xsl:if test="BindValue != ''">-->

      <!--</xsl:if>-->

      <xsl:if test="BindShow != ''">
        <xsl:attribute name="data-ng-show">
          <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:if test="CssStyles != ''">
        <xsl:attribute name="style">
          <xsl:value-of select="utils:tokenize(CssStyles)"/>
        </xsl:attribute>
      </xsl:if>


      <!--<xsl:value-of select="TitleTokenized" />-->
      <div>
        <xsl:attribute name="calendarModuleId">
          <xsl:value-of select="/Form/Settings/BaseId"/>
        </xsl:attribute>

        <xsl:attribute name="class">
          <xsl:text>fullcalendar</xsl:text>
        </xsl:attribute>

        <xsl:attribute name="id">
          <xsl:text>calendar_</xsl:text>
          <xsl:value-of select="/Form/Settings/BaseId"/>
        </xsl:attribute>
      </div>
      <xsl:value-of select="HtmlCodeSanitized" disable-output-escaping="yes"/>
    </div>

    <SCRIPT LANGUAGE="javascript" DEFER="true">
      <xsl:text>
          <![CDATA[    

                $(document).ready(function(){   
                        $(".fullcalendar").each(function(index,item) {
                       
                        var moduleId = $(item).attr("calendarmoduleid").substring(3);
                        var boolDrag = $("#hdnDragCondition").val();
                        var boolIsDraggable = boolDrag == "True" ? true : false;
                        var boolIsresizable = boolDrag == "True" ? true : false;
                        var AddPopupModuleID = '';
                        var EditpopupFormModuleId = '';
                        var FullCalModuleId = '';
                        var URLParam = '';

                        $.ajax({
                            type: "POST",
                            url: "/DesktopModules/AvatarSoft/ActionForm/FullCalendarApi.ashx?method=GetFormFields&mid=" + moduleId,
                            dataType: "json",
                            data: {},
                            success: function (data) {
                                if (!data.error) {
                                    AddPopupModuleID = data.Parameters.AddEventPopupModuleID.toString();
                                    // FullCalModuleId = data.Parameters.FullCalModuleID.toString();
                                    FullCalModuleId = moduleId;
                                    EditpopupFormModuleId = data.Parameters.EditEventPopupModuleID.toString();
                                    URLParam = data.Parameters.URLParameter.toString();
                                    //call fullcalendar
                                    $.ajax({
                                        type: "POST",
                                        url: "/DesktopModules/AvatarSoft/ActionForm/FullCalendarApi.ashx?method=GetEventData&mid=" + moduleId + "&URLParam=" + getParameterByName(URLParam),
                                        dataType: "json",
                                        data: {},
                                        success: function (data) {
                                            //jQuery("#calendar_" + $(item).attr("calendarmoduleid")).fullCalendar({
                                        $("#calendar_dnn"+moduleId).fullCalendar({
                                                theme: true,
                                                header: {
                                                    left: 'prev,next today',
                                                    center: 'title',
                                                    right: 'month,agendaWeek,agendaDay'
                                                },
                                                nextDayThreshold: "00:00:00",
                                                defaultDate: new Date(),
                                                editable: true,
                                                eventLimit: true, // allow "more" link when too many events
                                                events: data,
                                                eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                                                    updateEvent(event);
                                                },
                                                eventResize: function (event, delta, revertFunc) {
                                                    updateEvent(event);
                                                    //alert(event.title + " end is now " + event.end.format());
                                                    //if (!confirm("is this okay?")) {
                                                    //    revertFunc();
                                                    //}
                                                },
                                                selectable: true,
                                                eventDurationEditable: boolIsresizable,
                                                eventStartEditable: boolIsDraggable,
                                                select: function (start, end) {
                                                    
                                                    window["showFormPopup" + AddPopupModuleID]();
                                                    
                                                   
                                                   
                                                  dnnsfjQuery('#dnn'+ AddPopupModuleID +'popup').modal().on('shown.bs.modal', function () {
                                                    $("input[name='dnn" + AddPopupModuleID + "StartDate']").val(start.format());
                                                    $("input[name='dnn" + AddPopupModuleID + "EndDate']").val(end.format());
                                                    $("input[name='dnn" + AddPopupModuleID + "FullCalModuleId']").val(FullCalModuleId);
                                                    debugger;
                                                   });

                                                    

                                                },
                                                eventClick: function (event) {
                                                
                                                    
                                                    window["showFormPopup" + EditpopupFormModuleId]();
                                                    
                                                    dnnsfjQuery('#dnn'+ EditpopupFormModuleId +'popup').modal().on('shown.bs.modal', function () {
                                                    $("input[name='dnn" + EditpopupFormModuleId + "EventID']").val(event.id);
                                                    var editInfo = document.getElementsByName("dnn" + EditpopupFormModuleId + "EditEventInfo");
                                                    editInfo[0].innerHTML = "Name: " + event.title + "<br>Start Date: " + event.start.format() + "<br>End Date: " + event.end.format();
                                                    });
                                                    
                                                    //stop to intitiate form
                                                   // dnnsfjQuery('#dnn' + EditpopupFormModuleId + 'root')[0].initialized = true;
                                                }
                                                //ignoreTimezone:false
                                                //,
                                                //eventColor:'blue',
                                                //eventBackgroundColor: 'green',
                                                //eventBorderColor: 'red',
                                                //eventTextColor: 'white'   
                                            });

                                        },
                                        error: function (data) {
                                            //alert(data.responseText);
                                        }

                                    });
                                }
                            },
                            error: function (data) {
                                //console.log(data);
                            }
                        });


                        function updateEvent(event) {
                            var start = (event.start != null) ? event.start.format() : "";
                            var end = (event.end != null) ? event.end.format() : "";
                            var id = (event.id != null) ? event.id : "";
                            var title = (event.title != null) ? event.title : "";
                            // var ownerid = $("input[name='dnn" + AddPopupModuleID + "hdnCurrentUserID']").val();

                            $.ajax({
                                type: "POST",
                                url: "/DesktopModules/AvatarSoft/ActionForm/FullCalendarApi.ashx?method=UpdateEventData&mid=" + moduleId + "&start=" + start + "&end=" + end + "&id=" + id + "&title=" + title,
                                dataType: "json",
                                data: {},
                                success: function (data) {
                                    //console.log(data.response);
                                },
                                error: function (data) {
                                    //console.log(data);
                                }
                            });
                        }

                        function getParameterByName(name) {
                            name = name.toLowerCase();
                            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                                results = regex.exec(location.search.toLowerCase());
                            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                        }

                    //});


                  });
                });

      ]]>
      </xsl:text>
    </SCRIPT>
  </xsl:template>

</xsl:stylesheet>
