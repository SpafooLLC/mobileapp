using System;
using System.IO;
using System.Web;
namespace NS.Modules.NS_CityUserInfo
{
	public class DocumentHandler : IHttpHandler
	{
		public bool IsReusable
		{
			get
			{
				return false;
			}
		}
		public void ProcessRequest(HttpContext context)
		{
			context.Response.ContentType = "text/plain";
			try
			{
				string str = DateTime.Now.ToString("ddMMyyhhmmss") + "_";
				HttpPostedFile httpPostedFile = context.Request.Files["Filedata"];
				string text = "/DesktopModules/NS_CityUserInfo/UserUploads";
				text = context.Server.MapPath(text);
				string text2 = str + httpPostedFile.FileName;
				if (!Directory.Exists(text))
				{
					Directory.CreateDirectory(text);
				}
				httpPostedFile.SaveAs(text + "\\" + text2);
				context.Response.Write(text2);
				context.Response.StatusCode = 200;
			}
			catch (Exception ex)
			{
				context.Response.Write("Error: " + ex.Message);
			}
		}
	}
}
