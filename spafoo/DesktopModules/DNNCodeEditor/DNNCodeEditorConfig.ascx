<%@ control language="C#" autoeventwireup="true" inherits="MediaANT.Modules.DNNCodeEditor.DNNCodeEditorConfig, App_Web_dnncodeeditorconfig.ascx.cac637dc" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/labelcontrol.ascx" %>
<style type="text/css">
  .frametable{margin-top:20px;}
  .caption{font-size: 12px; font-weight:bold;}
  .captions{width: 130px;}
  .smallinput{width: 60px;}
  .largeinput{width: 250px;}
  .menuimage{margin-left:5px; vertical-align:bottom;}
  #scrollTree{background-color: #ffffff; height:200px; width:253px; overflow:auto; border: solid 1px #A9A9A9;}
</style>

<table border="0" class="frametable Normal" cellpadding="2" cellspacing="2" width="500px">
  <tr>
    <td colspan="2">
      <asp:Label ID="lblFileManager" CssClass="caption" runat="server" />
    </td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblHiddenExtensions" runat="server" ControlName="lblHiddenExtensions" Suffix=":" /></td>
    <td><asp:TextBox ID="txtHiddenExtensions" runat="server" CssClass="largeinput Normal" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblRootDir" runat="server" ControlName="lblRootDir" Suffix=":" /></td>
    <td>
      <div id="scrollTree">
        <asp:TreeView ID="treeRootDir" runat="server" CssClass="Normal" NodeStyle-CssClass="Normal" OnClick="OnTreeItemClick()"
          SelectedNodeStyle-Font-Underline="true" SelectedNodeStyle-BackColor="#DFE5F2" EnableClientScript="true" EnableViewState="true">
        </asp:TreeView>
      </div><asp:Label ID="lblRootDirPath" CssClass="Normal" runat="server" />
    </td>
  </tr>
  <tr>
    <td colspan="2"><br />
      <asp:Label ID="lblEditorSize" CssClass="caption" runat="server" />
    </td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblEditorWidth" runat="server" ControlName="lblEditorWidth" Suffix=":" /></td>
    <td><asp:TextBox ID="txtEditorWidth" runat="server" CssClass="smallinput Normal" />&nbsp;px</td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblEditorHeight" runat="server" ControlName="lblEditorHeight" Suffix=":" /></td>
    <td><asp:TextBox ID="txtEditorHeight" runat="server" CssClass="smallinput Normal" />&nbsp;px</td>
  </tr>
  <tr>
    <td colspan="2"><br />
      <asp:Label ID="lblMenuItems" CssClass="caption" runat="server" />
    </td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuSave" runat="server" ControlName="lblMenuSave" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuSave" runat="server" Text="" CssClass="Normal" /><img id="imgMenuSave" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuSearch" runat="server" ControlName="lblMenuSearch" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuSearch" runat="server" Text="" CssClass="Normal" /><img id="imgMenuSearch" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuGoToLine" runat="server" ControlName="lblMenuGoToLine" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuGoToLine" runat="server" Text="" CssClass="Normal" /><img id="imgMenuGoToLine" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuUndo" runat="server" ControlName="lblMenuUndo" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuUndo" runat="server" Text="" CssClass="Normal" /><img id="imgMenuUndo" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuRedo" runat="server" ControlName="lblMenuRedo" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuRedo" runat="server" Text="" CssClass="Normal" /><img id="imgMenuRedo" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuFont" runat="server" ControlName="lblMenuFont" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuFont" runat="server" Text="" CssClass="Normal" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuSyntax" runat="server" ControlName="lblMenuSyntax" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuSyntax" runat="server" Text="" CssClass="Normal" />&nbsp;</td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuSmooth" runat="server" ControlName="lblMenuSmooth" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuSmooth" runat="server" Text="" CssClass="Normal" /><img id="imgMenuSmooth" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuHighlight" runat="server" ControlName="lblMenuHighlight" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuHighlight" runat="server" Text="" CssClass="Normal" /><img id="imgMenuHighlight" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuResetHighlight" runat="server" ControlName="lblMenuResetHighlight" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuResetHighlight" runat="server" Text="" CssClass="Normal" /><img id="imgMenuResetHighlight" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
  <tr>
    <td class="captions"><dnn:Label id="lblMenuHelp" runat="server" ControlName="lblMenuHelp" Suffix=":" /></td>
    <td><asp:CheckBox id="chkMenuHelp" runat="server" Text="" CssClass="Normal" /><img id="imgMenuHelp" runat="server" src="" alt="" class="menuimage" /></td>
  </tr>
</table>
<div align="center">
  <asp:LinkButton runat="server" ID="cmdUpdate" CssClass="CommandButton" OnClick="cmdUpdate_Click"></asp:LinkButton>&nbsp;
  <asp:LinkButton runat="server" ID="cmdCancel" CssClass="CommandButton" OnClick="cmdCancel_Click"></asp:LinkButton>
</div>
<asp:HiddenField ID="hiddenTreeScrollPos" runat="server" />