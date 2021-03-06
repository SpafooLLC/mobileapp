﻿<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_Registration.HandlerX" Debug="true" %>
using System.Web;
using System.IO;
using System.Web.SessionState;
using DotNetNuke.Services.FileSystem;
using System.Collections.Generic;
namespace Netsam.Modules.NSR_Registration
{
    public class HandlerX : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile uploadFiles = context.Request.Files[0];
            // get the Base64String
            string b64Str = context.Request.Params["b64str"].ToString();
            
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
               // string _FileName = uploadFiles.FileName.Replace(' ', '_');
               
                // clean the base64String 
                int indexOfBase64String = b64Str.IndexOf(",") + 1;
                int lenghtOfBase64String = b64Str.Length - indexOfBase64String;
                b64Str = b64Str.Substring(indexOfBase64String, lenghtOfBase64String);
                // convert b64String to Bytes
                byte[] bytes = System.Convert.FromBase64String(b64Str);
                // convert to Bytes to Stream
                System.IO.Stream stream = new System.IO.MemoryStream(bytes);
                IFileInfo objFile = FileManager.Instance.AddFile(userFolder, _FileName, stream);
               
                context.Response.Write(objFile.FileId.ToString());
            }
            else
            {
                string virtualPath = "/images/NS_Registration/" + HttpContext.Current.Session.SessionID;
                string TargetFolder = HttpContext.Current.Server.MapPath("~" + virtualPath);
                if (!System.IO.Directory.Exists(TargetFolder))
                {
                    System.IO.Directory.CreateDirectory(TargetFolder);
                }
                string pathToSave = TargetFolder + "/" + _FileName;//uploadFiles.FileName.Replace(' ', '_');
                if (!System.IO.File.Exists(pathToSave))
                {
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
                  //  uploadFiles.SaveAs(pathToSave);
                    context.Response.Write(virtualPath + "/" + _FileName);// uploadFiles.FileName.Replace(' ', '_'));
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