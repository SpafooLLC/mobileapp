using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Users;
using DotNetNuke.Services.FileSystem;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Netsam.Modules.NS_UserProfile.Scripts
{
    /// <summary>
    /// Summary description for ProfileHandler
    /// </summary>
    public class ProfileHandler : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile uploadFiles = context.Request.Files[0];
            string UserID = HttpContext.Current.Session["NS_UP_UserSession"].ToString();
            int iUserID = int.Parse(UserID);
            DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
            DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, iUserID);
            DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);
           // FolderManager.Instance.
            string DNNUploadPath = "/Portals/0/" + userFolder.FolderPath;

            string TargetFolder = HttpContext.Current.Server.MapPath(DNNUploadPath);
            if (!System.IO.Directory.Exists(TargetFolder))
            {
                System.IO.Directory.CreateDirectory(TargetFolder);
            }
            //string _FileName = uploadFiles.FileName.Replace(' ', '_');
            string _FileName = "Profile" + System.DateTime.Now.ToString("yyyyMMddhhmmss") + System.IO.Path.GetExtension(uploadFiles.FileName); // uploadFiles.FileName.Replace(' ', '_');
            string pathToSave = TargetFolder + "/" + _FileName;
            if (!System.IO.File.Exists(pathToSave))
            {
                IFileInfo objFile = FileManager.Instance.AddFile(userFolder, _FileName, uploadFiles.InputStream);

                //FileInfo objFile = objFiles.GetFile(pathToSave, 0);
                oUser.Profile.Photo = objFile.FileId.ToString();
                //ProfileController.UpdateUserProfile(oUser);
                UserController.UpdateUser(oUser.PortalID, oUser);
            }
            else
            {
                context.Response.Write("Already");
            }
               //DotNetNuke.Services.FileSystem.IFolderInfo fi = DotNetNuke.Services.FileSystem.FolderManager.Instance.GetUserFolder(oUser);
               //DotNetNuke.Services.FileSystem.IFileInfo file;

               //using (FileStream localFileStream = new FileStream(pathToSave, FileMode.Open))
               //{
               //    file = DotNetNuke.Services.FileSystem.FileManager.Instance.AddFile(fi, _FileName, localFileStream);
               //    oUser.Profile.Photo = file.FileId.ToString();
               //    UserController.UpdateUser(oUser.PortalID, oUser);
               //}

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}