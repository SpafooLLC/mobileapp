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
namespace Netsam.Modules.NS_UserProfile
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class rh : System.Web.Services.WebService
    {
        [WebMethod(enableSession:true)]
        public string UpdateUser(int UserID,string FN,string LN,string E,string P,string Str,string City,string Region,string PC,string DN,string Bio,string TagLine,string Gender,string TOE,string Lic,string SSN,string EIN,string uPOS)
        {

            if (Session["NS_UP_Session"] != null)
            {
                try
                {
                    UserInfo oUser = new UserInfo();

                    UserController oCtrl = new UserController();
                    oUser = oCtrl.GetUser(0, UserID);
                    oUser.FirstName = FN;
                    oUser.LastName = LN;
                    oUser.Email = E;
                    oUser.Profile.Telephone = P; ;
                    oUser.Profile.Street = Str;
                    oUser.Profile.City = City;
                    oUser.Profile.Region = Region;
                    oUser.Profile.PostalCode = PC;
                    oUser.DisplayName = DN;
                    oUser.Profile.Biography = Bio;
                    oUser.Profile.SetProfileProperty("Gender", Gender);
                    oUser.Profile.SetProfileProperty("TypeOfEntity", TOE);
                    oUser.Profile.SetProfileProperty("License", Lic);
                    oUser.Profile.SetProfileProperty("SSN", SSN);
                    oUser.Profile.SetProfileProperty("EIN", EIN);

                    UserController.UpdateUser(0, oUser);

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
            else
            {
                return "Invalid access found";
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
    }
}
