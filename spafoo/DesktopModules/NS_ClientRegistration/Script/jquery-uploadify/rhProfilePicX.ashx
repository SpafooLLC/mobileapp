<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_Registration.rhProfilePicX" Debug="true" %>
using System.Web;
using System.Web.SessionState;
using DotNetNuke.Services.FileSystem;
using System.Collections.Generic;
using System;
namespace Netsam.Modules.NSR_Registration
{
    /// <summary>
    /// Sachin : 15-May-2017 : This is new handler to upload the Cropped image using Base64String and add it to DNN File System
    /// </summary>
    public class rhProfilePicX : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
                context.Response.ContentType = "text/plain";
            // get the file upload control to know the file name
                HttpPostedFile uploadFiles = context.Request.Files[0];
            // get the Base64String
                string b64Str = context.Request.Params["b64str"].ToString();
            // Get the User Folder detail
                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, 1);
                DotNetNuke.Services.FileSystem.IFolderInfo userFolder = FolderManager.Instance.GetUserFolder(oUser);
                string DNNUploadPath = "/Portals/_default/" + userFolder.FolderPath;
                string TargetFolder = HttpContext.Current.Server.MapPath(DNNUploadPath);
                if (!System.IO.Directory.Exists(TargetFolder))
                {
                    System.IO.Directory.CreateDirectory(TargetFolder);
                }
            
            string _FileName = "UserProfile_" + DateTime.Now.ToString("yyyyMMdd_hhmmss") +  System.IO.Path.GetExtension(uploadFiles.FileName); // uploadFiles.FileName.Replace(' ', '_');
            string pathToSave = TargetFolder + "/" + _FileName;
            // clean the base64String 
            int indexOfBase64String = b64Str.IndexOf(",") + 1;
            int lenghtOfBase64String = b64Str.Length - indexOfBase64String;
            b64Str = b64Str.Substring(indexOfBase64String, lenghtOfBase64String);
            // convert b64String to Bytes
                byte[] bytes = System.Convert.FromBase64String(b64Str);
            // convert to Bytes to Stream
                System.IO.Stream stream = new System.IO.MemoryStream(bytes);
            if (!System.IO.File.Exists(pathToSave))
                {
                // Add File Stream to create file in DNN System
                    IFileInfo objFile = FileManager.Instance.AddFile(userFolder, _FileName,stream);
                // Return the FileID to client side so that it can be used further  
                    context.Response.Write(objFile.FileId.ToString() + "|" + "/Portals/_default/" + objFile.Folder + "/" + _FileName);// objFile.FileName
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