/*
' Copyright (c) 2016  Christoc.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System;
using System.Web.UI.WebControls;
using System.Web.UI;
using DotNetNuke.Security;
using DotNetNuke.Services.Exceptions;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Services.Localization;
using DotNetNuke.Entities.Users;

namespace Netsam.Modules.ServiceDashBoard
{
    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The View class displays the content
    /// 
    /// Typically your view control would be used to display content or functionality in your module.
    /// 
    /// View may be the only control you have in your project depending on the complexity of your module
    /// 
    /// Because the control inherits from NS_ServiceDashBoardModuleBase you have access to any custom properties
    /// defined there, as well as properties from DNN such as PortalId, ModuleId, TabId, UserId and many more.
    /// 
    /// </summary>
    /// -----------------------------------------------------------------------------
    public partial class View : ServiceDashBoardModuleBase, IActionable
    {

        public string MakeAppointmenTab
        {
            get
            {
                int _TabID = -1;
                string rValue = "-1";
                if (Settings["NS_SDB_MakeAppointmentTab"] != null)
                {
                    _TabID = int.Parse(Settings["NS_SDB_MakeAppointmentTab"].ToString());
                    rValue = DotNetNuke.Common.Globals.NavigateURL(_TabID);
                }
                return rValue;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (this.UserId != -1)
                {
                    // if currently logged in user is of type Host, then load UI for Manage Service
                    // so that host can add/ remove/ or change the service related information
                    if (this.UserInfo.IsInRole("ServicesAdmin") || (this.UserInfo.IsSuperUser))
                    {
                        AddManageService();
                    }
                    else
                    {
                        AddManageDashboard();
                    }
                    Session["SDB_Session"] = Session.SessionID;
                }
                else {
                    AddManageDashboard();
                }
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }
        private void AddManageService()
        {
            Control ctrlMember = new Control();
            ctrlMember = this.Page.LoadControl("~/desktopmodules/NS_ServiceDashBoard/uc/ManageServices.ascx");
            ctrlMember.ID = "ctrlManageService";
            NS_SDB_Outer.Controls.Clear();
            NS_SDB_Outer.Controls.Add(ctrlMember);
        }
        private void AddManageDashboard()
        {
            Control ctrlMember = new Control();
            ctrlMember = this.Page.LoadControl("~/desktopmodules/NS_ServiceDashBoard/uc/ManageDashboard.ascx");
            ctrlMember.ID = "ctrlManageDashboard";
            NS_SDB_Outer.Controls.Clear();
            NS_SDB_Outer.Controls.Add(ctrlMember);
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