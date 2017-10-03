using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Web;


namespace PictureService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ChatService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ChatService.svc or ChatService.svc.cs at the Solution Explorer and start debugging.
    
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class PictureProfileService : IPictureProfileService
    {
        public string PostImage()
        {
           
            try
            {
                HttpPostedFile file = HttpContext.Current.Request.Files["file"];
                if (file == null)
                    return null;
                string path = HttpContext.Current.Server.MapPath("~/ProfileImages/");
                string preFix = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString();
                string targetFilePath = Path.Combine(path, preFix + file.FileName);
                file.SaveAs(targetFilePath);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



    }
}
