using DotNetNuke.Common;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Services.Exceptions;
using DotNetNuke.Services.Localization;
using System;
using DotNetNuke.Security;

namespace Netsam.Modules.MakeAppointment
{
	public class View : MakeAppointmentModuleBase, IActionable
    {
		public string MyScheduleTab
		{
			get
			{
				//IL_0001: Unknown result type (might be due to invalid IL or missing references)
				//IL_0006: Unknown result type (might be due to invalid IL or missing references)
				//IL_0007: Unknown result type (might be due to invalid IL or missing references)
				//IL_000c: Unknown result type (might be due to invalid IL or missing references)
				//IL_000d: Unknown result type (might be due to invalid IL or missing references)
				//IL_0014: Unknown result type (might be due to invalid IL or missing references)
				//IL_0019: Unknown result type (might be due to invalid IL or missing references)
				//IL_001a: Unknown result type (might be due to invalid IL or missing references)
				ModuleController val = new ModuleController();
				ModuleInfo val2 = new ModuleInfo();
				val2 = val.GetModuleByDefinition(0, "NS_ManageScheduledServices");
				return Globals.NavigateURL(val2.TabID);
			}
		}

		public string DashboardTab
		{
			get
			{
				//IL_0001: Unknown result type (might be due to invalid IL or missing references)
				//IL_0006: Unknown result type (might be due to invalid IL or missing references)
				//IL_0007: Unknown result type (might be due to invalid IL or missing references)
				//IL_000c: Unknown result type (might be due to invalid IL or missing references)
				//IL_000d: Unknown result type (might be due to invalid IL or missing references)
				//IL_0014: Unknown result type (might be due to invalid IL or missing references)
				//IL_0019: Unknown result type (might be due to invalid IL or missing references)
				//IL_001a: Unknown result type (might be due to invalid IL or missing references)
				ModuleController val = new ModuleController();
				ModuleInfo val2 = new ModuleInfo();
				val2 = val.GetModuleByDefinition(0, "NS_ServiceDashBoard");
				return Globals.NavigateURL(val2.TabID);
			}
		}

		public string MyProfileTab
		{
			get
			{
				//IL_0001: Unknown result type (might be due to invalid IL or missing references)
				//IL_0006: Unknown result type (might be due to invalid IL or missing references)
				//IL_0007: Unknown result type (might be due to invalid IL or missing references)
				//IL_000c: Unknown result type (might be due to invalid IL or missing references)
				//IL_000d: Unknown result type (might be due to invalid IL or missing references)
				//IL_0014: Unknown result type (might be due to invalid IL or missing references)
				//IL_0019: Unknown result type (might be due to invalid IL or missing references)
				//IL_001a: Unknown result type (might be due to invalid IL or missing references)
				ModuleController val = new ModuleController();
				ModuleInfo val2 = new ModuleInfo();
				val2 = val.GetModuleByDefinition(0, "NS_UserProfile");
				return Globals.NavigateURL(val2.TabID);
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

        protected void Page_Load(object sender, EventArgs e)
		{
			try
			{
				base.Session["NS_MA_Init"] = "1";
			}
			catch (Exception ex)
			{
				Exceptions.ProcessModuleLoadException(this, ex);
			}
		}
	}
}
