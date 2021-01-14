using DotNetNuke.Entities.Users;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class NS_UserInfo
	{
		public string DisplayName
		{
			get;
			set;
		}

		public string Email
		{
			get;
			set;
		}

		public string FirstName
		{
			get;
			set;
		}

		public string LastName
		{
			get;
			set;
		}

		public int PortalID
		{
			get;
			set;
		}

		public string Cell
		{
			get;
			set;
		}

		public UserProfile Profile
		{
			get;
			set;
		}
	}
}
