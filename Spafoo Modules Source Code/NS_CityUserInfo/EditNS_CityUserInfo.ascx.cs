using DotNetNuke.Common;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Exceptions;
using System;
namespace NS.Modules.NS_CityUserInfo
{
	internal class EditNS_CityUserInfo : PortalModuleBase
	{
		private int ItemId = Null.NullInteger;
		protected void Page_Load(object sender, EventArgs e)
		{
			try
			{
			}
			catch (Exception exc)
			{
				Exceptions.ProcessModuleLoadException(this, exc);
			}
		}
		protected void cmdCancel_Click(object sender, EventArgs e)
		{
			try
			{
				base.Response.Redirect(Globals.NavigateURL(), true);
			}
			catch (Exception exc)
			{
				Exceptions.ProcessModuleLoadException(this, exc);
			}
		}
		protected void cmdUpdate_Click(object sender, EventArgs e)
		{
			try
			{
				base.Response.Redirect(Globals.NavigateURL(), true);
			}
			catch (Exception exc)
			{
				Exceptions.ProcessModuleLoadException(this, exc);
			}
		}
		protected void cmdDelete_Click(object sender, EventArgs e)
		{
			try
			{
				if (!Null.IsNull(this.ItemId))
				{
				}
				base.Response.Redirect(Globals.NavigateURL(), true);
			}
			catch (Exception exc)
			{
				Exceptions.ProcessModuleLoadException(this, exc);
			}
		}
	}
}
