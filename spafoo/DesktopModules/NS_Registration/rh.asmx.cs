﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Netsam.Modules.NS_Registration.Components;
using DotNetNuke.Entities.Users;
using DotNetNuke.Security.Membership;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Services.Authentication;
using DotNetNuke.Security.Roles;
using Netsam.Modules.ServiceDashBoard;
using Netsam.Modules.ServiceDashBoard.Components;
using Netsam.Modules.MakeAppointment.Components;
using DotNetNuke.Entities.Controllers;
using DotNetNuke.Services.FileSystem;
namespace Netsam.Modules.NS_Registration
{
    /// <summary>
    /// Summary description for rh
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class rh : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        
        [WebMethod(enableSession:true)]
        public List<Steps> ListQuestions() {
            Session["NSR_FID"] = null;
            QuestionController oCtrl = new QuestionController();
            int MaxRows=oCtrl.GetTotalSteps();
            List<Steps> lstSteps= new List<Steps>();
            // Create UI Steps > Categories > Questions
            for(int i=1;i<=MaxRows;i++){
                Steps o = new Steps();
                o.StepID = i;
                lstSteps.Add(o);
            }
            return lstSteps;
        }

        [WebMethod(enableSession:true)]
        public List<Steps> GetUserReponse(int ID)
        {
            // FID - For User ID
            Session["NSR_FID"] = ID.ToString();
            QuestionController oCtrl = new QuestionController();
            int MaxRows = oCtrl.GetTotalSteps();
            List<Steps> lstSteps = new List<Steps>();
            // Create UI Steps > Categories > Questions
            for (int i = 1; i <= MaxRows; i++)
            {
                Steps o = new Steps();
                o.StepID = i;
                o.UserID = ID;
                lstSteps.Add(o);
            }
            return lstSteps;
        }

        [WebMethod]
        public List<QCategoryInfo> GetStepQuestions(int StepID)
        {
            // Get all the Categories( along with Questions ) for the given StepID
            QuestionController oCtrl = new QuestionController();
            List<QCategoryInfo> lstCategories = oCtrl.GetQCatgories(StepID);
           // QCategoryInfo oInfo = new QCategoryInfo(StepID);

            return lstCategories;
        }
        [WebMethod]
        public int AddCategory(int StepID, string QDesc)
        {
            QuestionController octrl = new QuestionController();
            return octrl.AddQCategory(StepID, QDesc);
        }
        [WebMethod]
        public QCategoryInfo GetCategory(int CatID)
        {
            QuestionController oCtrl = new QuestionController();
            return oCtrl.GetQCategory(CatID);
        }

        [WebMethod]
        public void UpdateCategory(int CatID, string Desc, string OrderID) {
            QuestionController oCtrl = new QuestionController();
            oCtrl.UpdateCategory(CatID, Desc, OrderID);
        }

        [WebMethod]
        public int AddQuestion(string QuestionText, string QType, int QCategoryID, bool IsRequired, bool IsVisible,bool IsFullWidth, string HintText, string OrderID)
        {
            QuestionText = QuestionText.Replace("%20", " ");
            HintText = HintText.Replace("%20", " ");
            QuestionController octrl = new QuestionController();
            int _OrderID = int.Parse(OrderID);
            return octrl.AddQuestion(QuestionText, QType, QCategoryID, IsRequired, IsVisible, IsFullWidth, HintText, _OrderID);
        }

        [WebMethod]
        public QuestionInfo GetQuestion(string QID)
        {
            QuestionController octrl = new QuestionController();
            int _ID = int.Parse(QID);
            return octrl.GetQuestion(_ID);
        }

        [WebMethod]
        public void RemoveQuestion(string QID)
        {
            QuestionController octrl = new QuestionController();
            int _QuestionID = int.Parse(QID);
            octrl.RemoveQuestion(_QuestionID);
        }

        [WebMethod]
        public void UpdateQuestion(int QuestionID, string QuestionText, string QType, int QCategoryID, bool IsRequired, bool IsVisible, bool IsFullWidth,string HintText, int OrderID)
        {
            QuestionText = QuestionText.Replace("%20", " ");
            HintText = HintText.Replace("%20", " ");
            QuestionController octrl = new QuestionController();
            octrl.UpdateQuestion(QuestionID, QuestionText, QType, QCategoryID, IsRequired, IsVisible, IsFullWidth, HintText, OrderID);
        }

        [WebMethod]
        public void AddOption(string QID, string OptionText,string OnSelect)
        {
            OptionText = OptionText.Replace("%20", " ");
            QuestionController oCtrl = new QuestionController();
            int iOnSelect=int.Parse(OnSelect);
            oCtrl.AddOption(QID, OptionText, iOnSelect);
        }
      
        [WebMethod]
        public void RemoveOption(string OID)
        {
            QuestionController oCtrl = new QuestionController();
            oCtrl.RemoveOption(OID);
        }
        private bool addRoleToUser(UserInfo user)
        {
            var roleCtl = new RoleController();
            List<RoleInfo> lstRole = (List<RoleInfo>)roleCtl.GetRoles(user.PortalID);
            foreach (RoleInfo iRole in lstRole)
            {
                if (iRole.AutoAssignment == true)
                {
                    // attach user to all the auto-assigned Portal Roles
                    roleCtl.AddUserRole(user.PortalID, user.UserID, iRole.RoleID, DateTime.MinValue, DateTime.MaxValue);
                }
            }
            return true;
        }
        [WebMethod]
        public string RegisterUser(string UN, string FN, string LN, string EM, string P, string PH, string MB, string STR, string City, string State, string Zip, string GDR, string PID, string UR,string SRVC)
        {
            string rValue = "";
            UserInfo objUserInfo = new UserInfo();
            objUserInfo.Username = UN.Trim();
            string[] arrRoles = new string[] { "Registered" };
            objUserInfo.Roles = arrRoles;
            objUserInfo.PortalID = int.Parse(PID);
            objUserInfo.FirstName = FN;
            objUserInfo.LastName = LN;
            objUserInfo.DisplayName = FN + " " + LN;
            objUserInfo.Email = EM;
            objUserInfo.Membership.Approved = false;
            objUserInfo.Membership.Password = P;
            objUserInfo.Profile.Telephone = PH;
            objUserInfo.Profile.Cell = MB;
            objUserInfo.Profile.PostalCode = Zip;
            objUserInfo.Profile.Region = State;
            objUserInfo.Profile.City = City;
            objUserInfo.Profile.Street = STR;
          //  objUserInfo.Profile.Biography=
            objUserInfo.IsSuperUser = false;
            objUserInfo.Profile.SetProfileProperty("Street", STR);
            objUserInfo.Profile.SetProfileProperty("City", City);
            objUserInfo.Profile.SetProfileProperty("State", State);
            objUserInfo.Profile.SetProfileProperty("Gender", GDR);

            UserCreateStatus objUserCreateStatus = UserController.CreateUser(ref objUserInfo);

            // if user is created successfully then attach roles to user and login user to the portal
            if (objUserCreateStatus == UserCreateStatus.Success)
            {
                // once user is created successfully, attach user to different portal roles which are auto-assigned 
                addRoleToUser(objUserInfo);
                string PortalName = PortalController.GetPortalSetting("PortalName",int.Parse(PID), "");
                string HomeTabID = PortalController.GetPortalSetting("HomeTabId", int.Parse(PID),"0");

                int iHomeTabID = int.Parse(HomeTabID.ToString());
                // Now make user logged into the current portal
                UserController.UserLogin(int.Parse(PID), objUserInfo, PortalName, AuthenticationLoginBase.GetIPAddress(), true);
                SaveUserResponse(objUserInfo, UR);
                AssigneProviderService(objUserInfo, SRVC);
                // Send Email to Provider
                ComposeWelcomeMail(objUserInfo,false);
                // Add Notification
                NotificationController oNCtrl = new NotificationController();
                oNCtrl.AddNotification(-1, -1, 2, 1, objUserInfo.UserID);
                rValue = "1"; 
            }
            else
            {
                // Show error text message
                rValue = "0:" + objUserCreateStatus.ToString();
            }
            return rValue;
        }

        private void AssigneProviderService(UserInfo u, string SRVC)
        {
            // CSV format : UID:UID
            string[] aryStr = SRVC.Split('|'); // get the list of Services to add
            ServiceController oCtrl = new ServiceController();
            foreach (string s in aryStr)
            {
                if (s.Trim() != "")
                {
                    int SID = int.Parse(s.ToString());
                    oCtrl.AssignToProvider(u.UserID, SID);
                }
            }
        }

        private void SaveUserResponse(UserInfo u,string UR)
        {
           
            // Read the User response towards the given question to them during Registration
            // FORMAT : QuestionID_OptionID_OptionText|QuestionID2_OptionID_OptionText
            QuestionController oCtrl = new QuestionController();
            char[] delimiters = new char[] { '|' };
            string[] aryQuestions = UR.Split(delimiters, StringSplitOptions.RemoveEmptyEntries);
            int LastQuestionID = -1;
            string LastProfileInfo = "-1";
            foreach (string s in aryQuestions)
            {
                char[] deli = new char[] { '_' };
                string[] aryQInfo = s.Split(deli, StringSplitOptions.RemoveEmptyEntries);
                int QID = int.Parse(aryQInfo[0].ToString());
                
                int OID = int.Parse(aryQInfo[1].ToString());
                QuestionInfo oQuestion = oCtrl.GetQuestion(QID);
                string OptionText = "";
                if (aryQInfo.Length == 3)
                {
                    OptionText = aryQInfo[2].ToString();
                    OptionText = OptionText.Replace('~', '_');
                }
                if (aryQInfo.Length == 2)
                {
                    OptionText = aryQInfo[1].ToString();
                }
                // convert space code to real space
                OptionText = HttpUtility.HtmlEncode(OptionText);
                // Bio-graphy Field Related question, need to update it in DNN User Profile
                    if (QID == 26) 
                    {
                        if (OptionText.Trim() != "")
                        {
                            u.Profile.Biography = OptionText;
                            UserController.UpdateUser(0, u);
                        }
                    }
                    // Selfie and Profile Field linking, need to update it in DNN User Profile
                    if (QID == 14)
                    {
                        if (OptionText.Trim() != "")
                        {
                            int FileID = int.Parse(OptionText);
                            u.Profile.Photo = FileID.ToString();
                            UserController.UpdateUser(0, u);
                        }
                    }

                //int OptionID = int.Parse(o.ToString());
                oCtrl.AddUserResponse(u.UserID, QID, OID, OptionText);
                // Update Profile Property If any
                if ((oQuestion.ProfileProperty.Trim() != ""))
                {
                    // u.Profile.SetProfileProperty(oQuestion.ProfileProperty.Trim(), OptionText);
                    if (LastQuestionID == QID)
                    {
                        if (LastProfileInfo != "")
                        {
                            LastProfileInfo += "|" + OptionText;
                        }
                        else
                        {
                            LastProfileInfo = OptionText;
                        }
                        u.Profile.SetProfileProperty(oQuestion.ProfileProperty.Trim(), LastProfileInfo);
                    }
                    else
                    {
                        u.Profile.SetProfileProperty(oQuestion.ProfileProperty.Trim(), OptionText.Trim());
                        LastProfileInfo = OptionText.Trim();
                    }

                    UserController.UpdateUser(0, u);
                }
                else
                {
                    LastProfileInfo = OptionText.Trim();
                }

                LastQuestionID = QID;
                if (OID != -1)
                {
                    // ADD USER TO ROLE if choosen option has OnSelect defined
                    QuestionController oQCtrl = new QuestionController();
                    QuestionOptionInfo oQOption = oQCtrl.GetOption(OID.ToString());
                  
                    if (oQOption.OnSelect != -1)
                    {
                        RoleController oRCtrl = new RoleController();
                        RoleInfo oRole = oRCtrl.GetRoleById(u.PortalID, oQOption.OnSelect);
                        oRCtrl.AddUserRole(u.PortalID, u.UserID, oQOption.OnSelect, DateTime.MinValue, DateTime.MinValue);//u, oRole, oRMB.PortalSettings, RoleStatus.Approved, DateTime.MinValue, DateTime.MinValue, false, false);
                    }
                   
                }
                //TODO: For provider case, add selected services to the "ProviderService" table, get the ServiceID by Name from SDB

            }
            // Record in a separate table the user's registered through this Module
            oCtrl.AddUpdateUserRegister(u.UserID, "Pending", "", u.UserID);
        }
        
        [WebMethod]
        public List<NSR_User> ListOfUsers(string S,string K) {
            QuestionController oCtrl = new QuestionController();
           List<NSR_User> lstUser=oCtrl.ListOfRegisteredUser(S,K);
           foreach (NSR_User oUser in lstUser)
           {
               UserInfo tempUser = UserController.GetUserById(0, oUser.UserID);
               oUser.IsApproved = tempUser.Membership.Approved;
           }
           return lstUser;
        }

        [WebMethod]
        public int UpdateUserStatus(int PID,int UID,int Status,string R) {
            try
            {
                DotNetNuke.Entities.Users.UserController oCtrl = new UserController();
                DotNetNuke.Entities.Users.UserInfo oInfo = oCtrl.GetUser(PID, UID);
                QuestionController oQCtrl = new QuestionController();
                if (Status == 1)
                {
                    oInfo.Membership.Approved = true;
                    oQCtrl.AddUpdateUserRegister(UID, "Approved", R, -1);
                    // Add User to "Providers Role"
                    RoleController oRCtrl = new RoleController();
                    RoleInfo oRole= oRCtrl.GetRoleByName(PID,"Providers");
                    if (oRole!=null){
                        oRCtrl.AddUserRole(PID, UID, oRole.RoleID, DateTime.MinValue, DateTime.MinValue);
                    }
                    // send email on approval
                    ComposeWelcomeMail(oInfo, true);
                }
                else
                {
                    R = HttpUtility.UrlDecode(R);
                    oInfo.Membership.Approved = false;
                    oQCtrl.AddUpdateUserRegister(UID, "Rejected", R, -1);
                    ServiceController oServCtrl = new ServiceController();
                    // remove all services assigned to the provider during the user registration
                   oServCtrl.RemoveServiceForProvider(UID, -1);
                    //send email on rejection
                   ComposeRejectionMail(oInfo, R);
                }
                //now update the user approval status 
                UserController.UpdateUser(PID, oInfo);

                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        [WebMethod]
        public int UpdateActiveStatus(int UID, string Status)
        {
            //if (Session["NSR_Init"] != null)
            //{ // if user session is valid only then carry on the update status
                try
                {
                    DotNetNuke.Entities.Users.UserController oCtrl = new UserController();
                    DotNetNuke.Entities.Users.UserInfo oInfo = oCtrl.GetUser(0, UID);
                    if (Status == "1")
                    {
                        oInfo.Membership.Approved = true;
                    }
                    else
                    {
                        oInfo.Membership.Approved = false;
                    }
                    UserController.UpdateUser(0, oInfo);

                    return 1;
                }
                catch (Exception ex)
                {
                    return 0;
                }
          //  }
            //else
            //{
            //    return 2;// Invalid access found;
            //}
        }

        [WebMethod]
        public void UpdateUserNotes(int UID, string N) {
            if (UID > 0 && N.Trim() != "")
            {
                QuestionController oCtrl = new QuestionController();
                oCtrl.UpdateUserNotes(UID, N);
            }
        }

        [WebMethod]
        public string GetUserNotes(int UID)
        {
            string rValue = "";
            if (UID > 0)
            {
                QuestionController oCtrl = new QuestionController();
                NSR_User oUser = oCtrl.GetUserNotes(UID);
                if (oUser != null)
                {
                    rValue = (oUser.Notes == null ? "" : oUser.Notes);
                }
            }
            return rValue;
        }
        private void ComposeWelcomeMail(UserInfo objUserInfo, bool IsApproved)
        {
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
            string _SpafooLogo = portalSettings.DefaultPortalAlias + "/images/Spafoo-Email-Logo.png";
            string _Subject = "Welcome to Spafoo";
            string _Body = "Dear " + objUserInfo.FirstName + " " + objUserInfo.LastName + ",<br/><br/> We are so excited that you have decided to join our team. We have received your application and will begin processing the information as soon as possible.<br/><br/> We will be working to verify your information.  <br/><br/> Please be aware that if we do not have all of the information at the time of application we will send an email reminding you of any missing information. <br/><br/> We can’t wait for you to start working with Spafoo and to experience the opportunity of moving into the future within our industry.<br/><br/>Thank you,<br/><img src='" + _SpafooLogo + "'/>";
            if (IsApproved)
            {
                _Subject = "You are approved";
                _Body = "Dear " + objUserInfo.FirstName + " " + objUserInfo.LastName + ",<br/><br/> We are thrilled to have you on board. Your application process is now complete.<br/><br/> You have received approval from Spafoo to begin providing services through this modern industry tool. Attached to this email is your contract with Spafoo. <br/><br/>  It is now time for you to input your available hours and begin utilizing Spafoo for your professional services. You can Facebook, Tweet, Instagram or Linked In your new services at any time to promote your personal availability.<br/><br/>All the best,<br/><img src='" + _SpafooLogo + "'/>";
            }
            SendMail2User(objUserInfo, _Subject, _Body);
        }
        private void ComposeRejectionMail(UserInfo objUserInfo, string Reason)
        {
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
            string _SpafooLogo = portalSettings.DefaultPortalAlias + "/images/Spafoo-Email-Logo.png";
            string _Subject = "You are not approved";
            string _Body = "Dear " + objUserInfo.FirstName + " " + objUserInfo.LastName + ",<br/><br/> Your registration process cannot be completed due to following reason(s)<br/><br/> "+Reason+"<br/><br/>Thank you,<br/><img src='" + _SpafooLogo + "'/>";
            SendMail2User(objUserInfo, _Subject, _Body);
        }
        private string SendMail2User(UserInfo user, string Subject, string Body)
        {
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
            string _HostEmail = HostController.Instance.GetString("HostEmail").ToLower();
            DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail,user.Email, Subject, Body);
            return "";
        }
    }
}
