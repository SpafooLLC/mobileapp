<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="test.ascx.cs" Inherits="Netsam.Modules.NS_Admin.UC.test" %>
<link href="/DesktopModules/NS_Admin/js/croppie.css" rel="stylesheet" />
<script src="/DesktopModules/NS_Admin/js/croppie.min.js"></script>
<div class="demo"></div>
      <div id="dialog-form" title="Crop image">
      <div id="main-notify"></div>
          <div id="main-cropper"></div>
           <div id="main-ButtonPanel" style="display:none">
              <div id="btnRLeft" class="NS_PanelButton" onclick="return NS_RotateLeft();">Rotate Left</div>
              <div id="btnRRight" class="NS_PanelButton" onclick="return NS_RotateRight();">Rotate Right</div>
          </div>
      </div>
<input type="file" id="uploadme" value="Choose Image" accept="image/*">
<div id="upload-demo-i" style="clear:both;"></div>
<script>
    var basic, dialog;
    var IsSaved = false;
    function NS_RotateLeft() {
        $('#main-cropper').croppie('rotate', -90);
        return false;
    }
    function NS_RotateRight() {
        $('#main-cropper').croppie('rotate', 90);
        return false;
    }
    function NS_defineDialog() {
        dialog = $("#dialog-form").dialog({
            autoOpen: false,
            height: 450,width: 550,modal: true,
            buttons: {
                "Done": SaveCroppedImage,
                Cancel: function () {
                    NS_CloseDialog();
                }}
        });
    }	
    
    function NS_CloseDialog() {
        dialog.dialog("close");
        $("#main-cropper").html('');
        $("#main-notify").html('');
        $("#main-ButtonPanel").hide();
    }
    function readFile(input) {
        NS_defineDialog();
        $("#main-cropper").show();
        $("#dialog-form").dialog('open');
	$("#main-ButtonPanel").show();
        if (input.files && input.files[0]) {
            basic = $('#main-cropper').croppie({
                viewport: { width: 250, height: 250 },
                boundary: { width: 300, height: 300 },
                points: [77, 469, 280, 739],
                showZoomer: true,
    		enableOrientation: true,
                url: 'http://lorempixel.com/500/400/'
            });

            var reader = new FileReader();

            reader.onload = function (e) {
                $('#main-cropper').croppie('bind', {
                    url: e.target.result
                });
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#uploadme').on('change', function () { readFile(this); });

    function SaveCroppedImage() {
        bootbox.confirm('This will upload your cropped image, are you sure ?', function (r) {
            if (r) {
                basic.croppie('result', {
                    type: 'canvas', size: 'viewport'
                }).then(function (resp) {
                    html = '<img src="' + resp + '" />';
                    $("#upload-demo-i").html(html);
                    $("#main-notify").text('Uploading...');
                    $.ajax({
                        type: 'POST', dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        url: "/DesktopModules/NS_Admin/fileupload.asmx/FotoSave",
                        data: "{ 'b64str' :'" + resp + "'}",
                        success: function (data) {
                            IsSaved = true;
                            NS_CloseDialog();
                        }});
                });}
        });
    }
</script>
