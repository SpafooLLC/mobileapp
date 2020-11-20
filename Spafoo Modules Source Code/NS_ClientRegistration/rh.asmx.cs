using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using DotNetNuke.Security.Membership;
using DotNetNuke.Security.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Netsam.Modules.MakeAppointment.Components;
using System.Threading;
using DotNetNuke.Entities.Controllers;
using DotNetNuke.Services.Authentication;
using DotNetNuke.Services.FileSystem;
using Netsam.Modules.NS_Registration.Components;
using System.IO;
namespace Netsam.Modules.NS_ClientRegistration
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
        public string RegisterUser(string UN, string FN, string LN, string EM, int PID, string P, string S, string C, string R, string Z, string Ph, string Mo, string PicFID, string HN, string DT, int IsWeb, string GDR)
        {
            string rValue = "";
            UserInfo objUserInfo = new UserInfo();
            objUserInfo.Username = UN.Trim();
            string[] arrRoles = new string[] { "Registered" };
            objUserInfo.Roles = arrRoles;
            objUserInfo.PortalID = PID;
            objUserInfo.FirstName = FN;
            objUserInfo.LastName = LN;
            objUserInfo.DisplayName = FN + " " + LN;
            objUserInfo.Email = EM;
            objUserInfo.Membership.Approved = true;
            objUserInfo.Membership.Password = P;
            objUserInfo.Profile.Telephone = Ph;
            objUserInfo.Profile.Cell = Mo;
            objUserInfo.Profile.Street = S;
            objUserInfo.Profile.City = C;
            objUserInfo.Profile.PostalCode = Z;
            objUserInfo.Profile.Region = R;
            objUserInfo.Profile.Country = "United States";
            objUserInfo.Profile.SetProfileProperty("Gender", GDR);
            if (PicFID != "") {
                objUserInfo.Profile.Photo = PicFID;
            }

            UserCreateStatus objUserCreateStatus = UserController.CreateUser(ref objUserInfo);

            // if user is created successfully then attach roles to user and login user to the portal
            if (objUserCreateStatus == UserCreateStatus.Success)
            {
                // Add User Hardware Information
                    UserHardwareController oUHCtrl = new UserHardwareController();
                if (IsWeb==1)
                {
                    oUHCtrl.AddUserHardware(objUserInfo.UserID, HN, DT, true);
                }
                else
                {
                    oUHCtrl.AddUserHardware(objUserInfo.UserID, HN, DT, false);
                }
                // login the user to the system
                    UserController.UserLogin(PID, objUserInfo, PortalSettings.Current.PortalName, DotNetNuke.Services.Authentication.AuthenticationLoginBase.GetIPAddress(), false);
                // once user is created successfully, attach user to different portal roles which are auto-assigned 
                    addRoleToUser(objUserInfo);
                // Send welcome Email to client
                    ComposeWelcomeMail(objUserInfo);
                    rValue = "1:" + objUserInfo.UserID.ToString();
            }
            else
            {
                // Show error text message
                rValue = "0:" + objUserCreateStatus.ToString();
            }
            return rValue;
        }

        private void ComposeWelcomeMail(UserInfo objUserInfo)
        {
            string FilePath1 = Server.MapPath("/DesktopModules/NS_ClientRegistration/Templates/EmailClientWelcome.htm");
            string _Body = File.ReadAllText(FilePath1);
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
           // string _SpafooLogo = portalSettings.DefaultPortalAlias + "/images/Spafoo-Email-Logo.png";
            string _Subject = "Welcome to Spafoo";
            // string _Body = "Dear " + objUserInfo.Username + ",<br/><br/> We are pleased to advise that you have been added to SpaFoo family. Please read the following information carefully and be sure to save this message in a safe location for future reference.  <br/> <br/> Portal Website Address: www.spafoo.com<br/>Username: " + objUserInfo.Username + "<br/><br/>If you do not know, or cannot remember, your password, please go to http://www.spafoo.com/default.aspx?ctl=PasswordReset&resetToken=c4f4f59b-f880-44fd-929b-6953854915ce to reset it.<br/><br/>Thank you, we appriciate your support...<br/><br/><img src='" + _SpafooLogo + "'/>";
            _Body = ParseEmailToken(_Body, objUserInfo, "");
            SendMail2User(objUserInfo, _Subject, _Body);
        }
        private string ParseEmailToken(string MailContent, UserInfo oUserInfo, string Reason)
        {

            MailContent = MailContent.Replace("[FirstName]", oUserInfo.FirstName);
            MailContent = MailContent.Replace("[LastName]", oUserInfo.LastName);
            MailContent = MailContent.Replace("[UserName]", oUserInfo.Username);
            MailContent = MailContent.Replace("[ResetLink]", "https://www.spafoo.com/default.aspx?ctl=PasswordReset&resetToken=" + oUserInfo.PasswordResetToken);
            return MailContent;
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

            RoleInfo oRole = roleCtl.GetRoleByName(user.PortalID, "Clients");
            if (oRole != null)
            {
                roleCtl.AddUserRole(user.PortalID, user.UserID, oRole.RoleID, DateTime.MinValue, DateTime.MaxValue);
            }
            return true;
        }

        private string SendMail2User(UserInfo user, string Subject, string Body)
        {
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
            string _HostEmail = HostController.Instance.GetString("HostEmail").ToLower();
            DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail, "sachinmcsd@gmail.com", Subject, Body);
            DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail, user.Email, Subject, Body);
            
            return "";
        }

        [WebMethod]
        public string ValidateUser(string U, string P)
        {
            UserInfo objUser = new UserInfo();     
            UserLoginStatus loginStatus = UserLoginStatus.LOGIN_FAILURE;
            objUser = UserController.ValidateUser(0, U, P, "DNN", "", "SpaFoo", AuthenticationLoginBase.GetIPAddress(), ref loginStatus);
            if (objUser != null)
            {
                if (loginStatus == UserLoginStatus.LOGIN_SUCCESS)
                {
                    UserController.UserLogin(0, objUser, "SpaFoo", AuthenticationLoginBase.GetIPAddress(), true);
                }
                return objUser.UserID.ToString();
            }
            else
            {
                return "false";
            }
        }

        [WebMethod]
        public string Logout()
        {
            try
            {
                DotNetNuke.Security.PortalSecurity objPS = new DotNetNuke.Security.PortalSecurity();
                objPS.SignOut();
                return "1";
            }
            catch (Exception ex)
            {
                return "0";
            }

        }
        [WebMethod]
        public string GetProfilePic(int FID)
        {
            string rValue = "";
            IFileInfo oFile = FileManager.Instance.GetFile(FID);
            if (oFile != null)
            {
                string FilePath1="/Portals/_default/"+oFile.RelativePath;
                string MapFilePath = HttpContext.Current.Server.MapPath(FilePath1);
                if (!System.IO.File.Exists(MapFilePath))
                {
                  //  System.IO.Directory.CreateDirectory(TargetFolder);
                    rValue = "/Portals/0/" + oFile.RelativePath;
                }
                else
                { 
                    rValue = FilePath1; 
                }
            }
            return rValue;
        }
    }
}