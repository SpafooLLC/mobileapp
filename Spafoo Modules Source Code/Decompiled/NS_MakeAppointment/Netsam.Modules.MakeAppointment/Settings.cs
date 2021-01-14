using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Exceptions;
using System;
using System.Web.UI;

namespace Netsam.Modules.MakeAppointment
{
	public class Settings : MakeAppointmentModuleSettingsBase
	{
        public override void LoadSettings()
        {
            try
            {
                if (Page.IsPostBack == false)
                {
                    //Check for existing settings and use those on this page
                    //Settings["SettingName"]

                    /* uncomment to load saved settings in the text boxes
                    if(Settings.Contains("Setting1"))
                        txtSetting1.Text = Settings["Setting1"].ToString();
			
                    if (Settings.Contains("Setting2"))
                        txtSetting2.Text = Settings["Setting2"].ToString();

                    //*/
                    //string rVal = DotNetNuke.Entities.Controllers.HostController.Instance.GetString("NS_WithInMile");
                    //if (rVal != "")
                    //{
                    //    txtWithInMile.Text = rVal;
                    //}
                    //else
                    //{
                    //    txtWithInMile.Text = "30";
                    //}
                }
            }
            catch (Exception exc) //Module failed to load
            {
                Exceptions.ProcessModuleLoadException(this, exc);
            }
        }

        public override void UpdateSettings()
		{
			//IL_0002: Unknown result type (might be due to invalid IL or missing references)
			//IL_0007: Unknown result type (might be due to invalid IL or missing references)
			try
			{
				ModuleController val = new ModuleController();
			}
			catch (Exception ex)
			{
				Exceptions.ProcessModuleLoadException(this, ex);
			}
		}
	}
}
