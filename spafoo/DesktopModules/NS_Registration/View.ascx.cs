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
using DotNetNuke.Security;
using DotNetNuke.Services.Exceptions;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Services.Localization;
using DotNetNuke.Common.Lists;
using System.Web.UI.WebControls;
using System.Collections.Generic;
using DotNetNuke.Common.Lists;
using Netsam.Modules.NS_Registration.Components;
namespace Netsam.Modules.NS_Registration
{
    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The View class displays the content
    /// 
    /// Typically your view control would be used to display content or functionality in your module.
    /// 
    /// View may be the only control you have in your project depending on the complexity of your module
    /// 
    /// Because the control inherits from NS_RegistrationModuleBase you have access to any custom properties
    /// defined there, as well as properties from DNN such as PortalId, ModuleId, TabId, UserId and many more.
    /// 
    /// </summary>
    /// -----------------------------------------------------------------------------
    public partial class View : NS_RegistrationModuleBase, IActionable
    {

        public int TotalSteps
        {
            get
            {
                QuestionController oCtrl = new QuestionController();
                return oCtrl.GetTotalSteps();
            }
        }

        public string HomeTabUrl {
            get {
                return DotNetNuke.Common.Globals.NavigateURL(PortalSettings.HomeTabId);
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["NSR_Init"] = "1";
            if (Settings["NSR_ApproverRole"] != null) {
                int _RoleID = int.Parse( Settings["NSR_ApproverRole"].ToString());
                DotNetNuke.Security.Roles.RoleController oCtrl = new DotNetNuke.Security.Roles.RoleController();
                DotNetNuke.Security.Roles.RoleInfo oRoleInfo = oCtrl.GetRoleById(this.PortalId, _RoleID);
                if (oRoleInfo != null) {
                    if (UserInfo.IsInRole(oRoleInfo.RoleName))
                    {
                        pnlAdmin.Visible = true;
                        pnlUser.Visible = false;
                        ltUserScripts.Visible = false;
                        ltAdminScripts.Visible = true;
                        IList<DotNetNuke.Security.Roles.RoleInfo> lstRoles = oCtrl.GetRoles(this.PortalId);
                        ddlOnSelectRole.DataSource = lstRoles;
                        ddlOnSelectRole.DataTextField = "RoleName";
                        ddlOnSelectRole.DataValueField = "RoleID";
                        ddlOnSelectRole.DataBind();
                        ddlOnSelectRole.Items.Insert(0, new ListItem("Do Nothing", "-1",true));
                        
                        ddlEOnSelectRole.DataSource = lstRoles;
                        ddlEOnSelectRole.DataTextField = "RoleName";
                        ddlEOnSelectRole.DataValueField = "RoleID";
                        ddlEOnSelectRole.DataBind();
                        ddlEOnSelectRole.Items.Insert(0, new ListItem("Do Nothing", "-1", true));
                    }
                }
            }
            try
            {

                var controller = new ListController();
                var countryItems = controller.GetListEntryInfoItems("Country");
                var items = controller.GetListEntryInfoItems("Region", "Country.US");
                ddlState.DataTextField = "Text";
                ddlState.DataValueField = "Value";
                ddlState.DataSource = items;
                ddlState.DataBind();
                ddlState.Items.Insert(0, new ListItem("Select State", "-1"));
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
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