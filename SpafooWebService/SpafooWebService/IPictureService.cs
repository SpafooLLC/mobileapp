using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace PictureService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IChatService" in both code and config file together.
    [ServiceContract]
    public interface IPictureProfileService
    {
        [OperationContract]
        //[WebInvoke(ResponseFormat = WebMessageFormat.Json, UriTemplate = "PostImage/{filenames}", Method = "POST")]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "PostImage")]
        //[OperationContract]
        //[WebInvoke(Method = "POST", UriTemplate = "PostImage/{filenames}")]

        string PostImage();
        //[OperationContract]
        //[WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped,Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "PostImagePostted")]
        //string PostImagePostted();



    }
}
