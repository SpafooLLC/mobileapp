<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:import href="label.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template match="/Form/Fields/Field[InputType = 'touch-signature']">
        <xsl:call-template name="ctl-touch-signature" />
    </xsl:template>

    <xsl:template name="ctl-touch-signature">
        <xsl:param name="addClass"></xsl:param>

        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div>
            <xsl:call-template name="ctl-attr-container" />

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>
            <div >

                <canvas class="delay-submit">

                    <xsl:attribute name="id">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                      <xsl:value-of select="Name" />
                      <xsl:text>canvasSignature</xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="style">

                        <xsl:if test="CssStyles != ''">
                            <xsl:value-of select="utils:tokenize(CssStyles)"/>
                        </xsl:if>
                        ;border:1px solid #ccc;	border-radius: 5px;cursor:default;
                    </xsl:attribute>

                </canvas>
                <p>
                    <a class="clear-signature" style="height:32px;width:150px;text-align:center;padding: 0px;cursor: pointer;" type="text" onclick="return false;" href="#">Clear Signature</a>
                </p>
            </div>


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

                <!--<xsl:attribute name="data-val">
                        <xsl:text>{{ form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.value }}</xsl:text>
                    </xsl:attribute>-->

            </input>

        </div>


        <script type="text/javascript">
            <![CDATA[

    $(function () {

]]>         <xsl:text>var c=$('#</xsl:text>
            <xsl:value-of select="/Form/Settings/BaseId"/>
            <xsl:value-of select="Name" />
            <xsl:text>canvasSignature');</xsl:text><![CDATA[  
        
        var sigCanvas = c[0];
        var formRoot = c.closest('.form-root');
           
        formRoot[0].onFormSubmit = formRoot[0].onFormSubmit || [];

        formRoot[0].onFormSubmit.push(function() { 
      
]]>         <xsl:text>var fieldName='</xsl:text>
            <xsl:value-of select="/Form/Settings/BaseId"/>
            <xsl:value-of select="Name" />
            <xsl:text>';</xsl:text><![CDATA[  

            GetSigImageB642(sigCanvas, function(str) {
                formRoot.find('[name='+fieldName+']').val(str);
                formRoot[0].toUpload--;
                if (formRoot[0].toUpload == 0)
                    formRoot[0].submitData(formRoot[0].$btn);
            });
        });
 

        // get references to the canvas element as well as the 2D drawing context
           
        if (!isNaN(parseInt(sigCanvas.style.height)))
            sigCanvas.height = parseInt(sigCanvas.style.height);
        else if (c.parent().height() > 50)
            sigCanvas.height = parseInt(c.parent().height());
        else
           sigCanvas.height=100;
           
        if (!isNaN(parseInt(sigCanvas.style.width)))
           sigCanvas.width = parseInt(sigCanvas.style.width);
        else
           sigCanvas.width = parseInt(c.parent().width());
           
        var context = sigCanvas.getContext("2d");
        context.strokeStyle = 'black';

        context.fillStyle="white";
        context.fillRect(0, 0, sigCanvas.width, sigCanvas.height);
     

        // This will be defined on a TOUCH device such as iPad or Android, etc.
        var is_touch_device = 'ontouchstart' in document.documentElement;

        if (is_touch_device) {
            // create a drawer which tracks touch movements
            var drawer = {
                isDrawing: false,
                touchstart: function (coors) {
                    context.beginPath();
                    context.moveTo(coors.x, coors.y);
                    this.isDrawing = true;
                },
                touchmove: function (coors) {
                    if (this.isDrawing) {
                        context.lineTo(coors.x, coors.y);
                        context.stroke();
                    }
                },
                touchend: function (coors) {
                    if (this.isDrawing) {
                        this.touchmove(coors);
                        this.isDrawing = false;
                    }
                }
            };

            // create a function to pass touch events and coordinates to drawer
            function draw(event) {

                // get the touch coordinates.  Using the first touch in case of multi-touch
                var coors = {
                    x: event.targetTouches[0].pageX,
                    y: event.targetTouches[0].pageY
                };

                // Now we need to get the offset of the canvas location
                var obj = sigCanvas;

                if (obj.offsetParent) {
                    // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
                    do {
                        coors.x -= obj.offsetLeft;
                        coors.y -= obj.offsetTop;
                    }
                        // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
                        // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
                    while ((obj = obj.offsetParent) != null);
                }

                // pass the coordinates to the appropriate handler
                drawer[event.type](coors);
            }


            // attach the touchstart, touchmove, touchend event listeners.
            sigCanvas.addEventListener('touchstart', draw, false);
            sigCanvas.addEventListener('touchmove', draw, false);
            sigCanvas.addEventListener('touchend', draw, false);

            // prevent elastic scrolling
            sigCanvas.addEventListener('touchmove', function (event) {
                event.preventDefault();
            }, false);
        }
          
        if (true) {

            // start drawing when the mousedown event fires, and attach handlers to
            // draw a line to wherever the mouse moves to
            c.mousedown(function (mouseEvent) {
                var position = getPosition(mouseEvent, sigCanvas);

                context.moveTo(position.X, position.Y);
                context.beginPath();

                // attach event handlers
                $(this).mousemove(function (mouseEvent) {
                    drawLine(mouseEvent, sigCanvas, context);
                }).mouseup(function (mouseEvent) {
                    finishDrawing(mouseEvent, sigCanvas, context);
                }).mouseout(function (mouseEvent) {
                    finishDrawing(mouseEvent, sigCanvas, context);
                });
            });

        }
        
        // attach clear signature
        c.parents('.field-container:first').find('.clear-signature').click(function() {
        
            sigCanvas.width = sigCanvas.width;
            var context = sigCanvas.getContext("2d");
            context.strokeStyle = 'black';

            context.fillStyle="white";
            context.fillRect(0,0,sigCanvas.width,sigCanvas.height);
        });
        
    });

    // works out the X, Y position of the click inside the canvas from the X, Y position on the page
    function getPosition(mouseEvent, sigCanvas) {
        sigCanvas = $(sigCanvas);
        var x, y;
        if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
            x = mouseEvent.pageX;
            y = mouseEvent.pageY;
        } else {
            x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { X: x - sigCanvas.offset().left, Y: y - sigCanvas.offset().top };
    }


    // draws a line to the x and y coordinates of the mouse event inside
    // the specified element using the specified context
    function drawLine(mouseEvent, sigCanvas, context) {

        var position = getPosition(mouseEvent, sigCanvas);

        context.lineTo(position.X, position.Y);
        context.stroke();
    }

    // draws a line from the last coordiantes in the path to the finishing
    // coordinates and unbind any event handlers which need to be preceded
    // by the mouse down event
    function finishDrawing(mouseEvent, sigCanvas, context) {
        // draw the line to the finishing coordinates
        drawLine(mouseEvent, sigCanvas, context);

        context.closePath();

        // unbind any events which could draw
        $(sigCanvas).unbind("mousemove")
            .unbind("mouseup")
            .unbind("mouseout");
    }


    function GetSigImageB642(cvs, callback) {

        //cvs.width = cvs.width;
        //cvs.height =  cvs.height;

        var b64String = cvs.toDataURL("image/png");
        
        var loc = b64String.search("base64,");
        var retstring = b64String.slice(loc + 7, b64String.length);
 
        if (callback)
            callback(retstring);
    }

]]>
        </script>

    </xsl:template>

</xsl:stylesheet>
