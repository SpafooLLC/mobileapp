<%@ Control Language="C#" AutoEventWireup="true" Inherits="avt.ActionForm.Main" EnableViewState="true" CodeBehind="Main.ascx.cs" %>

<div class="bstrap30">
    <asp:Label runat="server" ID="lblContent"></asp:Label>
    <div runat="server" id="cFormTemplate">
        <div runat="server" id="phFormTemplate"></div>

        <div runat="server" id="pnlMessage" visible="false">
            <div class="alert alert-info">
                <asp:Literal runat="server" ID="lblMessage"></asp:Literal>
            </div>
        </div>

    </div>
</div>

<div id="pnlScriptAlways" runat="server" visible="false">
    <script type="text/javascript">
        dnnsfjQuery(function () {
            <%= FormTemplate.InitScript(TemplateSourceDirectory, PortalId) %>
        });
    </script>
</div>

<div id="pnlScriptInline" runat="server" visible="false">
    <script type="text/javascript">
        //when DisplayMode is "In Text" and user sets the link should open in new window
        dnnsfjQuery('[href="javascript: showFormInline<%=ModuleId %>();"]').click(function (event) {
            showFormInline<%=ModuleId %>(event);
            dnnsfjQuery(this).attr('href', '#');
        });
        function showFormInline<%=ModuleId %>(e) {
            var target = dnnsfjQuery("#<%= lblContent.ClientID %>").children().children().children().attr('target');
            if (target === undefined || target === null || target === '' || target === '_self') {
                dnnsfjQuery("#<%= lblContent.ClientID %>").slideUp('fast');
                dnnsfjQuery("#<%= phFormTemplate.ClientID %>").slideDown('fast');
                <%= FormTemplate.InitScript(TemplateSourceDirectory, PortalId) %>
            } else if (target === '_blank') {
                var w = window.open();
                var loc = "<%=DotNetNuke.Common.Globals.NavigateURL("Form", "mid=" + this.ModuleId) %>";
                w.location = loc;
            }
        e.preventDefault();
    }
    function hideFormInline<%=ModuleId %>() {
            dnnsfjQuery("#<%= lblContent.ClientID %>").slideDown();
        dnnsfjQuery("#<%= phFormTemplate.ClientID %>").slideUp();
    }

    </script>
</div>

<div id="pnlScriptPopup" runat="server" visible="false">

    <script type="text/javascript">

<%--    dnnsfjQuery(function () {
        <%= FormTemplate.InitScript(TemplateSourceDirectory) %>
    });--%>
        dnnsfjQuery('[href="javascript: showFormPopup<%=ModuleId %>();"]').click(function (event) {
            showFormPopup<%=ModuleId %>(event);
            dnnsfjQuery(this).attr('href', '#');
        });
        function showFormPopup<%=ModuleId %>(e) {
            dnnsfjQuery('#dnn<%= ModuleId %>popup').modal()
            .on('shown.bs.modal', function () {
                if (!window.afonce<%=ModuleId %>) {
                    window.afonce<%=ModuleId %> = true;
                    <%= FormTemplate.InitScript(TemplateSourceDirectory, PortalId) %>
                }
            })

            .find('.modal-dialog:first').css({
                width: '<%= AfSettings.PopupWidth %>px'
            });
            dnnsfjQuery('.modal-dialog:first').children().attr('style', '<%=AfSettings.Background %>');
            e && e.preventDefault();
        }

        function hideFormPopup<%=ModuleId %>() {
            dnnsfjQuery('#dnn<%= ModuleId %> popup').modal('hide')
        }

    </script>
</div>


<script type="text/javascript">

    dnnsfjQuery(function () {
        dnnsfjQuery(".af-init-onchange").each(function () {
            if (dnnsfjQuery(this).val())
                dnnsfjQuery(this).change();
        });

    });

</script>

