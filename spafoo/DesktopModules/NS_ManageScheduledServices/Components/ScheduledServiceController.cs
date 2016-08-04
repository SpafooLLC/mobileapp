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
using System;
using Netsam.Modules.ManageScheduledServices.Data;

namespace Netsam.Modules.ManageScheduledServices.Components
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The Controller class for NS_ManageScheduledServices
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
    public class ScheduledServiceController //: IPortable, ISearchable, IUpgradeable
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

        //List<NS_ManageScheduledServicesInfo> colNS_ManageScheduledServicess = GetNS_ManageScheduledServicess(ModuleID);
        //if (colNS_ManageScheduledServicess.Count != 0)
        //{
        //    strXML += "<NS_ManageScheduledServicess>";

        //    foreach (NS_ManageScheduledServicesInfo objNS_ManageScheduledServices in colNS_ManageScheduledServicess)
        //    {
        //        strXML += "<NS_ManageScheduledServices>";
        //        strXML += "<content>" + DotNetNuke.Common.Utilities.XmlUtils.XMLEncode(objNS_ManageScheduledServices.Content) + "</content>";
        //        strXML += "</NS_ManageScheduledServices>";
        //    }
        //    strXML += "</NS_ManageScheduledServicess>";
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
        //XmlNode xmlNS_ManageScheduledServicess = DotNetNuke.Common.Globals.GetContent(Content, "NS_ManageScheduledServicess");
        //foreach (XmlNode xmlNS_ManageScheduledServices in xmlNS_ManageScheduledServicess.SelectNodes("NS_ManageScheduledServices"))
        //{
        //    NS_ManageScheduledServicesInfo objNS_ManageScheduledServices = new NS_ManageScheduledServicesInfo();
        //    objNS_ManageScheduledServices.ModuleId = ModuleID;
        //    objNS_ManageScheduledServices.Content = xmlNS_ManageScheduledServices.SelectSingleNode("content").InnerText;
        //    objNS_ManageScheduledServices.CreatedByUser = UserID;
        //    AddNS_ManageScheduledServices(objNS_ManageScheduledServices);
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

        //List<NS_ManageScheduledServicesInfo> colNS_ManageScheduledServicess = GetNS_ManageScheduledServicess(ModInfo.ModuleID);

        //foreach (NS_ManageScheduledServicesInfo objNS_ManageScheduledServices in colNS_ManageScheduledServicess)
        //{
        //    SearchItemInfo SearchItem = new SearchItemInfo(ModInfo.ModuleTitle, objNS_ManageScheduledServices.Content, objNS_ManageScheduledServices.CreatedByUser, objNS_ManageScheduledServices.CreatedDate, ModInfo.ModuleID, objNS_ManageScheduledServices.ItemId.ToString(), objNS_ManageScheduledServices.Content, "ItemId=" + objNS_ManageScheduledServices.ItemId.ToString());
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


        public void AddProAvailability(int ProID, DateTime Dated, string StartTime, string EndTime)
        {
            DataProvider.Instance().AddProviderAvailability(ProID, Dated, StartTime, EndTime);
        }

        public void RemoveAvailability(int ID)
        {
            DataProvider.Instance().RemoveAvailability(ID);
        }
        public List<ProAvailabilityInfo> ListAvailability(int ProviderID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<ProAvailabilityInfo>(DataProvider.Instance().ListAvailability(ProviderID));
        }
    }

    public class ProAvailabilityInfo
    {
        public int AvailID { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int ProviderID { get; set; }
    }
}
