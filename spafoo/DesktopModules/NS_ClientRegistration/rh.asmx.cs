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
        public string RegisterUser(string UN, string FN, string LN, string EM,int PID,string P,string S,string C,string R,string Z,string Ph,string Mo)
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

            UserCreateStatus objUserCreateStatus = UserController.CreateUser(ref objUserInfo);

            // if user is created successfully then attach roles to user and login user to the portal
            if (objUserCreateStatus == UserCreateStatus.Success)
            {
                // login the user to the system
                    UserController.UserLogin(PID, objUserInfo, PortalSettings.Current.PortalName, DotNetNuke.Services.Authentication.AuthenticationLoginBase.GetIPAddress(), false);
                // once user is created successfully, attach user to different portal roles which are auto-assigned 
                addRoleToUser(objUserInfo);

                //ComposeWelcomeMail(objUserInfo);
                rValue = "1:"+objUserInfo.UserID.ToString();
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
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
            string _SpafooLogo = portalSettings.DefaultPortalAlias + "/images/Spafoo-Email-Logo.png";
            string _Subject = "Welcome to Spafoo";
            string _Body = "Dear " + objUserInfo.FirstName + " " + objUserInfo.LastName + ",<br/><br/> We are so excited that you have decided to join our team. We have received your application and will begin processing the information as soon as possible. We will be working to verify your information.  <br/> <br/> Please be aware that if we do not have all of the information at the time of application we will send an email reminding you of any missing information. <br/> <br/>We can’t wait for you to start working with Spafoo and to experience the opportunity of moving into the future within our industry.<br/><br/>Thank you,<br/><img src='" + _SpafooLogo + "'/>";
            SendMail2User(objUserInfo, _Subject, _Body);
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
            DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail,user.Email, Subject, Body);
            return "";
        }
    }
}
