<%@ Control Language="C#" AutoEventWireup="True" Inherits="avt.ActionForm.FormPage" EnableViewState = "true" CodeBehind="Form.ascx.cs" %>

<div runat ="server" ID = "phTemplate"></div>

<div runat="server" id = "pnlMessage" visible="false" style="text-align: center; margin: 30px; color: #b94a48;">
    <div class="ui-state-highlight" style="padding: 20px; max-width: 400px; margin: auto;">
        <asp:Literal runat="server" ID = "lblMessage"></asp:Literal>
    </div>
</div>

<script type="text/javascript">

    dnnsfjQuery(document).ready(function () {
        dnnsfjQuery(".af-init-onchange").each(function () {
            if (dnnsfjQuery(this).val())
                dnnsfjQuery(this).change();
        });

        <%= FormTemplate.InitScript(TemplateSourceDirectory, PortalId) %>
    });

</script>
