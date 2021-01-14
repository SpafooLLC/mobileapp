using Newtonsoft.Json;

namespace Netsam.AuthorizeNet
{
    [JsonObject(MemberSerialization.OptIn)]
    public class Shopism_FWError {
        [JsonProperty (PropertyName="code")]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "param")]
        public string Parameter { get; set; }
        [JsonProperty(PropertyName = "type")]
        public string ErrorType { get; set; }
        [JsonProperty(PropertyName = "message")]
        public string Message { get; set; }
    }
}
