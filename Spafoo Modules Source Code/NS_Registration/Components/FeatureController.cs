using System.Collections.Generic;
//using System.Xml;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;

namespace Netsam.Modules.NS_Registration.Components
{

    //uncomment the interfaces to add the support.
    public class FeatureController //: IPortable, ISearchable, IUpgradeable
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

        //List<NS_RegistrationInfo> colNS_Registrations = GetNS_Registrations(ModuleID);
        //if (colNS_Registrations.Count != 0)
        //{
        //    strXML += "<NS_Registrations>";

        //    foreach (NS_RegistrationInfo objNS_Registration in colNS_Registrations)
        //    {
        //        strXML += "<NS_Registration>";
        //        strXML += "<content>" + DotNetNuke.Common.Utilities.XmlUtils.XMLEncode(objNS_Registration.Content) + "</content>";
        //        strXML += "</NS_Registration>";
        //    }
        //    strXML += "</NS_Registrations>";
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
        //XmlNode xmlNS_Registrations = DotNetNuke.Common.Globals.GetContent(Content, "NS_Registrations");
        //foreach (XmlNode xmlNS_Registration in xmlNS_Registrations.SelectNodes("NS_Registration"))
        //{
        //    NS_RegistrationInfo objNS_Registration = new NS_RegistrationInfo();
        //    objNS_Registration.ModuleId = ModuleID;
        //    objNS_Registration.Content = xmlNS_Registration.SelectSingleNode("content").InnerText;
        //    objNS_Registration.CreatedByUser = UserID;
        //    AddNS_Registration(objNS_Registration);
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

        //List<NS_RegistrationInfo> colNS_Registrations = GetNS_Registrations(ModInfo.ModuleID);

        //foreach (NS_RegistrationInfo objNS_Registration in colNS_Registrations)
        //{
        //    SearchItemInfo SearchItem = new SearchItemInfo(ModInfo.ModuleTitle, objNS_Registration.Content, objNS_Registration.CreatedByUser, objNS_Registration.CreatedDate, ModInfo.ModuleID, objNS_Registration.ItemId.ToString(), objNS_Registration.Content, "ItemId=" + objNS_Registration.ItemId.ToString());
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
}
