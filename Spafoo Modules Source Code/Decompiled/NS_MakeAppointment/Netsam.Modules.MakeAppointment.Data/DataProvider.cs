using DotNetNuke.Common.Utilities;
using DotNetNuke.Framework.Providers;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Netsam.Modules.MakeAppointment.Data
{
	public abstract class DataProvider
	{
		private static DataProvider provider;

		public static DataProvider Instance()
		{
			if (DataProvider.provider == null)
			{
				Type type = Type.GetType("Netsam.Modules.MakeAppointment.Data.SqlDataprovider,NS_MakeAppointment", true, true);
				DataProvider.provider = (DataProvider)Activator.CreateInstance(type);
				DataCache.SetCache(type.FullName, (object)DataProvider.provider);
			}
			return DataProvider.provider;
		}

        public static IDbConnection GetConnection()
        {
            const string providerType = "data";
            ProviderConfiguration _providerConfiguration = ProviderConfiguration.GetProviderConfiguration(providerType);

            Provider objProvider = ((Provider)_providerConfiguration.Providers[_providerConfiguration.DefaultProvider]);
            string _connectionString;
            if (!String.IsNullOrEmpty(objProvider.Attributes["connectionStringName"]) && !String.IsNullOrEmpty(System.Configuration.ConfigurationManager.AppSettings[objProvider.Attributes["connectionStringName"]]))
            {
                _connectionString = System.Configuration.ConfigurationManager.AppSettings[objProvider.Attributes["connectionStringName"]];
            }
            else
            {
                _connectionString = objProvider.Attributes["connectionString"];
            }

            IDbConnection newConnection = new System.Data.SqlClient.SqlConnection();
            newConnection.ConnectionString = _connectionString.ToString();
            newConnection.Open();
            return newConnection;
        }

        public abstract IDataReader ListAllAppointmentByAny();

		public abstract IDataReader ListAppointmentByProvider(int UID);

		public abstract IDataReader ListAppointmentByClient(int UID);

		public abstract IDataReader ListServicesByAppointment(int AppointmentID);

		public abstract IDataReader GetAppointment(int AppointmentID);

		public abstract IDataReader GetAppointmentLocation(int AppointmentID);

		public abstract int AddProviderAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string PayTxnID, string CCNumber, string Expriry, string Comment, string oAuthTxn, int EditAppID, decimal Discount, string AnyProviderIDs);

		public abstract int AddUserLocation(string Address, string City, string State, string Zip);

		public abstract int AddServiceToAppointment(int AppointmentID, int ServiceID, int Qty, decimal Rate);

		public abstract void ClearAppServices(int AppointmentID);

		public abstract void UpdateAppointment(int ID, string Comments, string PaymentTxnID);

		public abstract void UpdateAppointmentStatus(int ID, int Status);

		public abstract int AcceptAppointment(int ProviderID, int AppID);

		public abstract void Unavailable4App(int ProviderID, int AppID);

		public abstract void UpdateAppSeenStatus(int ID);

		public abstract void UpdateAppBasicInfo(int AppID, int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string Comment);

		public abstract void RemoveApp(int AppID);

		public abstract void HideApp4Me(int AppID, string UserType);

		public abstract bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime);

		public abstract bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime, int AppID);

		public abstract IDataReader GetProOccupiedSlots(int ProviderID, string FromDate, string ToDate);

		public abstract bool CanSetAvailability(int ProID, string StartDateTime, string EndDateTime);

		public abstract IDataReader GetUsersInRole(string RoleName, int CP, int RPP);

		public abstract int AddRating(int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID, int AppID);

		public abstract int AddUserReview(int ByUserID, int ToUserID, string ILike, string IDLike, string Comments, int DisplayNameAs, int AppID);

		public abstract IDataReader ListRating(int RatingFilterType);

		public abstract bool DidIRated(int ByUserId, int AppID);

		public abstract void AddUserPaymentProfile(int UserID, string ProfileID);

		public abstract void DeleteUserPaymentProfile(int UserID, string ProfileID);

		public abstract IDataReader GetPaymentProfile(int UserID);

		public abstract IDataReader GetUserBasicInfo(int UserID);

		public abstract void AddAppointmentPhoto(int UserID, int AID, string FilePath);

		public abstract void RemoveAppointmentPhoto(int FileID);

		public abstract IDataReader ListAppointmentPhotos(int AppointmentID);

		public abstract int AddNotification(int ByID, int ToID, int NotTypeID, int Privacy, int RelatedEntityID);

		public abstract void RemoveNotification(int NotID);

		public abstract IDataReader GetMyNotifications(int MyUserID);

		public abstract IDataReader GetAdminNotifications(int Page, int RecsPerPage);

		public abstract void RemoveNotificationByUser(int UserID);

		public abstract void UpdateNotificationStatus(int AppID);

		public abstract IDataReader GetOrderWithIn(int Hrs);
	}
}
