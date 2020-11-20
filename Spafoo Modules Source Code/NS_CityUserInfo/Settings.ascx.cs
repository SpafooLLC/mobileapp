using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Exceptions;
using System;
namespace NS.Modules.NS_CityUserInfo
{
	public partial class Settings : ModuleSettingsBase
	{
		public override void LoadSettings()
		{
			try
			{
				if (!base.IsPostBack)
				{
				}
			}
			catch (Exception exc)
			{
				Exceptions.ProcessModuleLoadException(this, exc);
			}
		}
		public override void UpdateSettings()
		{
			try
			{
				ModuleController moduleController = new ModuleController();
			}
			catch (Exception exc)
			{
				Exceptions.ProcessModuleLoadException(this, exc);
			}
		}
	}
}
