<%@ WebHandler Language="C#" Class="Netsam.Modules.NSR_ServiceDashBoard.Handler" Debug="true" %>
using System.Web;
using System.Web.SessionState;
namespace Netsam.Modules.NSR_ServiceDashBoard
{
    public class Handler : IHttpHandler,IRequiresSessionState  {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpPostedFile uploadFiles = context.Request.Files[0];
            string SID = HttpContext.Current.Session["SDB_Session"].ToString();
            string TargetFolder = HttpContext.Current.Server.MapPath("~/images/NS_ServiceDB/" +SID);
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