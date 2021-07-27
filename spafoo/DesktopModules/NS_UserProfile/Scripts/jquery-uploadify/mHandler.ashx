<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_UserProfile.mHandler" Debug="true" %>
using System.Web;
using System.Web.SessionState;
using System.IO;
using DotNetNuke.Entities.Profile;
using DotNetNuke.Services.FileSystem;
using DotNetNuke.Entities.Users;
using Netsam.Modules.NS_UserProfile.Components;
namespace Netsam.Modules.NSR_UserProfile
{
    public class mHandler : IHttpHandler,IRequiresSessionState  {
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Response.ContentType = "text/plain";
                HttpPostedFile uploadFiles = context.Request.Files[0];
                string UserID = context.Request.Params["UID"].ToString();
                int iUserID = int.Parse(UserID);
                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, iUserID);
                DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);
                string DNNUploadPath = "/Portals/0/" + userFolder.FolderPath + "/WorkSamples";
                string TargetFolder = HttpContext.Current.Server.MapPath(DNNUploadPath);
                if (!System.IO.Directory.Exists(TargetFolder))
                {
                    System.IO.Directory.CreateDirectory(TargetFolder);
                }

                // Save file to physical folder
                //string _FileName = uploadFiles.FileName.Replace(' ', '_');
                string _FileName = "Sample_" + System.DateTime.Now.ToString("yyyyMMdd_hhmmss") + System.IO.Path.GetExtension(uploadFiles.FileName); // uploadFiles.FileName.Replace(' ', '_');
                string pathToSave = TargetFolder + "/" + _FileName;
                uploadFiles.SaveAs(pathToSave);
                // Save information to database 
                string _FileID = context.Request.Params["FileId"].ToString();
                int iFileID = int.Parse(_FileID);
                NS_ProfileController oPCtrl = new NS_ProfileController();
                string SaveFileName = DNNUploadPath + "/" + _FileName;
                if (iFileID == 0)
                {// New file uploading, add it
                    oPCtrl.AddWorkSample(iUserID, SaveFileName);
                }
                else
                {// Existiing file id found, update it with new file name
                    oPCtrl.UpdateWorkSample(iFileID, SaveFileName);
                }
            }
            catch (System.Exception ex)
            {
                context.Response.Write(ex.InnerException.Message.ToString());
            }
            
        }
        
    public bool IsReusable {
        get {
            return false;
        }
    }
}

}