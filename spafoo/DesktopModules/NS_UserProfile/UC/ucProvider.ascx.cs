using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Netsam.Modules.NS_UserProfile.Components;
using DotNetNuke.Entities.Modules;
namespace Netsam.Modules.NS_UserProfile.UC
{
    public partial class ucProvider : NS_UserProfileModuleBase
    {
        public string GetUnseenCount
        {

            get
            {

                NS_ProfileController octrl = new NS_ProfileController();
                return octrl.GetUnseenCount(this.UserId).ToString();
            }
        }
        public string MyScheduleTab
        {
            get
            {
                ModuleController mc = new ModuleController();
                ModuleInfo mi = new ModuleInfo();
                mi = mc.GetModuleByDefinition(0, "NS_ManageScheduledServices");
                return DotNetNuke.Common.Globals.NavigateURL(mi.TabID);
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}