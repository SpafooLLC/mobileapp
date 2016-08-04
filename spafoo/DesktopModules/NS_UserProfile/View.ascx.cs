/*
' Copyright (c) 2016  Netsam.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/
using System.Web.UI.WebControls;
using System.Web.UI;
using System;
using DotNetNuke.Security;
using DotNetNuke.Services.Exceptions;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Services.Localization;
using DotNetNuke.Services.FileSystem;

namespace Netsam.Modules.NS_UserProfile
{
    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The View class displays the content
    /// 
    /// Typically your view control would be used to display content or functionality in your module.
    /// 
    /// View may be the only control you have in your project depending on the complexity of your module
    /// 
    /// Because the control inherits from NS_UserProfileModuleBase you have access to any custom properties
    /// defined there, as well as properties from DNN such as PortalId, ModuleId, TabId, UserId and many more.
    /// 
    /// </summary>
    /// -----------------------------------------------------------------------------
    public partial class View : NS_UserProfileModuleBase, IActionable
    {
        public string AppHomeTab
        {
            get
            {
                return DotNetNuke.Common.Globals.NavigateURL(PortalSettings.HomeTabId);
            }
        }

        public string UploadWorkSamplePath
        {
            get
            { // Provider work sample upload folder
                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, this.UserId);
                DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);
                string DNNUploadPath = "/Portals/0/" + userFolder.FolderPath + "/WorkSamples";
                return DNNUploadPath;
            }
        }
        public string UploadProfilePicPath
        {
            get
            { // Provider work sample upload folder
                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, this.UserId);
                DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);
                string DNNUploadPath = "/Portals/0/" + userFolder.FolderPath;
                return DNNUploadPath;
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                Session["NS_UP_Session"] = Session.SessionID;
                Session["NS_UP_UserSession"] = this.UserId;
                if (this.UserInfo.IsInRole("Providers"))
                {
                    AddManageProvider();
                    
                }
                if (this.UserInfo.IsInRole("Clients"))
                {
                    AddManageClient();
                }
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }

        private void AddManageProvider()
        {
            Control ctrlMember = new Control();
            ctrlMember = this.Page.LoadControl("~/desktopmodules/NS_UserProfile/uc/ucProvider.ascx");
            ctrlMember.ID = "ctrlManageService";
            pnlOuter.Controls.Clear();
            pnlOuter.Controls.Add(ctrlMember);
        }

        private void AddManageClient()
        {
            Control ctrlMember = new Control();
            ctrlMember = this.Page.LoadControl("~/desktopmodules/NS_UserProfile/uc/ucClient.ascx");
            ctrlMember.ID = "ctrlManageService";
            pnlOuter.Controls.Clear();
            pnlOuter.Controls.Add(ctrlMember);
        }
        public ModuleActionCollection ModuleActions
        {
            get
            {
                var actions = new ModuleActionCollection
                    {
                        {
                            GetNextActionID(), Localization.GetString("EditModule", LocalResourceFile), "", "", "",
                            EditUrl(), false, SecurityAccessLevel.Edit, true, false
                        }
                    };
                return actions;
            }
        }
    }
}