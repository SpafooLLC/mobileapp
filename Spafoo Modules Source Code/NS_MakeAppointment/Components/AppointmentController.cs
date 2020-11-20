/*
' Copyright (c) 2016 Netsam.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System.Collections.Generic;
//using System.Xml;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;
using Netsam.Modules.ServiceDashBoard.Components;
using Netsam.Modules.MakeAppointment.Data;
//using Newtonsoft.Json.Serialization;
using System.Reflection;
//using Newtonsoft.Json;
using System;
using DotNetNuke.Entities.Users;
namespace Netsam.Modules.MakeAppointment.Components
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The Controller class for NS_MakeAppointment
    /// 
    /// The FeatureController class is defined as the BusinessController in the manifest file (.dnn)
    /// DotNetNuke will poll this class to find out which Interfaces the class implements. 
    /// 
    /// The IPortable interface is used to import/export content from a DNN module
    /// 
    /// The ISearchable interface is used by DNN to index the content of a module
    /// 
    /// The IUpgradeable interface allows module developers to execute code during the upgrade 
    /// process for a module.
    /// 
    /// Below you will find stubbed out implementations of each, uncomment and populate with your own data
    /// </summary>
    /// -----------------------------------------------------------------------------

    //uncomment the interfaces to add the support.
    public class AppointmentController //: IPortable, ISearchable, IUpgradeable
    {
        #region Optional Interfaces

        /// -----------------------------------------------------------------------------
        /// <summary>
        /// ExportModule implements the IPortable ExportModule Interface
        /// </summary>
        /// <param name="ModuleID">The Id of the module to be exported</param>
        /// -----------------------------------------------------------------------------
        //public string ExportModule(int ModuleID)
        //{
        //string strXML = "";

        //List<NS_MakeAppointmentInfo> colNS_MakeAppointments = GetNS_MakeAppointments(ModuleID);
        //if (colNS_MakeAppointments.Count != 0)
        //{
        //    strXML += "<NS_MakeAppointments>";

        //    foreach (NS_MakeAppointmentInfo objNS_MakeAppointment in colNS_MakeAppointments)
        //    {
        //        strXML += "<NS_MakeAppointment>";
        //        strXML += "<content>" + DotNetNuke.Common.Utilities.XmlUtils.XMLEncode(objNS_MakeAppointment.Content) + "</content>";
        //        strXML += "</NS_MakeAppointment>";
        //    }
        //    strXML += "</NS_MakeAppointments>";
        //}

        //return strXML;

        //	throw new System.NotImplementedException("The method or operation is not implemented.");
        //}

        /// -----------------------------------------------------------------------------
        /// <summary>
        /// ImportModule implements the IPortable ImportModule Interface
        /// </summary>
        /// <param name="ModuleID">The Id of the module to be imported</param>
        /// <param name="Content">The content to be imported</param>
        /// <param name="Version">The version of the module to be imported</param>
        /// <param name="UserId">The Id of the user performing the import</param>
        /// -----------------------------------------------------------------------------
        //public void ImportModule(int ModuleID, string Content, string Version, int UserID)
        //{
        //XmlNode xmlNS_MakeAppointments = DotNetNuke.Common.Globals.GetContent(Content, "NS_MakeAppointments");
        //foreach (XmlNode xmlNS_MakeAppointment in xmlNS_MakeAppointments.SelectNodes("NS_MakeAppointment"))
        //{
        //    NS_MakeAppointmentInfo objNS_MakeAppointment = new NS_MakeAppointmentInfo();
        //    objNS_MakeAppointment.ModuleId = ModuleID;
        //    objNS_MakeAppointment.Content = xmlNS_MakeAppointment.SelectSingleNode("content").InnerText;
        //    objNS_MakeAppointment.CreatedByUser = UserID;
        //    AddNS_MakeAppointment(objNS_MakeAppointment);
        //}

        //	throw new System.NotImplementedException("The method or operation is not implemented.");
        //}

        /// -----------------------------------------------------------------------------
        /// <summary>
        /// GetSearchItems implements the ISearchable Interface
        /// </summary>
        /// <param name="ModInfo">The ModuleInfo for the module to be Indexed</param>
        /// -----------------------------------------------------------------------------
        //public DotNetNuke.Services.Search.SearchItemInfoCollection GetSearchItems(DotNetNuke.Entities.Modules.ModuleInfo ModInfo)
        //{
        //SearchItemInfoCollection SearchItemCollection = new SearchItemInfoCollection();

        //List<NS_MakeAppointmentInfo> colNS_MakeAppointments = GetNS_MakeAppointments(ModInfo.ModuleID);

        //foreach (NS_MakeAppointmentInfo objNS_MakeAppointment in colNS_MakeAppointments)
        //{
        //    SearchItemInfo SearchItem = new SearchItemInfo(ModInfo.ModuleTitle, objNS_MakeAppointment.Content, objNS_MakeAppointment.CreatedByUser, objNS_MakeAppointment.CreatedDate, ModInfo.ModuleID, objNS_MakeAppointment.ItemId.ToString(), objNS_MakeAppointment.Content, "ItemId=" + objNS_MakeAppointment.ItemId.ToString());
        //    SearchItemCollection.Add(SearchItem);
        //}

        //return SearchItemCollection;

        //	throw new System.NotImplementedException("The method or operation is not implemented.");
        //}

        /// -----------------------------------------------------------------------------
        /// <summary>
        /// UpgradeModule implements the IUpgradeable Interface
        /// </summary>
        /// <param name="Version">The current version of the module</param>
        /// -----------------------------------------------------------------------------
        //public string UpgradeModule(string Version)
        //{
        //	throw new System.NotImplementedException("The method or operation is not implemented.");
        //}

        #endregion

        public int AddLocation(string Address, string City, string State, string Zip) {
            return SqlDataProvider.Instance().AddUserLocation(Address, City, State, Zip);
        }

        public int AddAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime,string EndTime,string PayTxnID, string CCNumber, string Expriry,string Comment,string PayProfileID,int EditAppID,decimal Discount) {
            return SqlDataProvider.Instance().AddProviderAppointment(ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, PayTxnID, CCNumber, Expriry, Comment, PayProfileID, EditAppID,Discount);
        }
        public int AddServiceToAppointment(int AppointmentID, int ServiceID, int Qty, decimal Rate) {
            return SqlDataProvider.Instance().AddServiceToAppointment(AppointmentID, ServiceID, Qty, Rate);
        }

        public void ClearAppServices(int AppointmentID)
        {
            SqlDataProvider.Instance().ClearAppServices(AppointmentID);
        }

        public List<AppointmentInfo> ListAppointmentByProvider(int UID) {
            try
            {
                return DotNetNuke.Common.Utilities.CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().ListAppointmentByProvider(UID));
            }
            catch (Exception ex)
            {
                List<AppointmentInfo> lst = new List<AppointmentInfo>();
                return lst;
            }
        }
        public List<AppointmentInfo> ListAppointmentByClient(int UID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().ListAppointmentByClient(UID));
        }
        public AppointmentInfo GetAppointment(int ID) {
            return DotNetNuke.Common.Utilities.CBO.FillObject<AppointmentInfo>(DataProvider.Instance().GetAppointment(ID));
        }

        public ClientLocation GetAppLocation(int AppID)
        {
            AppointmentController oCtrl = new AppointmentController();
            return DotNetNuke.Common.Utilities.CBO.FillObject<ClientLocation>(DataProvider.Instance().GetAppointmentLocation(AppID));
        }
        public void UpdateAppointment(int ID, string Comments, string PaymentTxnID) {
            DataProvider.Instance().UpdateAppointment(ID, Comments, PaymentTxnID);
        }
        public void UpdateAppointmentStatus(int ID, int Status)
        {
            DataProvider.Instance().UpdateAppointmentStatus(ID, Status);
        }

        public void UpdateAppSeenStatus(int AppID)
        {
            DataProvider.Instance().UpdateAppSeenStatus(AppID);
        }


        public void UpdateAppBasicInfo(int AppID, int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime,string Comment)
        {
            DataProvider.Instance().UpdateAppBasicInfo(AppID, ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime,Comment);
        }

        public void RemoveApp(int AppID)
        {
            DataProvider.Instance().RemoveApp(AppID);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="AppID">ID of Appointment</param>
        /// <param name="UserType">P -  Provider, C - Client</param>
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
          return  DotNetNuke.Common.Utilities.CBO.FillCollection<AppointmentPhotoInfo>(DataProvider.Instance().ListAppointmentPhotos(AppointmentID));
        }
        public bool DidIRated(int ByUserID, int AppID)
        {
            return DataProvider.Instance().DidIRated(ByUserID, AppID);
        }

        public bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime)
        {
            return DataProvider.Instance().IsProviderSlotFree(ProID, StartDateTime, EndDateTime);
        }
        public bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime,int AppID)
        {
            return DataProvider.Instance().IsProviderSlotFree(ProID, StartDateTime, EndDateTime,AppID);
        }
        public List<AppointmentInfo> GetProOccupiedSlots(int ProviderID, string fromDate,string toDate)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().GetProOccupiedSlots(ProviderID, fromDate, toDate));
        }

        public bool CanSetAvailability(int ProID, string StartDateTime, string EndDateTime)
        {
            return DataProvider.Instance().CanSetAvailability(ProID, StartDateTime, EndDateTime);
        }

        public List<UserInfo> GetUsersInRole(string RN,int CP,int RPP)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<UserInfo>(DataProvider.Instance().GetUsersInRole(RN, CP, RPP));
        }
   }

    public class RatingController
    {
        public int AddRating(int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID,int AppID)
        {
            return DataProvider.Instance().AddRating(RatingByID, RatingToID, RatingValue, RatingTypeID,AppID);
        }

        public List<RatingInfo> ListRatingType(int RatingFilterID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<RatingInfo>(DataProvider.Instance().ListRating(RatingFilterID));
        }
        public int AddUserReview(int ByUserID, int ToUserID, string ILike, string IDLike, string Comments, int DisplayNameAs,int AppID)
        {
            return DataProvider.Instance().AddUserReview(ByUserID, ToUserID, ILike, IDLike, Comments, DisplayNameAs, AppID);
        }

       
    }

    public class NS_UserInfo
    {

        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PortalID { get; set; }

        public UserProfile Profile { get; set; }

    }
    public class AppointmentInfo
    {
        public int AppointmentID { get; set; }
        public NS_UserInfo ClientInfo
        {
            get
            {
                try
                {
                    DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                    UserInfo tUser =  oCtrl.GetUser(0, this.ClientID);
                    NS_UserInfo oUser = new NS_UserInfo();
                    oUser.DisplayName = tUser.DisplayName;
                    oUser.FirstName = tUser.FirstName;
                    oUser.LastName = tUser.LastName;
                    oUser.Email = tUser.Email;
                    oUser.Profile = tUser.Profile;
                    oUser.PortalID = tUser.PortalID;
                    return oUser;
                }
                catch (Exception ex)
                {
                    NS_UserInfo oUser = new NS_UserInfo(); ;
                    return oUser;
                }
            }
        }
        public NS_UserInfo ProviderInfo
        {
            get
            {
                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                UserInfo tUser = new UserInfo();
                NS_UserInfo oUser = new NS_UserInfo();
                try
                {
                    tUser =  oCtrl.GetUser(0, this.ProviderID);
                    oUser.DisplayName = tUser.DisplayName;
                    oUser.FirstName = tUser.FirstName;
                    oUser.LastName = tUser.LastName;
                    oUser.Email = tUser.Email;
                    oUser.Profile = tUser.Profile;
                    oUser.PortalID = tUser.PortalID;
                }
                catch (Exception ex)
                {

                }
                return oUser;
            }
        }

        public string PayProfileID { get; set; }
        public string CustomerProfileID { get; set; }
        public string PayTxnID { get; set; }
        public string AuthTxnID { get; set; }
        public int ClientID { get; set; }
        public int ProviderID { get; set; }
        public string ForDate { get; set; }
        public DateTime OrderDate { get; set; }
        public string AtTime { get; set; }
        public string EndTime { get; set; }
        public string Comments { get; set; }
        public int Status { get; set; }
        public int SeenStatus { get; set; }
        public int AddressID { get; set; }
        public int HasNotified { get; set; }

        public List<ServiceInfo> Services
        {
            get
            {
                AppointmentController oCtrl = new AppointmentController();
                return DotNetNuke.Common.Utilities.CBO.FillCollection<ServiceInfo>(DataProvider.Instance().ListServicesByAppointment(this.AppointmentID));
            }
        }

        public ClientLocation Location
        {
            get
            {
                AppointmentController oCtrl = new AppointmentController();
                return DotNetNuke.Common.Utilities.CBO.FillObject<ClientLocation>(DataProvider.Instance().GetAppointmentLocation(this.AppointmentID));
            }
        }

        public decimal Amount { get; set; }

        public string CCNumber { get; set; }
        public string Expiry { get; set; }

        public decimal Discount { get; set; }
    }

    public class AppointmentPhotoInfo {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int AppointmentID { get; set; }
        public string FilePath { get; set; }
    }

    public class ClientLocation
    {
        public int AddressID { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public int AppointmentID { get; set; }
    }

    public class RatingInfo{
        public string RatingName{get;set;}
        public int RatingTypeID{get;set;}
        public int RatingFilter{get;set;}
    }

    public class UserPaymentProfile
    {
        public int UserID { get; set; }
        public string CustomerProfileID { get; set; }
    }

    public class PaymentProfileController
    {
        public void AddUserPaymentProfile(UserPaymentProfile oProfile)
        {
            DataProvider.Instance().AddUserPaymentProfile(oProfile.UserID, oProfile.CustomerProfileID);
        }
        public void DeleteUserPaymentProfile(UserPaymentProfile oProfile)
        {
            DataProvider.Instance().DeleteUserPaymentProfile(oProfile.UserID, oProfile.CustomerProfileID);
        }

        public UserPaymentProfile GetPaymentProfile(int UserID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillObject<UserPaymentProfile>(DataProvider.Instance().GetPaymentProfile(UserID));
        }
    }
    // other example
    //public class ShouldSerializeContractResolver : DefaultContractResolver
    //{
    //    public new static readonly ShouldSerializeContractResolver Instance = new ShouldSerializeContractResolver();


    //    protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
    //    {
    //        JsonProperty property = base.CreateProperty(member, memberSerialization);
    //        if (property.DeclaringType == typeof(DotNetNuke.Entities.Users.UserInfo) && property.PropertyName == "Membership")
    //        {
    //            property.Ignored = true;
    //        }
    //        return property;
    //    }
    //}
}
