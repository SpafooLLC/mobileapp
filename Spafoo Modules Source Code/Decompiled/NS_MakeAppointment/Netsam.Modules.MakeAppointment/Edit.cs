using DotNetNuke.Services.Exceptions;
using System;

namespace Netsam.Modules.MakeAppointment
{
	public class Edit : MakeAppointmentModuleBase
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			try
			{
			}
			catch (Exception ex)
			{
				Exceptions.ProcessModuleLoadException(this, ex);
			}
		}
	}
}
