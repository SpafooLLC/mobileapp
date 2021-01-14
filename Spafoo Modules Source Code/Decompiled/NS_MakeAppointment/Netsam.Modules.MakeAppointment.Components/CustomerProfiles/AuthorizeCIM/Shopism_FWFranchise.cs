using System;
using System.Text;
using Newtonsoft.Json;
namespace Shopism.Delivery.FastWay {
    public class NS_ANetResponse {

        [JsonProperty(PropertyName = "franchise_code")]
        public string franchise_code { get; set; }

        [JsonProperty(PropertyName = "franchise_name")]
        public string franchise_name { get; set; }

        [JsonProperty(PropertyName = "franchise_phone")]
        public string franchise_phone { get; set; }
        
        [JsonProperty(PropertyName = "Fax")]
        public string Fax { get; set; }

        [JsonProperty(PropertyName = "Add1")]
        public string Add1 { get; set; }

        [JsonProperty(PropertyName = "Add2")]
        public string Add2 { get; set; }

        [JsonProperty(PropertyName = "Add3")]
        public string Add3 { get; set; }

        [JsonProperty(PropertyName = "Add4")]
        public string Add4 { get; set; }

        [JsonProperty(PropertyName = "franchise_email")]
        public string franchise_email { get; set; }

        [JsonProperty(PropertyName = "franchise_country")]
        public string franchise_country { get; set; }

        [JsonProperty(PropertyName = "FranchiseCode")]
        public string FranchiseCode { get; set; }

        [JsonProperty(PropertyName = "FranchiseName")]
        public string FranchiseName { get; set; }

        [JsonProperty(PropertyName = "Phone")]
        public string Phone { get; set; }

        [JsonProperty(PropertyName = "EmailAddress")]
        public string EmailAddress { get; set; }
    }
}