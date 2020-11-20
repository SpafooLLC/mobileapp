using System.Collections.Generic;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;
using Netsam.Modules.ServiceDashBoard.Components;
using Netsam.Modules.MakeAppointment.Data;
using System.Reflection;
using System;
using DotNetNuke.Entities.Users;
using Netsam.Modules.NS_Registration.Components;
using DotNetNuke.Services.Exceptions;
using System.Diagnostics;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Controllers;
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

        private string SendMail2User(UserInfo user, string Body)
        {
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
            string _HostEmail = HostController.Instance.GetString("HostEmail").ToLower();
            DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail, user.Email, "Appointment Requested", Body);
            DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail, "sachinmcsd@gmail.com", "Appointment Requested", Body);
            return "";
        }
        public int AddNotification(int ByID, int ToID, int NotTypeID, int Privacy, int RelatedEntityID)
        {
            int ireturn = -99;
            try
            {
                NotificationService oCtrl = new NotificationService();
                UserHardwareController oUHCtrl = new UserHardwareController();
                List<NS_UserHardware> lstUHInfo = oUHCtrl.GetUserHardware(ToID);
                ireturn = 1;
                string _Message = "";
                foreach (NS_UserHardware oUHInfo in lstUHInfo)
                {
                    ireturn = 2;
                    if (oUHInfo != null)
                    {
                        ireturn = 3;
                        if (!oUHInfo.IsWebVersion)
                        {
                            ireturn = 4;
                            //if not Web user, means he is a mobile user, so send a push notification
                            if (oUHInfo.DeviceToken.Trim() != "")
                            {
                                ireturn = 5;
                                _Message = "";
                                _Message = GetUserMessage(NotTypeID, RelatedEntityID);
                                ireturn = 6;
                                if (_Message.Trim() != "")
                                {
                                    ireturn = 7;
                                  ireturn=  oCtrl.SendAndroidNotification(oUHInfo.DeviceToken, _Message);
                                    ireturn = 8;
                                   oCtrl.SendToiOS(oUHInfo.DeviceToken, _Message);
                                    //ireturn = 9;

                                }
                            }
                        }
                    }
                }
                // Send Mail to Provider for asap and regular appointment
                if (NotTypeID == 10 || NotTypeID == 4)
                {
                    UserInfo oProviderInfo = UserController.GetUserById(0, ToID);
                    _Message = "Hi " + oProviderInfo.FirstName + ",<br/><br/>" + _Message;
                    _Message += "<br /><br />Thank you,<br /><img src='https://www.spafoo.com/images/Spafoo-Email-Logo.png'>";

                    SendMail2User(oProviderInfo, _Message);
                }
            }
            catch (Exception ex)
            {
               // ireturn = 10;
                var st = new StackTrace(ex, true);
                // Get the top stack frame
                var frame = st.GetFrame(0);
                // Get the line number from the stack frame
                var line = frame.GetFileLineNumber();
                return line;
                //throw ex;
            }
            DataProvider.Instance().AddNotification(ByID, ToID, NotTypeID, Privacy, RelatedEntityID);
            return ireturn;
        }
        private string GetUserMessage(int NotificationTypeID, int RelatedEntityID)
        {
            string rValue = "1";
            try
            {
                AppointmentController oAppCtrl = new AppointmentController();

                AppointmentInfo oApp = oAppCtrl.GetAppointment(RelatedEntityID);
                UserController oUCtr = new UserController();

                if (oApp != null)
                {
                    string ClientName = oApp.ClientInfo.FirstName + " " + oApp.ClientInfo.LastName.Substring(0,1)+".";
                    string ProviderName = oApp.ProviderInfo.FirstName + " " + oApp.ProviderInfo.LastName.Substring(0, 1) + ".";
                    rValue = "2";
                    if (NotificationTypeID == 4)
                    {
                        rValue = ClientName + " has requested an appointment! Please login and go to My Appointments to respond.";
                    }
                    if (NotificationTypeID == 5)
                    {
                        rValue = "You have appointment with " + ClientName + " on " + oApp.ForDate + " at " + oApp.AtTime;
                    }
                    if (NotificationTypeID == 6)
                    {
                        rValue = "You have appointment with " + ClientName + " on " + oApp.ForDate + " at " + oApp.AtTime;
                    }
                    if (NotificationTypeID == 7)
                    {
                        rValue = ProviderName + " has arrived for your appointment!";
                    }
                    if (NotificationTypeID == 8)
                    {
                        rValue = "Thank you for choosing SpaFoo!";
                    }
                    if (NotificationTypeID == 9)
                    {
                        rValue = ClientName + " has cancelled the appointment";
                    }
                    if (NotificationTypeID == 10)
                    {
                        rValue = ClientName + " has requested an ASAP appointment with you! Please login and go to My Appointments to respond.";
                    }
                    if (NotificationTypeID == 11)
                    {
                        rValue = ProviderName + " has accepted your ASAP appointment. Please review the time set for your appointment and accept or deny it to finalize.";
                    }
                    if (NotificationTypeID == 12)
                    {
                        rValue = ClientName + " has accepted the time of your ASAP appointment.";
                    }
                    if (NotificationTypeID == 13)
                    {
                        rValue = ClientName + " did NOT accept the time of your ASAP appointment.";
                    }
                    if (NotificationTypeID == 14)
                    {
                        // Sachin 01/Nov/2016, client asked not to send notification to client when provider gives review to client
                        rValue = "";//ProviderName + " has given you a SpaFoo review!";
                    }
                    if (NotificationTypeID == 15)
                    {
                        rValue = "Your appointment has been accepted by " + ProviderName + ". For more information, please check 'My Schedule' section.";
                    }
                    if (NotificationTypeID == 16)
                    {
                        rValue = "Your ASAP appointment has been requested with " + ProviderName;
                    }
                    if (NotificationTypeID == 18)
                    {
                        rValue = "Your appointment is not accepted by " + ProviderName;
                    }
                    if (NotificationTypeID == 19)
                    {
                        rValue = "Your ASAP request is not accepted by " + ProviderName;
                    }
                }
            }
            catch (Exception ex)
            {
                //rValue = "Error"
               // ProcessPageLoadException(ex);
            }
            
            return rValue;
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

        public List<NotificationInfo> GetAdminNotification(int Page, int RecsPerPage)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<NotificationInfo>(DataProvider.Instance().GetAdminNotifications(Page, RecsPerPage));
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
       
        string _ByName = "";
        public string ByName
        {
            get { return _ByName; }
            set
            {
                string _s = value.Split(' ')[0] + ' ' + value.Split(' ')[1].Substring(0, 1) + '.';
                _ByName = _s;
            }
        }
       
        string _ToName = "";
        public string ToName
        {
            get { return _ToName; }
            set
            {
                string _s = value.Split(' ')[0] + ' ' + value.Split(' ')[1].Substring(0, 1) + '.';
                _ToName = _s;
            }
        }
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
