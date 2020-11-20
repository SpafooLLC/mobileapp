<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_Registration.rhProfilePic" Debug="true" %>
using System.Web;
using System.Web.SessionState;
using DotNetNuke.Services.FileSystem;
using System.Collections.Generic;
namespace Netsam.Modules.NSR_Registration
{
    public class rhProfilePic : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
                context.Response.ContentType = "text/plain";
                HttpPostedFile uploadFiles = context.Request.Files[0];

                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, 1);
                DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);
                // FolderManager.Instance.
                string DNNUploadPath = "/Portals/_default/" + userFolder.FolderPath;

                string TargetFolder = HttpContext.Current.Server.MapPath(DNNUploadPath);
                if (!System.IO.Directory.Exists(TargetFolder))
                {
                    System.IO.Directory.CreateDirectory(TargetFolder);
                }
                string _FileName = uploadFiles.FileName.Replace(' ', '_');
                string pathToSave = TargetFolder + "/" + _FileName;
                if (!System.IO.File.Exists(pathToSave))
                {
                    IFileInfo objFile = FileManager.Instance.AddFile(userFolder, _FileName,uploadFiles.InputStream);
                    context.Response.Write(objFile.FileId.ToString() + "|" + "/Portals/_default/" + objFile.Folder + "/" + objFile.FileName);
                }
                else
                {
                    context.Response.Write("Already");
                }
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