<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucCropImageEx.ascx.cs" Inherits="Netsam.Modules.NS_ClientRegistration.ucCropImageEx" %>
<link href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css" rel="stylesheet" />
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script src="/desktopmodules/NS_ClientRegistration/Script/jquery.cropit.js"></script>
<style>
      .cropit-preview {
        background-color: #f8f8f8;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-top: 7px;
        width: 250px;
        height: 250px;
      }

      .cropit-preview-image-container {
        cursor: move;
      }

      .image-size-label {
        margin-top: 10px;
      }

      /*input, .export {
        display: block;
      }*/

      /*button {
        margin-top: 10px;
      }*/
    </style>
<!-- Modal HTML -->
<div id="NS_dvModalBox" class="modal fade">
    <div class="modal-dialog cusimgm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="sp-close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Crop Image</h4>
            </div>
            <div class="modal-body mfcpt">
                <div id="main-notify"></div>
                <div id="main-cropper">
                    <input type="file" class="cropit-image-input">
                    <div class="cropit-preview">
                    </div>
                    <div class="image-size-label">Resize image</div>
                    <input type="range" class="cropit-image-zoom-input">
                </div>
            </div>
            <div class="modal-footer">
                <input type="button" class="blsm" onclick="return NS_RotateLeft();" value="Rotate Left" />
                <input type="button" class="blsm" onclick="return NS_RotateRight();" value="Rotate Right" />
                <input type="button" class="grsm" onclick="return SaveCroppedImage();" value="Done" />
                <!-- <input type="button" class="grsm" data-dismiss="modal" onclick="return NS_CloseDialog();" value="Cancel" /> -->
            </div>
        </div>
    </div>
</div>
<script>
    var basic, dialog;
    var IsSaved = false;
    var NS_CropImageProcessorURL = "";
    $(document).ready(function () {
        $("#NS_dvModalBox").on("hide.bs.modal", function () {
            // put your default event here
           // $("#main-cropper").html('');
            $("#main-notify").html('');
        });
    })
    function NS_RotateLeft() {
        $('#main-cropper').croppie('rotate', -90);
        return false;
    }
    function NS_RotateRight() {
        $('#main-cropper').croppie('rotate', 90);
        return false;
    }
    function NS_defineDialog() {
        //dialog = $("#dialog-form").dialog({
        //    autoOpen: false, 
        //    beforeClose: function (event, ui) {
        //        NS_CloseDialog();
        //        return true;
        //    },
        //    height: 450, width: 550, modal: true,
        //    buttons: {
        //        "Done": SaveCroppedImage,
        //        Cancel: function () {
        //            NS_CloseDialog();
        //        }
        //    }
        //});
    }

    function NS_CloseDialog() {
        $('#NS_dvModalBox').modal('hide');
    }
    var NS_CurrFile;
    var NS_viewWidth = 250;
    var NS_viewHeight = 250;
    var NS_BoundWidth = 300;
    var NS_BoundHeight = 300;

    function readFile(input) {
        NS_CurrFile = input;
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".cropit-preview-image").attr('src', e.target.result);
            basic = $('#main-cropper').cropit({
                width: 250,
                height: 250,
                smallImage: 'allow',
                src: 'http://lorempixel.com/250/250/'
            });
            // Sets image zoom.
            $('#main-cropper').cropit('zoom', .40);
        }
        reader.readAsDataURL(input.files[0]);
        $("#main-cropper").show();
        $('#NS_dvModalBox').modal('show');
        $('#NS_dvModalBox').on('shown.bs.modal', function () {
            //  if (input.files && input.files[0]) {

            // open select file dialog programmatically

            //}
        });
            
    }

    //  $('#uploadme').on('change', function () { readFile(this); });
    function SaveCroppedImage() {
        bootbox.confirm('This will upload your cropped image, are you sure ?', function (r) {
            if (r) {
                basic.croppie('result', {
                    type: 'canvas', size: 'viewport'
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