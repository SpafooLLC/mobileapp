using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Users;
using Netsam.Modules.MakeAppointment.Data;
using System;
using System.Collections.Generic;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class AppointmentController
	{
		public NS_UserInfo GetBasicUserInfo(int UserID)
		{
			return CBO.FillObject<NS_UserInfo>(DataProvider.Instance().GetUserBasicInfo(UserID));
		}

		public int AddLocation(string Address, string City, string State, string Zip)
		{
			return DataProvider.Instance().AddUserLocation(Address, City, State, Zip);
		}

		public int AddAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string PayTxnID, string CCNumber, string Expriry, string Comment, string PayProfileID, int EditAppID, decimal Discount, string AnyProviderIds)
		{
			return DataProvider.Instance().AddProviderAppointment(ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, PayTxnID, CCNumber, Expriry, Comment, PayProfileID, EditAppID, Discount, AnyProviderIds);
		}

		public int AddServiceToAppointment(int AppointmentID, int ServiceID, int Qty, decimal Rate)
		{
			return DataProvider.Instance().AddServiceToAppointment(AppointmentID, ServiceID, Qty, Rate);
		}

		public void ClearAppServices(int AppointmentID)
		{
			DataProvider.Instance().ClearAppServices(AppointmentID);
		}

		public List<AppointmentInfo> ListAllAppointmentByAny()
		{
			return CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().ListAllAppointmentByAny());
		}

		public List<BasicAppointmentInfo> ListAllBasicAppointmentByAny()
		{
			return CBO.FillCollection<BasicAppointmentInfo>(DataProvider.Instance().ListAllAppointmentByAny());
		}

		public List<AppointmentInfo> ListAppointmentByProvider(int UID)
		{
			try
			{
				return CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().ListAppointmentByProvider(UID));
			}
			catch (Exception)
			{
				return new List<AppointmentInfo>();
			}
		}

		public List<AppointmentInfo> ListAppointmentByClient(int UID)
		{
			return CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().ListAppointmentByClient(UID));
		}

		public AppointmentInfo GetAppointment(int ID)
		{
			return CBO.FillObject<AppointmentInfo>(DataProvider.Instance().GetAppointment(ID));
		}

		public BasicAppointmentInfo GetBasicAppointment(int ID)
		{
			return CBO.FillObject<BasicAppointmentInfo>(DataProvider.Instance().GetAppointment(ID));
		}

		public ClientLocation GetAppLocation(int AppID)
		{
			AppointmentController appointmentController = new AppointmentController();
			return CBO.FillObject<ClientLocation>(DataProvider.Instance().GetAppointmentLocation(AppID));
		}

		public void UpdateAppointment(int ID, string Comments, string PaymentTxnID)
		{
			DataProvider.Instance().UpdateAppointment(ID, Comments, PaymentTxnID);
		}

		public void UpdateAppointmentStatus(int ID, int Status)
		{
			DataProvider.Instance().UpdateAppointmentStatus(ID, Status);
		}

		public int AcceptAppointment(int ProviderID, int AppID)
		{
			return DataProvider.Instance().AcceptAppointment(ProviderID, AppID);
		}

		public void Unavailable4App(int ProviderID, int AppID)
		{
			DataProvider.Instance().Unavailable4App(ProviderID, AppID);
		}

		public void UpdateAppSeenStatus(int AppID)
		{
			DataProvider.Instance().UpdateAppSeenStatus(AppID);
		}

		public void UpdateAppBasicInfo(int AppID, int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string Comment)
		{
			DataProvider.Instance().UpdateAppBasicInfo(AppID, ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, Comment);
		}

		public void RemoveApp(int AppID)
		{
			DataProvider.Instance().RemoveApp(AppID);
		}

		public void HideApp4Me(int AppID, string UserType)
		{
			DataProvider.Instance().HideApp4Me(AppID, UserType);
		}

		public void AddAppointmentPhoto(int UserID, int AppointmentID, string FilePath)
		{
			DataProvider.Instance().AddAppointmentPhoto(UserID, AppointmentID, FilePath);
		}

		public void RemoveAppointmentPhoto(int FileID)
		{
			DataProvider.Instance().RemoveAppointmentPhoto(FileID);
		}

		public List<AppointmentPhotoInfo> ListAppointmentPhotos(int AppointmentID)
		{
			return CBO.FillCollection<AppointmentPhotoInfo>(DataProvider.Instance().ListAppointmentPhotos(AppointmentID));
		}

		public bool DidIRated(int ByUserID, int AppID)
		{
			return DataProvider.Instance().DidIRated(ByUserID, AppID);
		}

		public bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime)
		{
			return DataProvider.Instance().IsProviderSlotFree(ProID, StartDateTime, EndDateTime);
		}

		public bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime, int AppID)
		{
			return DataProvider.Instance().IsProviderSlotFree(ProID, StartDateTime, EndDateTime, AppID);
		}

		public List<AppointmentInfo> GetProOccupiedSlots(int ProviderID, string fromDate, string toDate)
		{
			return CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().GetProOccupiedSlots(ProviderID, fromDate, toDate));
		}

		public bool CanSetAvailability(int ProID, string StartDateTime, string EndDateTime)
		{
			return DataProvider.Instance().CanSetAvailability(ProID, StartDateTime, EndDateTime);
		}

		public List<UserInfo> GetUsersInRole(string RN, int CP, int RPP)
		{
			return CBO.FillCollection<UserInfo>(DataProvider.Instance().GetUsersInRole(RN, CP, RPP));
		}
	}
}
