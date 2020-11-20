﻿/*
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

namespace Netsam.Modules.ManageScheduledServices
{
    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The View class displays the content
    /// 
    /// Typically your view control would be used to display content or functionality in your module.
    /// 
    /// View may be the only control you have in your project depending on the complexity of your module
    /// 
    /// Because the control inherits from NS_ManageScheduledServicesModuleBase you have access to any custom properties
    /// defined there, as well as properties from DNN such as PortalId, ModuleId, TabId, UserId and many more.
    /// 
    /// </summary>
    /// -----------------------------------------------------------------------------
    public partial class View : NS_ScheduledServicesModuleBase, IActionable
    {
        public string AppointmentTab
        {
            get
            {
                ModuleController mc = new ModuleController();
                ModuleInfo mi = new ModuleInfo();
                mi = mc.GetModuleByDefinition(0, "NS_MakeAppointment");
                return DotNetNuke.Common.Globals.NavigateURL(mi.TabID);
            }
        }
        public string AppHomeTab
        {
            get
            {
                return DotNetNuke.Common.Globals.NavigateURL(PortalSettings.HomeTabId);
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (this.UserId != -1)
                {
                    if (this.UserInfo.IsInRole("Providers"))
                    {
                        AddManageProvider();
                        Session["MSS_Session"] = Session.SessionID;
                    }
                    if (this.UserInfo.IsInRole("Clients"))
                    {
                        AddManageClient();
                    }
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
            ctrlMember = this.Page.LoadControl("~/desktopmodules/NS_ManageScheduledServices/uc/ucManageProvider.ascx");
            ctrlMember.ID = "ctrlManageService";
            pnlOuter.Controls.Clear();
            pnlOuter.Controls.Add(ctrlMember);
        }

        private void AddManageClient()
        {
            Control ctrlMember = new Control();
            ctrlMember = this.Page.LoadControl("~/desktopmodules/NS_ManageScheduledServices/uc/ucManageClient.ascx");
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