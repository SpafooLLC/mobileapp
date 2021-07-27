<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucCropImage.ascx.cs" Inherits="Netsam.Modules.NS_ClientRegistration.ucCropImage" %>
<link href="/DesktopModules/NS_Admin/js/croppie.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css" rel="stylesheet" />
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script src="/DesktopModules/NS_Admin/js/croppie.min.js"></script>
<div id="dvActionPanel" class="proimgsave" style="display:none;">
  <img src="/portals/0/images/roleft.png" onclick="return NS_RotateLeft();"/>
  <img src="/portals/0/images/roright.png" onclick="return NS_RotateRight();"/>
  <img src="/portals/0/images/rook.png" onclick="return SaveCroppedImage();"/>
</div>
<script>
    var mouseX;
    var mouseY;

    var basic;
    var IsSaved = false;
    var NS_CropImageProcessorURL = "";
    $(document).ready(function () {
        $(document).mousemove(function (e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });
    })
    function NS_RotateLeft() {
        var _ID = $('#dvActionPanel').attr('relatedCroppie');
        $('#'+_ID).croppie('rotate', -90);
        return false;
    }
    function NS_RotateRight() {
        var _ID = $('#dvActionPanel').attr('relatedCroppie');
        $('#' + _ID).croppie('rotate', 90);
        return false;
    }

    function NS_CloseDialog() {
        $('#NS_dvModalBox').modal('hide');
    }
    var NS_CurrFile;
    var NS_CurrContainer;
    var NS_viewWidth = 100;
    var NS_viewHeight = 100;
    var NS_BoundWidth = 100;
    var NS_BoundHeight = 100;
    var NS_ViewPort = 'square';
    function readFile(input) {
        NS_CurrFile = input;
        if (input.files && input.files[0]) {
            var elementID = $(input).attr('id').split('_')[1];
            if (elementID == 'UserProPic') {
                elementID = "NS_imgUserProfilePic";
            }
            else {
                elementID = "MainCropper_" + elementID;
                 $("#" + elementID).html('');
            }
            $("#" + elementID).croppie('destroy');
            basic = $('#'+elementID).croppie({
                viewport: { width: NS_viewWidth, height: NS_viewHeight,type:NS_ViewPort },
                boundary: { width: NS_BoundWidth, height: NS_BoundHeight },
                points: [77, 469, 280, 739],
                showZoomer: true,
                enableOrientation: true,
                url: 'http://lorempixel.com/500/400/'
            });

            var reader = new FileReader();

            reader.onload = function (e) {
                $('#' + elementID).croppie('bind', {
                    url: e.target.result, zoom: .75
                });
            }
           
            reader.readAsDataURL(input.files[0]);
            $(".croppie-container").mouseover(function () {
              //$('#dvActionPanel').css({ position: "absolute", 'top': $(this).offset().top + "px", 'left': ($(this).offset().left + $(this).width()+5) + "px" }).show();
		     $('#dvActionPanel').css({  }).show(); 
		      $('#dvActionPanel').attr('relatedCroppie', $(this).attr("id"));
			

			
			
			  $('#dvActionPanelx').css({  }).show(); 
		      $('#dvActionPanelx').attr('relatedCroppie', $(this).attr("id"));
            });
        }
    }

var NS_ActualFileSize = 'viewport';
  //  $('#uploadme').on('change', function () { readFile(this); });
    function SaveCroppedImage() {
        bootbox.confirm('This will upload your cropped image, are you sure ?', function (r) {
            if (r) {
                basic.croppie('result', {
                    type: 'canvas', size: NS_ActualFileSize
                }).then(function (resp) {
                    $("#main-notify").text('Uploading...');
                    var formData = new FormData();
                    formData.append('b64str', resp);
                    var IsProfilePic = true;
                    formData.append('file', $(NS_CurrFile)[0].files[0]);
                    var FileID = $(NS_CurrFile).attr('FileID');
                    if (FileID != undefined) {// work sample file upload found , so its not profile pic
                        formData.append('FileId', FileID);
                        IsProfilePic = false;
                    }
                    var QID = $(NS_CurrFile).attr('qid');
                    if (QID != undefined) {
                        formData.append('QuestionID', QID);
                    }
                   $.ajax({
                        type: 'post', data: formData,
                        url: NS_CropImageProcessorURL,
                        success: function (status) {
                            if (status == 'Already') {
                                bootbox.alert("File already exists. Rename file and upload");
                                return false;
                            }
                            if (status != 'error') {
                                // if DNN FileID is returned by handler
                                $(NS_CurrFile).attr('uploadedFile', status.split('|')[0]);
                                if (IsProfilePic) {
                                    $("#NS_imgUserProfilePic").attr('src', status.split('|')[1]);
                                }
                                NS_CloseDialog();
                                if (typeof NS_OnAfterSampleUpload == 'function') {
                                    NS_OnAfterSampleUpload();
                                }
                            }
                        },
                        processData: false, contentType: false,
                        error: function () {
                            bootbox.alert("Whoops something went wrong!");
                        }
                    });
                });
            }
        });
    }
</script>
