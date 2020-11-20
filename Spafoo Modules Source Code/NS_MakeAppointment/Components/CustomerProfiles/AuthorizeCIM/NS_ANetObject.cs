using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Netsam.AuthorizeNet
{
    public class NS_ANetObject {
        [JsonProperty (PropertyName = "object")]
        public ANetObjectType Object { get; set; }
    }

    public class FWID : NS_ANetObject
    {
        [JsonProperty (PropertyName = "id")] 
        public string ID { get; set; }
    }

    [JsonConverter(typeof(Shopism_EnumConverter<ANetObjectType>))]
    public enum ANetObjectType {
        Unknown,
        AllocateLabels,
    }
}
