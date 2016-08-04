using System.Collections.Generic;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;
using Netsam.Modules.ServiceDashBoard.Components;
using Netsam.Modules.MakeAppointment.Data;
using System.Reflection;
using System;
using DotNetNuke.Entities.Users;

namespace Netsam.Modules.MakeAppointment.Components
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The Controller class for NS_Notification
    /// 
    /// The NotificationController class is defined as the BusinessController in the manifest file (.dnn)
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
    public class NotificationController //: IPortable, ISearchable, IUpgradeable
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


        public int AddNotification(int ByID, int ToID, int NotTypeID, int Privacy, int RelatedEntityID)
        {
            return DataProvider.Instance().AddNotification(ByID, ToID, NotTypeID, Privacy, RelatedEntityID);
        }

        public void RemoveNotification(int ID)
        {
            DataProvider.Instance().RemoveNotification(ID);
        }

        public void RemoveNotificationByUser(int UID)
        {
            DataProvider.Instance().RemoveNotificationByUser(UID);
        }

        public List<NotificationInfo> GetMyNotifications(int MyUserID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<NotificationInfo>(DataProvider.Instance().GetMyNotifications(MyUserID));
        }

        public List<AppointmentInfo> GetOrdersWithIn(int Hrs)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().GetOrderWithIn(Hrs));
        }

        public void UpdateNotificationStatus(int AppID)
        {
            DataProvider.Instance().UpdateNotificationStatus(AppID);

        }

    }

    public class NotificationInfo
    {
        public int ID { get; set; }

        public int ActivityByID { get; set; }

        public int ActivityToID { get; set; }

        public DateTime Dated { get; set; }

        public int PrivacyType { get; set; }

        public int NotificationTypeID { get; set; }

        public int RelatedEntityID { get; set; }
        public string ByName { get; set; }
        public string DisplayText { get; set; }
        public string TypeName { get; set; }
    }

    public class NotificationType
    {
        public int NotificiationTypeID { get; set; }
        public string TypeName { get; set; }
        public string DisplayText { get; set; }
    }

}
