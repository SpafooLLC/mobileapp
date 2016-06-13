<%@ control language="C#" autoeventwireup="true" inherits="MediaANT.Modules.DNNCodeEditor.DNNCodeEditorView, App_Web_dnncodeeditorview.ascx.cac637dc" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/labelcontrol.ascx" %>
<style type="text/css">
  #filemanager_frame{border: solid #888 1px; margin-bottom:5px; width:650px;}
  #filemanager_tree{border-right: solid #888 1px; background-color:#ffffff}
  #filemanager_files{background-color:#ffffff}
  #filemanager_toolbar{border-bottom: solid #888 1px; background-color: #ECE9D8;}
  .filemanager_statusbar{border-top: solid #888 1px; background-color: #ECE9D8;}
  #fileuploader{float:right; vertical-align:middle;}
  .menuseperator{height:16px; width:1px; margin-left:5px; margin-right:2px; background-color: #C0C0BB;}
  .menuhover{border: solid #0A246A 1px; background-color: #B6BDD2; cursor: pointer; padding: 0px 2px 3px 2px; text-decoration: none;}
  .menubutton{border: solid #ECE9D8 1px; background-color: #ECE9D8; cursor: pointer; padding: 0px 2px 3px 2px;}
  .menulabel{padding-left:2px; text-decoration: none;}
  .fileimage{margin-right:3px; margin-top:2px;margin-bottom:2px;}
  .filelink{cursor:pointer;}
</style>
<table class="Normal" cellspacing="0" cellpadding="2" width="1px" border="0">
<tr>
  <td colspan="2">
    <div id="filemanager_frame">
      <table class="Normal" cellspacing="0" cellpadding="2" width="100%" border="0">
        <tr>
          <td colspan="2" id="filemanager_toolbar">
            <asp:LinkButton ID="cmdAddDirectory" runat="server" CssClass="menubutton">
              <asp:Image ID="imgAddDirectory" runat="server" />
            </asp:LinkButton>
            
            <asp:TextBox ID="txtAddFolder" CssClass="Normal" runat="server" Width="128px"></asp:TextBox>&nbsp;
            
            <asp:LinkButton ID="cmdDeleteDirectory" runat="server" CssClass="menubutton" OnClientClick="return OnDeleteDirectoryClick();">
              <asp:Image ID="imgDeleteDirectory" runat="server" />
            </asp:LinkButton><span id="space1" style="width:5px;"></span><span class="menuseperator" ></span>
            
            <asp:LinkButton ID="cmdRefresh" runat="server" CssClass="menubutton">
              <asp:Image ID="imgRefresh" runat="server" />
              <asp:Label ID="lblRefresh" runat="server" CssClass="menulabel"></asp:Label>
            </asp:LinkButton><span class="menuseperator" ></span>
            
            <asp:LinkButton ID="cmdCutFiles" runat="server" CssClass="menubutton">
              <asp:Image ID="imgCutFiles" runat="server" />
              <asp:Label ID="lblCutFiles" runat="server" CssClass="menulabel"></asp:Label>
            </asp:LinkButton>
            
            <asp:LinkButton ID="cmdCopyFiles" runat="server" CssClass="menubutton">
              <asp:Image ID="imgCopyFiles" runat="server" />
              <asp:Label ID="lblCopyFiles" runat="server" CssClass="menulabel"></asp:Label>
            </asp:LinkButton>&nbsp;
            
            <asp:LinkButton ID="cmdPasteFiles" runat="server" CssClass="menubutton">
              <asp:Image ID="imgPasteFiles" runat="server" />
              <asp:Label ID="lblPasteFiles" runat="server" CssClass="menulabel"></asp:Label>
            </asp:LinkButton><span class="menuseperator" ></span>
            
            <asp:LinkButton ID="cmdDeleteFiles" runat="server" CssClass="menubutton" OnClientClick="return OnDeleteFilesClick()">
              <asp:Image ID="imgDeleteFiles" runat="server" />
              <asp:Label ID="lblDeleteFiles" runat="server" CssClass="menulabel"></asp:Label>
            </asp:LinkButton>&nbsp;
          </td>
        </tr>
        <tr>
          <td width="30%" valign="top" id="filemanager_tree" rowspan="2">
            <div id="scrollTree" style="height: 260px; overflow: auto">
              <asp:TreeView ID="treeFileManager" runat="server" CssClass="Normal" NodeStyle-CssClass="Normal" OnClick="OnTreeItemClick()"
                  SelectedNodeStyle-BackColor="#DFE5F2" ShowLines="false" EnableClientScript="true" >
              </asp:TreeView>
            </div>
          </td>
          <td valign="top" width="80%" id="filemanager_files">
            <asp:DataGrid ID="gridFileManager" runat="server" CellSpacing="0" CellPadding="0" Width="100%"  
              AutoGenerateColumns="False" EnableViewState="true" CssClass="Normal" BorderStyle="none" BorderWidth="0" 
              AlternatingItemStyle-BackColor="#F5F5F5" SelectedItemStyle-BackColor="#DFE5F2" 
              HeaderStyle-BackColor="#dcdcdc" HeaderStyle-Height="20px" ItemStyle-Height="20px"  
              AllowPaging="true" PageSize="10">
              <Columns>
                <asp:TemplateColumn HeaderStyle-Width="1%">
                  <ItemTemplate>
                    <asp:CheckBox ID="chkChecked" runat="server"></asp:CheckBox>
                  </ItemTemplate>
                </asp:TemplateColumn>
                
                <asp:TemplateColumn HeaderText="FileName" SortExpression="fileName" HeaderStyle-Width="420">
                  <ItemTemplate>
                    <asp:LinkButton ID="cmdFileName" runat="server" CssClass="filelink" CommandName="Select">
                      <asp:ImageButton ID="imgFileName" runat="server" CssClass="fileimage" BorderWidth="0" BorderStyle="None" CommandName="Select" />
                      <asp:Label ID="lblFileName" runat="server" Height="18px" BorderWidth="0" CssClass="Normal" />
                    </asp:LinkButton>
                  </ItemTemplate>
                  <EditItemTemplate>
                    <asp:ImageButton ID="imgFileName" runat="server" BorderWidth="0" BorderStyle="None" />
                    <asp:TextBox ID="txtEditName" runat="server" CssClass="Normal" Text='<% # DataBinder.Eval(Container.DataItem,"filename")%>' />
                  </EditItemTemplate>
                </asp:TemplateColumn>
                
                <asp:TemplateColumn HeaderText="Size(Kb)" SortExpression="Size" HeaderStyle-Width="60px">
                  <ItemTemplate>
                    <asp:Label ID="Size" runat="server" Text='<%# DataBinder.Eval(Container.DataItem,"Size") %>'></asp:Label>
                  </ItemTemplate>
                  <HeaderStyle HorizontalAlign="Center" />
                  <ItemStyle HorizontalAlign="Center" />
                </asp:TemplateColumn>
                
                <asp:TemplateColumn HeaderStyle-Width="1" ItemStyle-Width="22px">
                  <ItemTemplate>
                    <asp:LinkButton ID="cmdUnzipFile" runat="server" CommandName="Unzip">
                      <asp:Image ID="imgUnzipFile" runat="server" />
                    </asp:LinkButton>
                  </ItemTemplate>
                  <ItemStyle HorizontalAlign="left"></ItemStyle>
                </asp:TemplateColumn>
                
                <asp:TemplateColumn HeaderStyle-Width="1" ItemStyle-Width="22px">
                  <ItemTemplate>
                    <asp:LinkButton ID="cmdRenameFile" runat="server" CommandName="Edit">
                      <asp:Image ID="imgRenameFile" runat="server" />
                    </asp:LinkButton>
                  </ItemTemplate>
                  <EditItemTemplate>
                    <asp:LinkButton ID="cmdUpdateFile" runat="server" CommandName="Update">
                      <asp:Image ID="imgUpdateFile" runat="server" /></asp:LinkButton>&nbsp;
                  </EditItemTemplate>
                </asp:TemplateColumn>
                
                <asp:TemplateColumn HeaderStyle-Width="1" ItemStyle-Width="22px">
                  <ItemTemplate>
                    <asp:LinkButton ID="cmdDeleteFile" runat="server" CommandName="Delete" OnClientClick="return OnDeleteFileClick();">
                      <asp:Image ID="imgDeleteFile" runat="server" />
                    </asp:LinkButton>
                  </ItemTemplate>
                  <EditItemTemplate>
                    <asp:LinkButton ID="cmdCancelFile" runat="server" CommandName="Cancel" CausesValidation="false">
                      <asp:Image ID="imgCancelFile" runat="server" />
                    </asp:LinkButton>&nbsp;
                  </EditItemTemplate>
                  <ItemStyle HorizontalAlign="left"></ItemStyle>
                </asp:TemplateColumn>
                
                <asp:TemplateColumn HeaderStyle-Width="1" ItemStyle-Width="22px">
                  <ItemTemplate>
                     <a href="<%# GetDownloadPath(DataBinder.Eval(Container.DataItem,"linkpath").ToString()) %>" >
                        <asp:Image ID="imgDownloadFile" runat="server"  />
                     </a>
                  </ItemTemplate>
                  <EditItemTemplate>
                  </EditItemTemplate>
                  <ItemStyle HorizontalAlign="left"></ItemStyle>
                </asp:TemplateColumn>
                
                <asp:BoundColumn DataField="Date" SortExpression="Date" ReadOnly="True" HeaderText="Date">
                  <HeaderStyle HorizontalAlign="Center"></HeaderStyle>
                  <ItemStyle HorizontalAlign="Center"></ItemStyle>
                </asp:BoundColumn>
              
              </Columns>
              <PagerStyle Visible="false" />
            </asp:DataGrid>
            
          </td>
        </tr>
        <tr>
          <td valign="bottom" align="right" style="background-color:#ffffff">
            <table cellspacing="0" cellpadding="0" border="0">
              <tr valign="middle">
                <td width="23"><asp:ImageButton id="cmdNavFirst" runat="server" /></td>
                <td width="23"><asp:ImageButton id="cmdNavPrevious" runat="server" /></td>
                <td width="23"><asp:ImageButton id="cmdNavNext" runat="server" /></td>
                <td width="23"><asp:ImageButton id="cmdNavLast" runat="server" /></td>
              </tr>
            </table>
	        </td>
        </tr>
        <tr>
          <td class="filemanager_statusbar">
            <asp:Label id="lblCounter" runat="server"></asp:Label>
          </td>
          <td class="filemanager_statusbar">
            <span id="fileuploader">
              <asp:Label id="lblUploadFile" multiple runat="server" CssClass="Normal"></asp:Label>
              <asp:FileUpload id="uploadUploadFile" multiple runat="server" CssClass="Normal" Width="350px" />&nbsp;
              <asp:ImageButton id="cmdUploadFile" runat="server" CommandName="Upload" />&nbsp;
            </span>
          </td>
        </tr>
        <tr>
          <td  class="filemanager_statusbar">
            <asp:Label ID="lblSpaceUsed" runat="server" CssClass="Normal" />
          </td>
          <td class="filemanager_statusbar">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2" class="filemanager_statusbar" style="height:1px">
            <asp:Label ID="lblError" runat="server" ForeColor="red" />
          </td>
        </tr>
      </table>
    </div>

  </td>
</tr>
<tr>
  <td colspan="2">
    <asp:TextBox ID="txtEditor" runat="server" Rows="10" TextMode="MultiLine" />
    <br />
    <asp:Panel ID="pnlImageEditor" ScrollBars="Auto" runat="server" >
      <asp:Image ID="imgImageEditor" runat="server" />
    </asp:Panel>
  </td>
</tr>
</table>
<asp:HiddenField ID="hiddenEditor" runat="server" />
<asp:HiddenField ID="hiddenTreeScrollPos" runat="server" />
