<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_Registration.Handler" Debug="true" %>
using System.Web;
using System.Web.SessionState;
namespace  Netsam.Modules.NSR_Registration
{
    public class Handler : IHttpHandler,IRequiresSessionState  {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile uploadFiles = context.Request.Files[0];
            string TargetFolder = HttpContext.Current.Server.MapPath("~/images/NS_Registration/" + HttpContext.Current.Session.SessionID);
            if (!System.IO.Directory.Exists(TargetFolder))
            {
                System.IO.Directory.CreateDirectory(TargetFolder);
            }
            string pathToSave = TargetFolder +"/"+ uploadFiles.FileName.Replace(' ', '_');
            uploadFiles.SaveAs(pathToSave);
        }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
}

}