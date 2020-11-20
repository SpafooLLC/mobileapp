/*
' Copyright (c) 2016 Christoc.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System.Data;
using System;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Framework.Providers;


namespace Netsam.Modules.MakeAppointment.Data
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// An abstract class for the data access layer
    /// 
    /// The abstract data provider provides the methods that a control data provider (sqldataprovider)
    /// must implement. You'll find two commented out examples in the Abstract methods region below.
    /// </summary>
    /// -----------------------------------------------------------------------------
    public abstract class DataProvider
    {

        #region Shared/Static Methods

        private static DataProvider provider;

        // return the provider
        public static DataProvider Instance()
        {
            if (provider == null)
            {
                const string assembly = "Netsam.Modules.MakeAppointment.Data.SqlDataprovider,NS_MakeAppointment";
                Type objectType = Type.GetType(assembly, true, true);

                provider = (DataProvider)Activator.CreateInstance(objectType);
                DataCache.SetCache(objectType.FullName, provider);
            }

            return provider;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "Not returning class state information")]
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

        #endregion

        #region Abstract Appointment methods

        //public abstract IDataReader GetItems(int userId, int portalId);

        //public abstract IDataReader GetItem(int itemId);        
        public abstract IDataReader ListAppointmentByProvider(int UID);
        
        public abstract IDataReader ListAppointmentByClient(int UID);
        
        public abstract IDataReader ListServicesByAppointment(int AppointmentID);
        
        public abstract IDataReader GetAppointment(int AppointmentID);
        
        public abstract IDataReader GetAppointmentLocation(int AppointmentID);

        public abstract int AddProviderAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime,string PayTxnID, string CCNumber, string Expriry,string Comment,string oAuthTxn,int EditAppID,decimal Discount);

        public abstract int AddUserLocation(string Address, string City, string State, string Zip);
      //  public abstract void UpdateLocationAppointment(int AddressID, int AppointmentID);

        public abstract int AddServiceToAppointment(int AppointmentID, int ServiceID, int Qty, decimal Rate);
        public abstract void ClearAppServices(int AppointmentID);
        public abstract void UpdateAppointment(int ID, string Comments, string PaymentTxnID);
        public abstract void UpdateAppointmentStatus(int ID, int Status);

        public abstract void UpdateAppSeenStatus(int ID);
        public abstract void UpdateAppBasicInfo(int AppID, int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime,string Comment);
        public abstract void RemoveApp(int AppID);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AppID">ID of Appointment</param>
        /// <param name="UserType">P -  Provider, C - Client</param>
        public abstract void HideApp4Me(int AppID, string UserType);
        public abstract bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime);

        public abstract bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime,int AppID);
        public abstract IDataReader GetProOccupiedSlots(int ProviderID,string FromDate,string ToDate);

        public abstract bool CanSetAvailability(int ProID, string StartDateTime, string EndDateTime);


        public abstract IDataReader GetUsersInRole(string RoleName,int CP,int RPP);

        #endregion

        #region Abstract Rating Methods

        /// <summary>
        /// 
        /// </summary>
        /// <param name="RatingByID">User ID who is giving rating</param>
        /// <param name="RatingToID">UserID to which rating is given</param>
        /// <param name="RatingValue">Value of Rating</param>
        /// <param name="RatingTypeID">1-Client, 2-Providers</param>
        /// <returns></returns>
        public abstract int AddRating(int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID,int AppID);
        public abstract int AddUserReview(int ByUserID, int ToUserID, string ILike, string IDLike, string Comments, int DisplayNameAs,int AppID);
        public abstract IDataReader ListRating(int RatingFilterType);
        public abstract bool DidIRated(int ByUserId, int AppID);
        #endregion

        #region User Payment Profile Methods
        public abstract void AddUserPaymentProfile(int UserID, string ProfileID);
        public abstract void DeleteUserPaymentProfile(int UserID, string ProfileID);

        public abstract IDataReader GetPaymentProfile(int UserID);

        #endregion

        #region Appointment Photos
        public abstract void AddAppointmentPhoto(int UserID, int AID, string FilePath);
        public abstract void RemoveAppointmentPhoto(int FileID);

        public abstract IDataReader ListAppointmentPhotos(int AppointmentID);
        #endregion

        #region Notification Related Methods
        public abstract int AddNotification(int ByID, int ToID, int NotTypeID, int Privacy, int RelatedEntityID);
        public abstract void RemoveNotification(int NotID);
        public abstract IDataReader GetMyNotifications(int MyUserID);

        public abstract IDataReader GetAdminNotifications(int Page,int RecsPerPage);
        public abstract void RemoveNotificationByUser(int UserID);

        public abstract void UpdateNotificationStatus(int AppID);
        public abstract IDataReader GetOrderWithIn(int Hrs);
        #endregion
    }

}