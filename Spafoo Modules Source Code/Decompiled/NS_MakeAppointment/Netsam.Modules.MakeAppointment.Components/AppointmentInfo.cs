using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Users;
using Netsam.Modules.MakeAppointment.Data;
using Netsam.Modules.ServiceDashBoard.Components;
using System;
using System.Collections.Generic;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class AppointmentInfo
	{
		public int AppointmentID
		{
			get;
			set;
		}

		public NS_UserInfo ClientInfo
		{
			get
			{
				//IL_0002: Unknown result type (might be due to invalid IL or missing references)
				//IL_0007: Unknown result type (might be due to invalid IL or missing references)
				//IL_0008: Unknown result type (might be due to invalid IL or missing references)
				//IL_0010: Unknown result type (might be due to invalid IL or missing references)
				//IL_0015: Unknown result type (might be due to invalid IL or missing references)
				//IL_001d: Unknown result type (might be due to invalid IL or missing references)
				//IL_002a: Unknown result type (might be due to invalid IL or missing references)
				//IL_0037: Unknown result type (might be due to invalid IL or missing references)
				//IL_0044: Unknown result type (might be due to invalid IL or missing references)
				//IL_0051: Unknown result type (might be due to invalid IL or missing references)
				//IL_0052: Unknown result type (might be due to invalid IL or missing references)
				//IL_005e: Unknown result type (might be due to invalid IL or missing references)
				try
				{
					UserController val = new UserController();
					UserInfo user = val.GetUser(0, this.ClientID);
					NS_UserInfo nS_UserInfo = new NS_UserInfo();
					nS_UserInfo.DisplayName = user.DisplayName;
					nS_UserInfo.FirstName = user.FirstName;
					nS_UserInfo.LastName = user.LastName;
					nS_UserInfo.Email = user.Email;
					nS_UserInfo.Profile = user.Profile;
					nS_UserInfo.PortalID = user.PortalID;
					return nS_UserInfo;
				}
				catch (Exception)
				{
					return new NS_UserInfo();
				}
			}
		}

		public NS_UserInfo ProviderInfo
		{
			get
			{
				//IL_0001: Unknown result type (might be due to invalid IL or missing references)
				//IL_0006: Unknown result type (might be due to invalid IL or missing references)
				//IL_0007: Unknown result type (might be due to invalid IL or missing references)
				//IL_000c: Unknown result type (might be due to invalid IL or missing references)
				//IL_0014: Unknown result type (might be due to invalid IL or missing references)
				//IL_001c: Unknown result type (might be due to invalid IL or missing references)
				//IL_0021: Unknown result type (might be due to invalid IL or missing references)
				//IL_0023: Unknown result type (might be due to invalid IL or missing references)
				//IL_0030: Unknown result type (might be due to invalid IL or missing references)
				//IL_003d: Unknown result type (might be due to invalid IL or missing references)
				//IL_004a: Unknown result type (might be due to invalid IL or missing references)
				//IL_0057: Unknown result type (might be due to invalid IL or missing references)
				//IL_0058: Unknown result type (might be due to invalid IL or missing references)
				//IL_0064: Unknown result type (might be due to invalid IL or missing references)
				UserController val = new UserController();
				UserInfo val2 = new UserInfo();
				NS_UserInfo nS_UserInfo = new NS_UserInfo();
				try
				{
					val2 = val.GetUser(0, this.ProviderID);
					nS_UserInfo.DisplayName = val2.DisplayName;
					nS_UserInfo.FirstName = val2.FirstName;
					nS_UserInfo.LastName = val2.LastName;
					nS_UserInfo.Email = val2.Email;
					nS_UserInfo.Profile = val2.Profile;
					nS_UserInfo.PortalID = val2.PortalID;
				}
				catch (Exception)
				{
				}
				return nS_UserInfo;
			}
		}

		public string PayProfileID
		{
			get;
			set;
		}

		public string CustomerProfileID
		{
			get;
			set;
		}

		public string PayTxnID
		{
			get;
			set;
		}

		public string AuthTxnID
		{
			get;
			set;
		}

		public int ClientID
		{
			get;
			set;
		}

		public int ProviderID
		{
			get;
			set;
		}

		public string ForDate
		{
			get;
			set;
		}

		public DateTime OrderDate
		{
			get;
			set;
		}

		public string AtTime
		{
			get;
			set;
		}

		public string EndTime
		{
			get;
			set;
		}

		public string Comments
		{
			get;
			set;
		}

		public int Status
		{
			get;
			set;
		}

		public int SeenStatus
		{
			get;
			set;
		}

		public int AddressID
		{
			get;
			set;
		}

		public int HasNotified
		{
			get;
			set;
		}

		public List<ServiceInfo> Services
		{
			get
			{
				AppointmentController appointmentController = new AppointmentController();
				return CBO.FillCollection<ServiceInfo>(DataProvider.Instance().ListServicesByAppointment(this.AppointmentID));
			}
		}

		public ClientLocation Location
		{
			get
			{
				AppointmentController appointmentController = new AppointmentController();
				return CBO.FillObject<ClientLocation>(DataProvider.Instance().GetAppointmentLocation(this.AppointmentID));
			}
		}

		public decimal Amount
		{
			get;
			set;
		}

		public string CCNumber
		{
			get;
			set;
		}

		public string Expiry
		{
			get;
			set;
		}

		public decimal Discount
		{
			get;
			set;
		}
	}
}
