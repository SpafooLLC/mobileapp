﻿using DotNetNuke.Common.Utilities;
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
    public class ProfileHandlerX : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            // get the file upload control to know the file name
                HttpPostedFile uploadFiles = context.Request.Files[0];
            // get the Base64String
                string b64Str = context.Request.Params["b64str"].ToString();

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
               // string _FileName = uploadFiles.FileName.Replace(' ', '_');
                string _FileName = "Profile" + System.DateTime.Now.ToString("yyyyMMddhhmmss") + System.IO.Path.GetExtension(uploadFiles.FileName); // uploadFiles.FileName.Replace(' ', '_');
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
                    IFileInfo objFile = FileManager.Instance.AddFile(userFolder, _FileName, stream);

                    //FileInfo objFile = objFiles.GetFile(pathToSave, 0);
                    oUser.Profile.Photo = objFile.FileId.ToString();
                    //ProfileController.UpdateUserProfile(oUser);
                    UserController.UpdateUser(oUser.PortalID, oUser);
                    // Return the FileID to client side so that it can be used further  
                    context.Response.Write(objFile.FileId.ToString() + "|" + "/Portals/0/" + objFile.Folder + "/" + _FileName);//objFile.FileName
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