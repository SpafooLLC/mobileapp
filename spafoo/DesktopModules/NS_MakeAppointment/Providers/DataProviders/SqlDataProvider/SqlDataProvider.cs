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

using System;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Framework.Providers;
using Microsoft.ApplicationBlocks.Data;

namespace Netsam.Modules.MakeAppointment.Data
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// SQL Server implementation of the abstract DataProvider class
    /// 
    /// This concreted data provider class provides the implementation of the abstract methods 
    /// from data dataprovider.cs
    /// 
    /// In most cases you will only modify the Public methods region below.
    /// </summary>
    /// -----------------------------------------------------------------------------
    public class SqlDataProvider : DataProvider
    {

        #region Private Members

        private const string ProviderType = "data";
        private const string ModuleQualifier = "NS_MA_"; // Make Appointment

        private readonly ProviderConfiguration _providerConfiguration = ProviderConfiguration.GetProviderConfiguration(ProviderType);
        private readonly string _connectionString;
        private readonly string _providerPath;
        private readonly string _objectQualifier;
        private readonly string _databaseOwner;

        #endregion

        #region Constructors

        public SqlDataProvider()
        {

            // Read the configuration specific information for this provider
            Provider objProvider = (Provider)(_providerConfiguration.Providers[_providerConfiguration.DefaultProvider]);

            // Read the attributes for this provider

            //Get Connection string from web.config
            _connectionString = Config.GetConnectionString();

            if (string.IsNullOrEmpty(_connectionString))
            {
                // Use connection string specified in provider
                _connectionString = objProvider.Attributes["connectionString"];
            }

            _providerPath = objProvider.Attributes["providerPath"];

            _objectQualifier = objProvider.Attributes["objectQualifier"];
            if (!string.IsNullOrEmpty(_objectQualifier) && _objectQualifier.EndsWith("_", StringComparison.Ordinal) == false)
            {
                _objectQualifier += "_";
            }

            _databaseOwner = objProvider.Attributes["databaseOwner"];
            if (!string.IsNullOrEmpty(_databaseOwner) && _databaseOwner.EndsWith(".", StringComparison.Ordinal) == false)
            {
                _databaseOwner += ".";
            }

        }

        #endregion

        #region Properties

        public string ConnectionString
        {
            get
            {
                return _connectionString;
            }
        }

        public string ProviderPath
        {
            get
            {
                return _providerPath;
            }
        }

        public string ObjectQualifier
        {
            get
            {
                return _objectQualifier;
            }
        }

        public string DatabaseOwner
        {
            get
            {
                return _databaseOwner;
            }
        }

        // used to prefect your database objects (stored procedures, tables, views, etc)
        private string NamePrefix
        {
            get { return DatabaseOwner + ObjectQualifier + ModuleQualifier; }
        }

        #endregion

        #region Private Methods

        private static object GetNull(object field)
        {
            return Null.GetNull(field, DBNull.Value);
        }

        #endregion

        #region Public Appointment Methods

        //public override IDataReader GetItem(int itemId)
        //{
        //    return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "spGetItem", itemId);
        //}

        //public override IDataReader GetItems(int userId, int portalId)
        //{
        //    return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "spGetItemsForUser", userId, portalId);
        //}

        public override System.Data.IDataReader ListAppointmentByProvider(int UID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "ListAppointmentByProvider", UID);
        }

        public override System.Data.IDataReader ListAppointmentByClient(int UID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "ListAppointmentByClient", UID);
        }
        public override System.Data.IDataReader GetAppointment(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetAppointment", AppointmentID);
        }
        public override System.Data.IDataReader ListServicesByAppointment(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "ListServiceByAppointment", AppointmentID);
        }

        public override System.Data.IDataReader GetAppointmentLocation(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetAppointmentLocation", AppointmentID);
        }

        public override int AddProviderAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime,string PayTxnID, string CCNumber, string Expriry,string Comment,string oAuthTxn,int EditAppID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddProviderAppointment", ClientID, ProviderID, AddressID, ForDate, AtTime, PayTxnID, CCNumber, Expriry, Comment, oAuthTxn,EditAppID).ToString());
        }

        public override int AddUserLocation(string Address, string City, string State, string Zip)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddAddress", Address, City, State, Zip).ToString());
        }

        //public override void UpdateLocationAppointment(int AddressID, int AppointmentID)
        //{
        //    SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateLocationAppointment", AddressID, AppointmentID);
        //}

        public override int AddServiceToAppointment(int AppointmentID, int ServiceID, int Qty, decimal Rate)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddServiceToAppointment", AppointmentID, ServiceID, Qty, Rate).ToString());
        }

        public override void ClearAppServices(int AppointmentID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "ClearAppServices", AppointmentID);
        }
        public override void UpdateAppointment(int ID, string Comments, string PaymentTxnID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateAppointment", ID, Comments, PaymentTxnID);
        }

        public override void UpdateAppointmentStatus(int ID, int Status)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateAppointmentStatus", ID, Status);
        }

        public override void UpdateAppBasicInfo(int AppID, int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime,string Comment)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateAppBasic", AppID, ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, Comment);
        }

        public override void RemoveApp(int AppID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveApp", AppID);
        }
        #endregion

#region Rating Method
        public override int AddRating(int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddRating", RatingByID, RatingToID, RatingValue, RatingTypeID).ToString());
        }

        public override int AddUserReview(int ByUserID, int ToUserID, string ILike, string IDLike, string Comments, int DisplayNameAs)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddUserReview", ByUserID, ToUserID, ILike, IDLike, Comments, DisplayNameAs).ToString());
        }
        public override System.Data.IDataReader ListRating(int RatingFilterType)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "ListRatingType", RatingFilterType);
        }
#endregion

        #region Payment Profile Methods
        public override void AddUserPaymentProfile(int UserID, string ProfileID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateUserPayProfile", UserID, ProfileID);
        }
        public override void DeleteUserPaymentProfile(int UserID, string ProfileID)
        {
            throw new NotImplementedException();
        }

        public override System.Data.IDataReader GetPaymentProfile(int UserID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetPayProfile", UserID);
        }
        #endregion

        #region Appointment Photo Methods
        
        public override void AddAppointmentPhoto(int UserID, int AID, string FilePath)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "AddAppointmentPhoto", UserID, AID, FilePath);
        }

        public override void RemoveAppointmentPhoto(int FileID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveAppointmentPhoto", FileID);
        }

        public override System.Data.IDataReader ListAppointmentPhotos(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "ListAppointmentPhotos", AppointmentID);
        }
        #endregion

        #region Notification Related methods
        public override int AddNotification(int ByID, int ToID, int NotTypeID, int Privacy, int RelatedEntityID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddNotification", ByID, ToID, NotTypeID, Privacy, RelatedEntityID).ToString());
        }

        public override void RemoveNotification(int NotID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveNotification", NotID);
        }

        public override System.Data.IDataReader GetMyNotifications(int MyUserID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetNotifications", MyUserID);
        }

        public override void RemoveNotificationByUser(int UserID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveNotificationByUser", UserID);
        }

        public override void UpdateNotificationStatus(int AppID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateNotificationStatus", AppID);
        }
        public override System.Data.IDataReader GetOrderWithIn(int Hrs)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetOrderWithIn", Hrs);
        }
        #endregion
    }
}