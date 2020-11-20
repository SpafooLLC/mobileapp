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


namespace Netsam.Modules.ServiceDashBoard.Data
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
                const string assembly = "Netsam.Modules.ServiceDashBoard.Data.SqlDataprovider,NS_ServiceDashBoard";
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

        #region Abstract methods

        //public abstract IDataReader GetItems(int userId, int portalId);

        //public abstract IDataReader GetItem(int itemId);        


        #endregion

        #region Servicee Related Methods
        public abstract IDataReader GetService(int ServiceID);
        public abstract IDataReader GetServicesIn(int ParentServiceID);

        public abstract IDataReader GetServicesIn2(int ParentServiceID,int ProviderID);

        public abstract IDataReader ListRootServices();
        public abstract IDataReader GetBottomServicesIn(int SID);
        public abstract IDataReader GetProviderServices(int UID);
        public abstract IDataReader GetServiceByName(string ServiceName);
        public abstract int AddService(int ServiceID, string ServiceName, string ShortDesc, string Image, int ParentID, decimal Price, int Duration);
        public abstract void RemoveService(int ServiceID);

        public abstract int AddProviderService(int ProviderID, int ServiceID);
        public abstract void RemoveServiceForProvider(int ProviderId, int ServiceID);

        public abstract IDataReader ListProvidersByService(string ServiceIDs);

        public abstract System.Data.IDataReader ListWorkSamplesByProvider(int ProviderID);
        public abstract int AddFormUserService(string Username, int ServiceID);
        public abstract void RemoveFormUserService(string Username);
        public abstract IDataReader GetFormUserServices(string Username);
        #endregion

        #region Rating related methods
        public abstract IDataReader GetMyRating(int UserID);
        public abstract IDataReader GetMyReview(int UserID);
        public abstract IDataReader GetMyRaReOnApp(int UserID, int AppID);
        #endregion

#region Coupon Related Methods
        public abstract IDataReader GetCoupon(int ID);
        public abstract IDataReader ListCoupon();
        
        public abstract IDataReader ValidateCoupon(string Code);
        
        public abstract void RemoveCoupon(int ID);

        public abstract int AddCoupon(string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons);
        public abstract void UpdateCoupon(int ID, string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons);
        public abstract void UpdateCouponCount(string Code);
#endregion
    }
}