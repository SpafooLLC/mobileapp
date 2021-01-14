using DotNetNuke.Common.Utilities;
using Netsam.Modules.MakeAppointment.Data;
using Netsam.Modules.ServiceDashBoard.Components;
using System;
using System.Collections.Generic;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class BasicAppointmentInfo
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
				try
				{
					AppointmentController appointmentController = new AppointmentController();
					return appointmentController.GetBasicUserInfo(this.ClientID);
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
				try
				{
					AppointmentController appointmentController = new AppointmentController();
					return appointmentController.GetBasicUserInfo(this.ProviderID);
				}
				catch (Exception)
				{
					return new NS_UserInfo();
				}
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
