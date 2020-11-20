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
//using System.Xml;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;

namespace Netsam.Modules.NS_PriceList.Components
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The Controller class for NS_PriceList
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
    public class StatRPTController //: IPortable, ISearchable, IUpgradeable
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

        //List<NS_PriceListInfo> colNS_PriceLists = GetNS_PriceLists(ModuleID);
        //if (colNS_PriceLists.Count != 0)
        //{
        //    strXML += "<NS_PriceLists>";

        //    foreach (NS_PriceListInfo objNS_PriceList in colNS_PriceLists)
        //    {
        //        strXML += "<NS_PriceList>";
        //        strXML += "<content>" + DotNetNuke.Common.Utilities.XmlUtils.XMLEncode(objNS_PriceList.Content) + "</content>";
        //        strXML += "</NS_PriceList>";
        //    }
        //    strXML += "</NS_PriceLists>";
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
        //XmlNode xmlNS_PriceLists = DotNetNuke.Common.Globals.GetContent(Content, "NS_PriceLists");
        //foreach (XmlNode xmlNS_PriceList in xmlNS_PriceLists.SelectNodes("NS_PriceList"))
        //{
        //    NS_PriceListInfo objNS_PriceList = new NS_PriceListInfo();
        //    objNS_PriceList.ModuleId = ModuleID;
        //    objNS_PriceList.Content = xmlNS_PriceList.SelectSingleNode("content").InnerText;
        //    objNS_PriceList.CreatedByUser = UserID;
        //    AddNS_PriceList(objNS_PriceList);
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

        //List<NS_PriceListInfo> colNS_PriceLists = GetNS_PriceLists(ModInfo.ModuleID);

        //foreach (NS_PriceListInfo objNS_PriceList in colNS_PriceLists)
        //{
        //    SearchItemInfo SearchItem = new SearchItemInfo(ModInfo.ModuleTitle, objNS_PriceList.Content, objNS_PriceList.CreatedByUser, objNS_PriceList.CreatedDate, ModInfo.ModuleID, objNS_PriceList.ItemId.ToString(), objNS_PriceList.Content, "ItemId=" + objNS_PriceList.ItemId.ToString());
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

        public List<StatRPTInfo> ListStatsRPTByService(string From, string To)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<StatRPTInfo>(Data.DataProvider.Instance().GetStatRPTByServices(From, To));
        }
        public List<StatRPTInfo> ListStatsRPTByProvider(string From, string To)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<StatRPTInfo>(Data.DataProvider.Instance().GetStatRPTByProvider(From, To));
        }
        public List<StatRPTInfo> ListStatsRPTByProNSrvc(string From, string To)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<StatRPTInfo>(Data.DataProvider.Instance().GetStatRPTByProNSrvc(From, To));
        }
    }

    public class StatRPTInfo
    {
        public string Name { get; set; }
        public string ForDate { get; set; }
        public int Total { get; set; }
        public int Completed { get; set; }
        public decimal Paid { get; set; }
        public string ServiceName { get; set; }
    }
}
