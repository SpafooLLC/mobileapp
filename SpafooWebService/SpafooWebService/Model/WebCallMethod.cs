using System.Net;
using System.IO;
using System;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SpafooWebService.Model
{
    public class WebCallMethod
    {

        private static string weblink(int i)
        {
            string uri = string.Empty;
            switch (i)
            {
                case 1:
                    uri = "http://www.spafoo.com/DesktopModules/NS_ClientRegistration/rh.asmx/"; break;
                case 2:
                    uri = "http://www.spafoo.com/DesktopModules/NS_MakeAppointment/rh.asmx/"; break;
                case 3:
                    uri = "http://www.spafoo.com/DesktopModules/NS_ServiceDashBoard/rh.asmx/"; break;
                case 4:
                    uri = "http://www.spafoo.com/DesktopModules/NS_UserProfile/rh.asmx/"; break;
                case 5:
                    uri = "http://www.spafoo.com/DesktopModules/NS_Registration/rh.asmx/"; break;
                case 6:
                    uri = "http://www.spafoo.com/DesktopModules/NS_ManageScheduledServices/rh.asmx/"; break;


            }
            return uri;


        }

        public static string WRequest(int UrlId, string method, string postData)
        {
            string URL = weblink(UrlId) + method;
            string stuff = null;
            try
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(URL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.KeepAlive = false;
                httpWebRequest.Timeout = 600000;


                httpWebRequest.KeepAlive = false;
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                System.Net.ServicePointManager.MaxServicePointIdleTime = 60000;
                // httpWebRequest.ServicePoint.Expect100Continue = false;

                System.Net.ServicePointManager.Expect100Continue = false;

                if (httpWebRequest.Method == "POST")
                {
                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        //string postData = "{\"UID\": \"135\"}";
                        streamWriter.Write(postData);
                        streamWriter.Flush();
                        streamWriter.Close();
                    }
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                string results;
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    results = streamReader.ReadToEnd();
                }

                stuff = results;
                // JObject jObject = JObject.Parse(results);
                // stuff = jObject["d"].ToString();
                //    obj = JsonConvert.DeserializeObject<MakeAppointment.NotificationInfo[]>(jObject["d"].ToString());

                //   var obj = Newtonsoft.Json.JsonConvert.DeserializeObject(results);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                // Common.SaveLog(ex.Message, "SendAndroidNotification", "NotificationService", "MobileApp");
            }
            return stuff;
        }
        public static string WRequestobj(int UrlId, string method, string postData)
        {
            string URL = weblink(UrlId) + method;
            object obj = null;
            string stuff = null;
            try
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(URL);
 

                httpWebRequest.ContentType = "application/json;charset=UTF-8";
                httpWebRequest.Method = "POST";
                httpWebRequest.KeepAlive = false;
                httpWebRequest.Timeout = 600000;


                httpWebRequest.KeepAlive = false;
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                System.Net.ServicePointManager.MaxServicePointIdleTime = 60000;
                // httpWebRequest.ServicePoint.Expect100Continue = false;

                System.Net.ServicePointManager.Expect100Continue = false;

                if (httpWebRequest.Method == "POST")
                {
                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        //string postData = "{\"UID\": \"135\"}";
                        streamWriter.Write(postData);
                        streamWriter.Flush();
                        streamWriter.Close();
                    }
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                string results;
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    results = streamReader.ReadToEnd();
                }

                //  stuff = results;
                //  JObject jObject = JObject.Parse(results);

                //obj = JsonConvert.DeserializeObject<MakeAppointment.NotificationInfo[]>(jObject["d"].ToString());
                JObject jObject = JObject.Parse(results);
                stuff = jObject["d"].ToString();
            }

            catch (WebException ex)
            {
                Console.WriteLine(ex);
                if (ex.Status == WebExceptionStatus.ProtocolError)
                {
                    HttpWebResponse response = ex.Response as HttpWebResponse;
                }
            }
            return stuff;
        }

        public static IDisposable SetTimeout(Action method, int delayInMilliseconds)
        {
            System.Timers.Timer timer = new System.Timers.Timer(delayInMilliseconds);
            timer.Elapsed += (source, e) =>
            {
                method();
            };

            timer.AutoReset = false;
            timer.Enabled = true;
            timer.Start();

            // Returns a stop handle which can be used for stopping
            // the timer, if required
            return timer as IDisposable;
        }


    }
}