<%@ Control language="vb" CodeBehind="~/admin/Containers/container.vb" AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Containers.Container" %>
<%@ Register TagPrefix="dnn" TagName="SOLPARTACTIONS" Src="~/Admin/Containers/SolPartActions.ascx" %>
<div class="empty">
  <div class="action"><dnn:SOLPARTACTIONS runat="server" id="dnnSOLPARTACTIONS" /></div>
  <div id="ContentPane" runat="server" class="cbody"></div>
</div>

















