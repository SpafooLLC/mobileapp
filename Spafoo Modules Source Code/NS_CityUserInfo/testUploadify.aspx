<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="testUploadify.aspx.cs" Inherits="NS.Modules.NS_CityUserInfo.testUploadify" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <object data="/scripts/uploadify/uploadify.swf" type="application/x-shockwave-flash" width="100" height="100">
                <param name="allowScriptAccess" value="sameDomain">
                <param name="quality" value="best">
                <param name="wmode" value="transparent">
                <embed src="" quality="high" wmode="transparent" pluginspage="http://www.adobe.com/go/getflash" type="application/x-shockwave-flash" width="930" height="170"></embed>
                <param name="bgcolor" value="#ffffff" />
                <param name="movie" value="/scripts/uploadify/uploadify.swf" />

            <!--[if !IE]>-->
            <object type="application/x-shockwave-flash" data="/scripts/uploadify/uploadify.swf" width="100" height="100">
            <!--<![endif]-->
            <p>alternative content</p>
            <!--[if !IE]>-->
            </object>
            <!--<![endif]-->
            </object>
    <form id="form1" runat="server">
    <div>
        <input type="file" id="NS_City_StateIDDocument" />
                             <input type="hidden"   id="NS_City_StateIDDocumentFileName"   />
        <script>
            $('#NS_City_StateIDDocument').uploadify({
                height: 30,
                swf: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify.swf',
                uploader: '/DesktopModules/NS_CityUserInfo/DocumentHandler.ashx',
                width: 130,
                buttonText: 'Click here to upload',
                folder: "/DesktopModules/NS_CityUserInfo/UserUploads",
                fileTypeDesc: 'Only .jpg, .bmp, .png, .gif, .doc, .docx, .pdf ',
                fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.doc;*.docx;*.pdf',
                'multi': false,
                'auto': true,
                cancelImg: '/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/uploadify-cancel.png',
                onUploadError: function (f, e, eMsg, eStr) { },
                onUploadSuccess: function (f, d, r) {
                    NS_City_StateIDDocument = d;
                    $('#NS_City_StateIDDocument').uploadify('settings', 'buttonText', 'DONE');
                    $('#NS_City_StateIDDocument').uploadify('disable', true);
                    $('#NS_City_StateIDDocumentFileName').val(f.name);
                    //$('#NS_City_StateIDDocumentFileName').text(f.name);
                }
            });
        </script>
    
    </div>
    </form>
</body>
</html>
