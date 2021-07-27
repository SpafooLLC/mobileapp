<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_Registration.Handler" Debug="true" %>
using System.Web;
using System.Web.SessionState;
using DotNetNuke.Services.FileSystem;
using System.Collections.Generic;
namespace Netsam.Modules.NSR_Registration
{
    public class Handler : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile uploadFiles = context.Request.Files[0];
            string _QID = context.Request.Form["QuestionID"].ToString();
            int iQuestionID = int.Parse(_QID);
            string _FileName = "Img" + System.DateTime.Now.ToString("yyyyMMddhhmmss") + System.IO.Path.GetExtension(uploadFiles.FileName); // uploadFiles.FileName.Replace(' ', '_');
            if (iQuestionID == 14)
            {/* selfie image if uploaded, 
              * upload it first to host user DNN folder 
              * and return the FILEID 
              * this FILEID will be assign to UserInfo.Profile.Photo while creating the new user
              */
                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, 1);
                DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);
                // FolderManager.Instance.
                string DNNUploadPath = "/Portals/0/" + userFolder.FolderPath;

                string TargetFolder = HttpContext.Current.Server.MapPath(DNNUploadPath);
                if (!System.IO.Directory.Exists(TargetFolder))
                {
                    System.IO.Directory.CreateDirectory(TargetFolder);
                }
              //  string _FileName = uploadFiles.FileName.Replace(' ', '_');

                IFileInfo objFile = FileManager.Instance.AddFile(userFolder, _FileName, uploadFiles.InputStream);
               
                context.Response.Write(objFile.FileId.ToString());
            }
            else
            {
                string virtualPath = HttpContext.Current.Session.SessionID;
                string TargetFolder = HttpContext.Current.Server.MapPath("~/images/NS_Registration/" + HttpContext.Current.Session.SessionID);
                if (!System.IO.Directory.Exists(TargetFolder))
                {
                    System.IO.Directory.CreateDirectory(TargetFolder);
                }
                string pathToSave = TargetFolder + "/" + _FileName;//uploadFiles.FileName.Replace(' ', '_');
                if (!System.IO.File.Exists(pathToSave))
                {
                    uploadFiles.SaveAs(pathToSave);
                    context.Response.Write(virtualPath + "/" + _FileName);
                }
                else
                {
                    context.Response.Write("Already");
                }
                
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