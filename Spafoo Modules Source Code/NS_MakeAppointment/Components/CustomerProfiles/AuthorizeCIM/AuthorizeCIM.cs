/* 
   Date of Creation :21st April 2015
 * 
 * Author : Sachin Srivastava
 * 
 * Owned : Shopism Web Design Private Limited
 * 
 * Purpose : To communicate with FastWay Delivery API to process Methods for the given parameters
 * 
 * Project Reference : Newtonsoft Library
 */
using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;

namespace Netsam.AuthorizeNet
{
    public class NS_AuthorizeCIM
    {
        static readonly string LIVE_API_EndPoint = " https://api.authorize.net/xml/v1/request.api";
        static readonly string TEST_API_EndPoint = "https://apitest.authorize.net/xml/v1/request.api";
      //  static readonly string subscription_path = "{0}/customers/{1}/subscription";
        static readonly string user_agent = "Authorize.NET v2";
        static readonly Encoding encoding = Encoding.UTF8;
        static readonly string ANetAPIMode = "TEST";
        private static string ANetAPIKey = "7fbffe93698140efa36b7ce0167fecd0";
        ICredentials credential;
        public int TimeoutSeconds { get; set; }
        public NS_AuthorizeCIM(string APIKey)
        { 
            if (!String.IsNullOrEmpty(APIKey)){
                ANetAPIKey = APIKey;
                this.TimeoutSeconds = 1200;
            }
        }
        #region Shared Methods
        protected virtual WebRequest SetupRequest(string method, string url)
        {
            WebRequest req = (WebRequest)WebRequest.Create(url);
            req.Method = method;
            if (req is HttpWebRequest)
            {
                ((HttpWebRequest)req).UserAgent = user_agent;
            }
            req.Credentials = credential;
            req.PreAuthenticate = true;
            req.Timeout = TimeoutSeconds * 1000;
            if (method == "POST")
                req.ContentType = "application/x-www-form-urlencoded";
            return req;
        }

        static string GetResponseAsString(WebResponse response)
        {
            using (StreamReader sr = new StreamReader(response.GetResponseStream(), encoding))
            {
                return sr.ReadToEnd();
            }
        }

        protected virtual T DoRequest<T>(string endpoint, string method = "GET", string body = null)
        {
            var json = DoRequest(endpoint, method, body);
            return JsonConvert.DeserializeObject<T>(json);
        }

        protected virtual string DoRequest(string endpoint)
        {
            return DoRequest(endpoint, "GET", null);
        }

        protected virtual string DoRequest(string endpoint, string method, string body)
        {
            string result = null;
            WebRequest req = SetupRequest(method, endpoint);
            if (body != null)
            {
                byte[] bytes = encoding.GetBytes(body.ToString());
                req.ContentLength = bytes.Length;
                using (Stream st = req.GetRequestStream())
                {
                    st.Write(bytes, 0, bytes.Length);
                }
            }

            try
            {
                using (WebResponse resp = (WebResponse)req.GetResponse())
                {
                    result = GetResponseAsString(resp);
                    int _LastPosition=result.LastIndexOf(',');
                    result = result.Substring(10, (_LastPosition - 10));
                }
            }
            catch (WebException wexc)
            {
                if (wexc.Response != null)
                {
                    string json_error = GetResponseAsString(wexc.Response);
                    HttpStatusCode status_code = HttpStatusCode.BadRequest;
                    HttpWebResponse resp = wexc.Response as HttpWebResponse;
                    if (resp != null)
                        status_code = resp.StatusCode;

                    if ((int)status_code <= 500)
                        throw NS_ANetException.GetFromJSON(status_code, json_error);
                }
                throw;
            }
            return result;
        }

        protected virtual StringBuilder UrlEncode(IUrlEncoderInfo infoInstance)
        {
            StringBuilder str = new StringBuilder();
            infoInstance.UrlEncode(str);
            if (str.Length > 0)
                str.Length--;
            return str;
        }

#endregion

#region Allocate Labels
        public NS_AuthProfile AuthProfile(string PickupPostcode, string PickupTown, string PickupRFCode, string DeliveryPostcode, string DeliveryTown, string WeightInKg, string CountryCode, string LabelColour, string ClientIdentifier, string TestMode)
        {
            StringBuilder str = new StringBuilder();
            if (PickupPostcode.Trim()!="") {
                str.AppendFormat("PickupPostcode={0}&", PickupPostcode);
            }
            if (PickupTown.Trim()!="")
            {
                str.AppendFormat("PickupTown={0}&", PickupTown);
            }
            if (PickupRFCode.Trim()!="")
            {
                str.AppendFormat("PickupRFCode={0}&", PickupRFCode);
            }
            if (DeliveryPostcode.Trim()!="")
            {
                str.AppendFormat("DeliveryPostcode={0}&", DeliveryPostcode);
            }
            if (DeliveryTown.Trim()!="")
            {
                str.AppendFormat("DeliveryTown={0}&", DeliveryTown);
            }
            if (WeightInKg.Trim()!="")
            {
                str.AppendFormat("WeightInKg={0}&", WeightInKg);
            }
            if (CountryCode.Trim()!="")
            {
                str.AppendFormat("CountryCode={0}&", CountryCode);
            }
            if (LabelColour.Trim()!="")
            {
                str.AppendFormat("LabelColour={0}&", LabelColour);
            }
            if (ClientIdentifier.Trim()!="")
            {
                str.AppendFormat("ClientIdentifier={0}&", ClientIdentifier);
            }
            if (TestMode.Trim()!="")
            {
                str.AppendFormat("TestMode={0}&", TestMode);
            }

            // Get EndPoint
            string APIEndPoint = GetEndPoint();
            string ep = String.Format("{0}/dynamiclabels/allocatev2?api_key={2}&{1}", APIEndPoint, str, ANetAPIKey);
            return DoRequest<NS_AuthProfile>(ep, "POST", str.ToString());
        }
      
        public Shopism_FWFranchise Shopism_ListFranchisesByCountry(int CountryCode){
            List<Shopism_FWFranchise> lstFranchise = new List<Shopism_FWFranchise>();
            StringBuilder str = new StringBuilder();
            str.AppendFormat("&CountryCode=" + CountryCode.ToString());
            // Get EndPoint
            string APIEndPoint = GetEndPoint();
            string ep = String.Format("{0}/psc/listrfs/?api_key={2}&{1}", APIEndPoint, str, ANetAPIKey);
            return DoRequest<Shopism_FWFranchise>(ep, "POST", str.ToString());
        }

        public Shopism_FWFranchise Shopism_ListFranchisesByPostCode(int CountryCode,string PostCode)
        {
            List<Shopism_FWFranchise> lstFranchise = new List<Shopism_FWFranchise>();
            StringBuilder str = new StringBuilder();
            str.AppendFormat("&PostCode=" + PostCode);
            str.AppendFormat("&CountryCode=" + CountryCode.ToString());
            // Get EndPoint
            string APIEndPoint = GetEndPoint();
            string ep = String.Format("{0}/psc/pickuprf/?api_key={2}&{1}", APIEndPoint, str, FWAPIKey);
            return DoRequest<Shopism_FWFranchise>(ep, "POST", str.ToString());
        }
        protected string WithSeperator(string Parameter) {
            return "/" + Parameter;
        }
        protected string GetEndPoint()
        {
            // Make EndPoint
            string APIEndPoint = LIVE_API_EndPoint; // Default END point should be set to LIVE

            if (ANetAPIMode == "TEST")
            {// In case API is in TEST Mode
                APIEndPoint = TEST_API_EndPoint;
            }
            return APIEndPoint;
        }
#endregion

    }
}
