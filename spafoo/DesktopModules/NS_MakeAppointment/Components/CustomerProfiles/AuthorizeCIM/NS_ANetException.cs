using System;
using System.Net;
using Newtonsoft.Json;

namespace Netsam.AuthorizeNet
{
    [JsonObject(MemberSerialization.OptIn)]
    public class NS_ANetException : Exception
    {
        [JsonConstructor]
        internal NS_ANetException()
        {
        }

        internal static NS_ANetException GetFromJSON(HttpStatusCode code, string json)
        {
            var result = JsonConvert.DeserializeObject<NS_ANetException>(json);
            result.StatusCode = code;
            return result;
        }
        
        public override string Message {
            get {
                return FWError.Message;
            }
        }

        [JsonProperty (PropertyName="error")]
        public Shopism_FWError FWError { get; internal set; }

        public HttpStatusCode StatusCode { get; internal set; }
    }
}

