using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using System.Globalization;
using DotNetNuke.Entities.Users;
using Netsam.Modules.NS_UserProfile.Components;
using DotNetNuke.Services.FileSystem;
using Netsam.Modules.MakeAppointment.Components;
using DotNetNuke.Security.Roles;
using DotNetNuke.Common.Lists;
namespace Netsam.Modules.NS_UserProfile
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class rh : System.Web.Services.WebService
    {
        [WebMethod(enableSession:true)]
        public string UpdateUser(int UserID,string FN,string LN,string E,string P,string Mo,string Str,string City,string Region,string PC,string DN,string Bio,string TagLine,string Gender,string TOE,string Lic,string SSN,string EIN,string uPOS)
        {
            string rValue = "1";
            //if (Session["NS_UP_Session"] != null)
            //{
                try
                {
                    UserInfo oUser = new UserInfo();

                    UserController oCtrl = new UserController();
                    oUser = oCtrl.GetUser(0, UserID);
                    oUser.FirstName = FN;
                    oUser.LastName = LN;
                    oUser.Email = E;
                    oUser.Profile.Telephone = P;
                    oUser.Profile.Cell = Mo;
                    oUser.Profile.Street = Str;
                    oUser.Profile.City = City;
                    oUser.Profile.Region = Region;
                    oUser.Profile.PostalCode = PC;
                    oUser.DisplayName = DN;
                    oUser.Profile.Biography = Bio;
                    rValue = "2"; 
                    oUser.Profile.SetProfileProperty("Gender", Gender);
                    rValue = "3"; 
                    if (TOE.Trim() != "")
                    {
                        oUser.Profile.SetProfileProperty("TypeOfEntity", TOE);
                    }
                    if (Lic.Trim() != "")
                    {
                        oUser.Profile.SetProfileProperty("License", Lic);
                    }
                    if (SSN.Trim() != "")
                    {
                        oUser.Profile.SetProfileProperty("SSN", SSN);
                    }
                    if (EIN.Trim() != "")
                    {
                        oUser.Profile.SetProfileProperty("EIN", EIN);
                    }
                    UserController.UpdateUser(0, oUser);
                    if (uPOS.Trim() != "")
                    {
                        // Update Provider's Applied Positions with spafoo
                        string[] aryUPos = uPOS.Split('|');
                        string oUPos = "";
                        foreach (string oChk in aryUPos)
                        {
                            if (oChk.Trim() != "")
                            {
                                string[] aryChk = oChk.Split('_');
                                int chkRoleID = int.Parse(aryChk[0].ToString());
                                if (aryChk[1] == "1")
                                {// if checkbox is ticked
                                    RoleController oRCtrl = new RoleController();
                                    RoleInfo oRole = oRCtrl.GetRoleById(0, chkRoleID);
                                    if (!oUser.IsInRole(oRole.RoleName))
                                    {
                                        oRCtrl.AddUserRole(oUser.PortalID, oUser.UserID, chkRoleID, DateTime.MinValue, DateTime.MinValue);

                                    }
                                    oUPos += chkRoleID + "|";
                                }
                                if (aryChk[1] == "0")
                                {// if checkbox is NOT ticked
                                    RoleController oRCtrl = new RoleController();
                                    RoleInfo oRole = oRCtrl.GetRoleById(0, chkRoleID);
                                    DotNetNuke.Entities.Portals.PortalSettings oPS = DotNetNuke.Entities.Portals.PortalController.Instance.GetCurrentPortalSettings();
                                    if (oUser.IsInRole(oRole.RoleName))
                                    {
                                        RoleController.DeleteUserRole(oUser, oRole, oPS, false);
                                    }
                                }
                            }
                        }
                        // Update the user for his positions if any changed found
                        oUser.Profile.SetProfileProperty("PositionsApplying", oUPos);
                    }
                        UserController.UpdateUser(0, oUser);
                    // Update Provider's Tag Line
                        if (TagLine.Trim() != "")
                        {
                            NS_ProfileController oProCtrl = new NS_ProfileController();
                            oProCtrl.UpdateProTagLine(UserID, TagLine);
                        }
                    // Update User activity for notification
                        NotificationController oNCtrl = new NotificationController();
                        oNCtrl.AddNotification(UserID, -1, 3, 0, -1);
                    return "Success";
                }
                catch (Exception ex)
                {
                    return "Error";

                }
        }

        [WebMethod]
        public string GetProTagLine(int UID)
        {
            NS_ProfileController oCtrl = new NS_ProfileController();
            return oCtrl.GetProTagLine(UID);
        }

        [WebMethod]
        public void RemoveMySample(int UserID,string FilePath)
        {
            // DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
            //DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, UserID);
            //DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);

            //FileManager.Instance.
            //IFileInfo oFile= FileManager.Instance.GetFile(userFolder,FilePath);
            NS_ProfileController oProCtrl = new NS_ProfileController();
            oProCtrl.RemoveWorkSample(UserID, FilePath);
            //FileManager.Instance.DeleteFile(oFile);
        }

        [WebMethod]
        public string ChangePassword(int UserId, string CP, string NP, string CNP)
        {
            string rValue = "1";
            if (CP != "" && NP != "" && NP == CNP)
            {
                rValue = "2";
                try
                {
                    UserController oUserCtrl = new UserController();
                    UserInfo oUser = oUserCtrl.GetUser(0, UserId);
                    DotNetNuke.Entities.Portals.PortalController oPortalCtrl = new DotNetNuke.Entities.Portals.PortalController();
                    DotNetNuke.Entities.Portals.PortalInfo oPortalInfo = oPortalCtrl.GetPortal(0);

                    DotNetNuke.Security.Membership.UserLoginStatus loginStatus = DotNetNuke.Security.Membership.UserLoginStatus.LOGIN_FAILURE;
                    rValue = "3";
                    
                    UserInfo oNewUser = UserController.ValidateUser(0, oUser.Username, CP, "DNN", "", oPortalInfo.PortalName, "", ref loginStatus);
                    rValue = "4";
                    if (oNewUser != null)
                    {
                        rValue = "5";
                        if (DotNetNuke.Entities.Users.UserController.ChangePassword(oNewUser, CP, NP))
                        {
                            rValue="Password changed successfully";
                        }
                        else
                        {
                            rValue = "Unable to change the password";
                        }
                    }
                    else
                    {
                        rValue = "6";
                        rValue="You have given a invalid current password"; 
                    }
                }
                catch(Exception ex)
                {
                    rValue = "Could not update your password:<br/><br/><i> " + ex.Message.ToString() + "</i>";
                }
            }
            return rValue;
        }

        [WebMethod]
        public string ResetPassword(string Username, string PasswordAnswer)
        {
            string rVal = "";
            UserInfo oUserInfo= UserController.GetUserByName(Username);
            if (oUserInfo!=null){
                UserController.ResetPassword(oUserInfo, PasswordAnswer);
                //UserController.ResetPasswordToken()
                rVal = "1:Password reset link is sent over email";
            }
            else
            {
                rVal = "0:Invalid username";
            }
            return rVal;
        }

        [WebMethod]
        public string ChangePasswordQA(string Username, string pwd, string pwdQ,string pwdA)
        {
            string rVal = "";
            UserInfo oUserInfo = UserController.GetUserByName(Username);
            if (oUserInfo != null)
            {
                if (UserController.ChangePasswordQuestionAndAnswer(oUserInfo, pwd, pwdQ, pwdA))
                {
                    rVal = "1:Password Question & Answer are updated successfully.";
                }
                else
                {
                    rVal = "2:Could not update the Question & Answer";
                }
            }
            else
            {
                rVal = "0:Invalid username";
            }
            return rVal;
        }

        [WebMethod]
        public List<ListEntryInfo> GetRegions()
        {
            DotNetNuke.Common.Lists.ListController lc = new DotNetNuke.Common.Lists.ListController();
            List<ListEntryInfo> leRegions = lc.GetListEntryInfoItems("Region", "Country.US", 0).ToList();
            return leRegions;
        }
        [WebMethod]
        public string GetUserType(string UID)
        {
            string rValue = "";
            int iUID = int.Parse(UID);
            UserController oCtrl = new UserController();
            UserInfo oUser = oCtrl.GetUser(0,iUID);
            if (oUser.IsInRole("Providers"))
            { rValue="P";}
            if (oUser.IsInRole("Clients"))
            { rValue = "C"; }
            return rValue;
        }
    }
}
