<%@ Control Language="C#" AutoEventWireup="True" Inherits="avt.ActionForm.DnnTextEditor" EnableViewState = "true" CodeBehind="DnnTextEditor.ascx.cs" %>
<%@ Register TagPrefix="dnn" TagName="TextEditor" Src="~/controls/texteditor.ascx" %>

<style>
    .dnnTextEditor {
        margin-bottom: 0;
    }
    body {
        background-color: transparent !important;
    }
    .dnnFormItem p {
        margin-bottom: 0;
    }
    iframe {
        margin: 7px;
    }
</style>

<dnn:texteditor id="txtContent" runat="server" width="100%" ChooseMode="false"></dnn:texteditor>

<script>
    window.getContent = function () {
        return $('body', $('iframe')[0].contentWindow.document).html();
    };

    $(function () {

        $(window.frameElement).prev().fadeOut();

        setInterval(function () {

            if (!$('body', $('iframe')))
                return;

            // add padding inside iframes
            $('body', $('iframe')[0].contentWindow.document).css({ 'padding': '10px 10px' });;
            
            // set height of parent iframe
            $(window.frameElement).height(1).height($('body').height());

            // load content into iframe
            if (!window.once && $('body', $('iframe')[0].contentWindow.document).html()) {
                window.once = true;
                return $('body', $('iframe')[0].contentWindow.document).html($(window.frameElement).attr('data-content'));
            }


        }, 200);
    });

    

</script>
