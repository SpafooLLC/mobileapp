<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_UserProfile.HandlerX" Debug="true" %>
using System.Web;
using System.Web.SessionState;
using System.IO;
using DotNetNuke.Entities.Profile;
using DotNetNuke.Services.FileSystem;
using DotNetNuke.Entities.Users;
using Netsam.Modules.NS_UserProfile.Components;
namespace Netsam.Modules.NSR_UserProfile
{
    public class HandlerX : IHttpHandler,IRequiresSessionState  {
        public void ProcessRequest(HttpContext context)
        {
            try { 
            context.Response.ContentType = "text/plain";
            HttpPostedFile uploadFiles = context.Request.Files[0];
            // get the Base64String
            string b64Str = context.Request.Params["b64str"].ToString();

            string UserID = HttpContext.Current.Session["NS_UP_UserSession"].ToString();
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
            // string _FileName = uploadFiles.FileName.Replace(' ', '_');
            string _FileName = "Sample_" + System.DateTime.Now.ToString("yyyyMMdd_hhmmss") + System.IO.Path.GetExtension(uploadFiles.FileName); // uploadFiles.FileName.Replace(' ', '_');

            string pathToSave = TargetFolder + "/" + _FileName;
            //uploadFiles.SaveAs(pathToSave);
            // clean the base64String 
            int indexOfBase64String = b64Str.IndexOf(",") + 1;
            int lenghtOfBase64String = b64Str.Length - indexOfBase64String;
            b64Str = b64Str.Substring(indexOfBase64String, lenghtOfBase64String);
            // convert b64String to Bytes
            byte[] bytes = System.Convert.FromBase64String(b64Str);
            // File.WriteAllBytes("@" + pathToSave, bytes);
            // convert to Bytes to Stream
            System.IO.Stream stream = new System.IO.MemoryStream(bytes);
            FileStream fileStream = File.Create(pathToSave, (int)stream.Length);
            // Initialize the bytes array with the stream length and then fill it with data
            byte[] bytesInStream = new byte[stream.Length];
            stream.Read(bytesInStream, 0, bytesInStream.Length);
            // Use write method to write to the file specified above
            fileStream.Write(bytesInStream, 0, bytesInStream.Length);
            fileStream.Close();

            // Save information to database 
            string _FileID = context.Request.Form["FileId"].ToString();
            int iFileID = int.Parse(_FileID);
            NS_ProfileController oPCtrl = new NS_ProfileController();
            string SaveFileName = DNNUploadPath + "/" + _FileName;
            if (iFileID <= 0)
            {// New file uploading, add it
                oPCtrl.AddWorkSample(iUserID, SaveFileName);
            }
            else
            {// Existiing file id found, update it with new file name
                oPCtrl.UpdateWorkSample(iFileID, SaveFileName);
            }

             System.Web.HttpContext.Current.Response.Write("All done!"+DNNUploadPath +"--- "+iFileID);
        }catch(System.Exception ex)
            {
                System.Web.HttpContext.Current.Response.Write(ex.Message + ex.StackTrace);
            }
}

public bool IsReusable {
    get {
        return false;
    }
}
}

}