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

namespace Netsam.Modules.ServiceDashBoard.Data
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
        private const string ModuleQualifier = "NS_SDB_";

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

        #region Public Methods

        //public override IDataReader GetItem(int itemId)
        //{
        //    return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "spGetItem", itemId);
        //}

        //public override IDataReader GetItems(int userId, int portalId)
        //{
        //    return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "spGetItemsForUser", userId, portalId);
        //}

        public override int AddService(int ServiceID, string ServiceName, string ShortDesc, string Image, int ParentID, decimal Price, int Duration)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddService", ServiceID, ServiceName, ShortDesc, Image, ParentID, Price, Duration).ToString());
        }

        public override int AddProviderService(int ProviderID, int ServiceID)
        {
            return SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "AddProviderService", ProviderID, ServiceID);
        }

        public  int AddProviderServiceWithPrice(int ProviderID, int ServiceID,decimal Minimum,decimal RangeTo)
        {
            return SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "AddProviderServiceWithPrice", ProviderID, ServiceID,Minimum, RangeTo);
        }

        public override void RemoveService(int ServiceID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveService", ServiceID);
        }
        public override void RemoveServiceForProvider(int ProviderId, int ServiceID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveProviderService", ProviderId, ServiceID);
        }
        public override System.Data.IDataReader GetService(int ServiceID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetService", ServiceID);
        }

        public override System.Data.IDataReader GetServiceByName(string ServiceName)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetServiceByName", ServiceName);
        }

        public override System.Data.IDataReader GetServicesIn(int ParentServiceID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetServicesIn", ParentServiceID);
        }

        public override System.Data.IDataReader GetServicesIn2(int ParentServiceID,int ProviderID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetServicesIn2", ParentServiceID, ProviderID);
        }

        public  System.Data.IDataReader UpdateServicePriceRange(int ServiceID, int ProviderID,decimal Minimum, decimal RangeTo)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "UpdateServicePriceRange", ServiceID, ProviderID, Minimum, RangeTo);
        }
        public override System.Data.IDataReader ListRootServices()
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetRootServices");
        }

        public override System.Data.IDataReader GetBottomServicesIn(int SID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetChildServicesIn", SID);
        }

        public override System.Data.IDataReader GetProviderServices(int UID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetProviderServices", UID);
        }

        //ListProvidersByService
        public override System.Data.IDataReader ListProvidersByService(string ServiceIDs)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "ListProvidersByService", ServiceIDs);
        }

        public override System.Data.IDataReader ListWorkSamplesByProvider(int ProviderID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetProviderWorkSamples", ProviderID);
        }

        public override int AddFormUserService(string username, int ServiceID)
        {
            return SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "AddFormUserService", username, ServiceID);
        }
        public override void RemoveFormUserService(string Username)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveFormUserService", Username);
        }

        public override System.Data.IDataReader GetFormUserServices(string Username)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetFormUserServices", Username);
        }
        #endregion

        #region Rating Related Methods

        public override System.Data.IDataReader GetMyRating(int UserID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetMyRating", UserID);
        }

        public override System.Data.IDataReader GetMyReview(int UserID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetMyReview", UserID);
        }

        public override System.Data.IDataReader GetMyRaReOnApp(int UserID, int AppID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "MyRaReOnApp", UserID, AppID);
        }


        #endregion

        #region Coupon Related Methods
        public override int AddCoupon(string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, "NS_CouponsAdd", Name, Code, Discount, DiscountType, StartsFrom, EndsOn, NoOfCoupons).ToString());
        }
        public override void RemoveCoupon(int ID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, "NS_CouponsDelete", ID);
        }
        public override void UpdateCoupon(int ID, string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, "NS_CouponsUpdate",ID, Name, Code, Discount, DiscountType, StartsFrom, EndsOn, NoOfCoupons);
        }
        public override System.Data.IDataReader ValidateCoupon(string Code)
        {
            return SqlHelper.ExecuteReader(ConnectionString, "NS_CouponValidate", Code);
        }
        public override System.Data.IDataReader GetCoupon(int ID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, "NS_CouponsGet", ID);
        }

        public override System.Data.IDataReader ListCoupon()
        {
            return SqlHelper.ExecuteReader(ConnectionString, "NS_CouponsList");
        }

        public override void UpdateCouponCount(string Code)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, "NS_UpdateCouponCount",Code );
        }


        public  System.Data.DataTable NSR_GetUserResponse(int UserID)
        {
            //[NSR_GetUserResponse] 4618, 20,3
            //QCategoryID= 20, Step=3
            return SqlHelper.ExecuteDataset(ConnectionString, "NSR_GetUserResponse", UserID,20,3).Tables[0];
        }


        public System.Data.DataTable NS_ProviderServicesMapping(int UserID)
        {
            //NS_ProviderServicesMapping 4645
            return SqlHelper.ExecuteDataset(ConnectionString, "NS_ProviderServicesMapping", UserID).Tables[0];
        }
        #endregion
    }

}