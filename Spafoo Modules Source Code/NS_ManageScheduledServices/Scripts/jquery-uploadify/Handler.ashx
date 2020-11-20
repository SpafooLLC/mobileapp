<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_Registration.Handler" Debug="true" %>
using System.Web;
using System.Web.SessionState;
using Netsam.Modules.MakeAppointment.Components;
namespace  Netsam.Modules.NSR_Registration
{
    public class Handler : IHttpHandler,IRequiresSessionState  {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile uploadFiles = context.Request.Files[0];
            int UserID = int.Parse(context.Request.Form["UID"].ToString());
            int AID = int.Parse(context.Request.Form["AID"].ToString());
            
            string SID = HttpContext.Current.Session["MSS_Session"].ToString();
            string _RelativePath="~/images/NS_Appointments/" + SID;
            string TargetFolder = HttpContext.Current.Server.MapPath(_RelativePath);
            if (!System.IO.Directory.Exists(TargetFolder))
            {
                System.IO.Directory.CreateDirectory(TargetFolder);
            }
           // string _FileName=uploadFiles.FileName.Replace(' ', '_');
            string _FileName = "Img_" + System.DateTime.Now.ToString("yyyyMMdd_hhmmss") + System.IO.Path.GetExtension(uploadFiles.FileName); // uploadFiles.FileName.Replace(' ', '_');
            string pathToSave = TargetFolder +"/"+ _FileName;
            uploadFiles.SaveAs(pathToSave);
            AppointmentController oCtrl = new AppointmentController();
            oCtrl.AddAppointmentPhoto(UserID, AID, _RelativePath + "/" + _FileName);
        }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
}

}