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

using System.Collections.Generic;
using System.Data;
//using System.Xml;
using DotNetNuke.Entities.Modules;
using Netsam.Modules.ServiceDashBoard.Data;
using DotNetNuke.Services.Search;
using DotNetNuke.Entities.Users;
using System.Data.SqlClient;
namespace Netsam.Modules.ServiceDashBoard.Components
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The Controller class for NS_ServiceDashBoard
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
    public class ServiceController //: IPortable, ISearchable, IUpgradeable
    {

        public List<ServiceInfo> GetServicesIn(int ServiceID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<ServiceInfo>(DataProvider.Instance().GetServicesIn(ServiceID));
        }
        public List<ServiceInfo> GetProvideServices(int UID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<ServiceInfo>(DataProvider.Instance().GetProviderServices(UID));
        }

        public List<ServiceInfo> GetRootServices()
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<ServiceInfo>(DataProvider.Instance().ListRootServices());
        }
        public List<ServiceInfo> GetBottomServicesIn(int SID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<ServiceInfo>(DataProvider.Instance().GetBottomServicesIn(SID));
        }
        public ServiceInfo GetService(int ServiceID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillObject<ServiceInfo>(DataProvider.Instance().GetService(ServiceID));
        }

        public int AddService(ServiceInfo oService)
        {
            return DataProvider.Instance().AddService(oService.ServiceID, oService.ServiceName, oService.ShortDescription, oService.Image, oService.ParentID, oService.Price, oService.Tax);
        }

        public void RemoveService(int ServiceID)
        {
            DataProvider.Instance().RemoveService(ServiceID);
        }

        /// <summary>
        /// Assign service to given provider
        /// </summary>
        /// <param name="ProviderUserID">Provider's DNN UserID</param>
        /// <param name="ServiceID">ID of Service to assign</param>
        public void AssignToProvider(int ProviderUserID, int ServiceID)
        {
            DataProvider.Instance().AddProviderService(ProviderUserID, ServiceID);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ProviderDNNUserID">DNN UserID</param>
        /// <param name="ServiceID">-1 - To remove all, ID - to remove specific service</param>
        public void RemoveServiceForProvider(int ProviderDNNUserID, int ServiceID) {
            DataProvider.Instance().RemoveServiceForProvider(ProviderDNNUserID, ServiceID);
        }

        public List<UserInfo> ListProviders(int SID) {
            List<UserInfo> lstUsers = new List<UserInfo>();
            SqlDataReader  dr =(SqlDataReader ) DataProvider.Instance().ListProvidersByService(SID);
            UserController oUCtrl = new UserController();
            while (dr.Read())
            {
                UserInfo oUser = oUCtrl.GetUser(0,((int)dr["UserID"]));
                if (oUser != null)
                {
                    if ((oUser.Membership.Approved) && (!oUser.IsDeleted))
                    {
                        lstUsers.Add(oUser);
                    }
                }
            }
            return lstUsers; //DotNetNuke.Common.Utilities.CBO.FillCollection<UserInfo>(DataProvider.Instance().ListProvidersByService(SID));
        }

        public List<WorkSample> GetWorkSamples(int UID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<WorkSample>(DataProvider.Instance().ListWorkSamplesByProvider(UID));
        }
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

        //List<NS_ServiceDashBoardInfo> colNS_ServiceDashBoards = GetNS_ServiceDashBoards(ModuleID);
        //if (colNS_ServiceDashBoards.Count != 0)
        //{
        //    strXML += "<NS_ServiceDashBoards>";

        //    foreach (NS_ServiceDashBoardInfo objNS_ServiceDashBoard in colNS_ServiceDashBoards)
        //    {
        //        strXML += "<NS_ServiceDashBoard>";
        //        strXML += "<content>" + DotNetNuke.Common.Utilities.XmlUtils.XMLEncode(objNS_ServiceDashBoard.Content) + "</content>";
        //        strXML += "</NS_ServiceDashBoard>";
        //    }
        //    strXML += "</NS_ServiceDashBoards>";
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
        //XmlNode xmlNS_ServiceDashBoards = DotNetNuke.Common.Globals.GetContent(Content, "NS_ServiceDashBoards");
        //foreach (XmlNode xmlNS_ServiceDashBoard in xmlNS_ServiceDashBoards.SelectNodes("NS_ServiceDashBoard"))
        //{
        //    NS_ServiceDashBoardInfo objNS_ServiceDashBoard = new NS_ServiceDashBoardInfo();
        //    objNS_ServiceDashBoard.ModuleId = ModuleID;
        //    objNS_ServiceDashBoard.Content = xmlNS_ServiceDashBoard.SelectSingleNode("content").InnerText;
        //    objNS_ServiceDashBoard.CreatedByUser = UserID;
        //    AddNS_ServiceDashBoard(objNS_ServiceDashBoard);
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

        //List<NS_ServiceDashBoardInfo> colNS_ServiceDashBoards = GetNS_ServiceDashBoards(ModInfo.ModuleID);

        //foreach (NS_ServiceDashBoardInfo objNS_ServiceDashBoard in colNS_ServiceDashBoards)
        //{
        //    SearchItemInfo SearchItem = new SearchItemInfo(ModInfo.ModuleTitle, objNS_ServiceDashBoard.Content, objNS_ServiceDashBoard.CreatedByUser, objNS_ServiceDashBoard.CreatedDate, ModInfo.ModuleID, objNS_ServiceDashBoard.ItemId.ToString(), objNS_ServiceDashBoard.Content, "ItemId=" + objNS_ServiceDashBoard.ItemId.ToString());
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
    }

    public class UserRatingController
    {

        public UserRatingInfo GetMyRating(int UserID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillObject<UserRatingInfo>(DataProvider.Instance().GetMyRating(UserID));
        }
        public List<UserReviewInfo> GetMyReview(int UserID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<UserReviewInfo>(DataProvider.Instance().GetMyReview(UserID));
        }

    }
    public class UserRatingInfo
    {

        public int Rating { get; set; }
        public int ByPeople { get; set; }
    }
    public class UserReviewInfo
    {

        public int ByUserID { get; set; }
        public int ToUserID { get; set; }

        public int RatingValue { get; set; }

        public string Comments { get; set; }
        public int DisplayName { get; set; }
        public UserInfo ByUser
        {
            get
            {
                UserInfo oUser = UserController.Instance.GetUserById(0, this.ByUserID);
                return oUser;

            }
        }

    }
    public class WorkSample {
        public string OptionText { get; set; }
        public int ID { get; set; }
    }
}
