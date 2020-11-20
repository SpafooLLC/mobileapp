using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Netsam.AuthorizeNet
{
    [JsonObject (MemberSerialization.OptIn)]
    public class NS_AuthProfile : FWID
    {

        [JsonProperty(PropertyName = "pickup_rf")]
        public string pickup_rf { get; set; }

        [JsonProperty(PropertyName = "delivery_rf")]
        public string delivery_rf { get; set; }

        [JsonProperty(PropertyName = "pickup_location")]
        public string pickup_location { get; set; }

        [JsonProperty(PropertyName = "delivery_location")]
        public string delivery_location { get; set; }

        [JsonProperty(PropertyName = "delivery_timeframe_days")]
        public int delivery_timeframe_days { get; set; }

        [JsonProperty(PropertyName = "usable_labels")]
        public UsableLabel[] usable_labels { get; set; }

        [JsonProperty(PropertyName = "cheapest_parcel")]
        public UsableLabel cheapest_parcel { get; set; }
        
        [JsonProperty (PropertyName = "livemode")]
        public bool LiveMode { get; set; }

        [JsonProperty(PropertyName = "delivery_rf_deeded")]
        public bool delivery_rf_deeded { get; set; }

        [JsonProperty(PropertyName = "isRural")]
        public bool isRural { get; set; }

        [JsonProperty(PropertyName = "use_nearest_Postcode_nomatch")]
        public bool use_nearest_Postcode_nomatch { get; set; }
    }

    public class UsableLabel
    {

        [JsonProperty("base_label_colour")]
        public string BaseLabelColour { get; set; }

        [JsonProperty("excess_label_count")]
        public int ExcessLabelCount { get; set; }

        [JsonProperty("costexgst_additional_admin_fee")]
        public string CostexgstAdditionalAdminFee { get; set; }

        [JsonProperty("costexgst_profit_value")]
        public string CostexgstProfitValue { get; set; }

        [JsonProperty("costexgst_label")]
        public string CostexgstLabel { get; set; }

        [JsonProperty("costexgst_total_charge_to_end_user")]
        public string CostexgstTotalChargeToEndUser { get; set; }

        [JsonProperty("base_label_cost_exgst")]
        public string BaseLabelCostExgst { get; set; }

        [JsonProperty("rural_label_cost_exgst")]
        public int RuralLabelCostExgst { get; set; }

        [JsonProperty("psc_price_exgst")]
        public double PscPriceExgst { get; set; }

        [JsonProperty("excess_label_cost_exgst")]
        public string ExcessLabelCostExgst { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("base_weight")]
        public int BaseWeight { get; set; }

        [JsonProperty("max_weight")]
        public int MaxWeight { get; set; }
    }

    public class CheapestParcel
    {

        [JsonProperty("base_label_colour")]
        public string BaseLabelColour { get; set; }

        [JsonProperty("excess_label_count")]
        public int ExcessLabelCount { get; set; }

        [JsonProperty("costexgst_additional_admin_fee")]
        public string CostexgstAdditionalAdminFee { get; set; }

        [JsonProperty("costexgst_profit_value")]
        public string CostexgstProfitValue { get; set; }

        [JsonProperty("costexgst_label")]
        public string CostexgstLabel { get; set; }

        [JsonProperty("costexgst_total_charge_to_end_user")]
        public string CostexgstTotalChargeToEndUser { get; set; }

        [JsonProperty("base_label_cost_exgst")]
        public string BaseLabelCostExgst { get; set; }

        [JsonProperty("rural_label_cost_exgst")]
        public int RuralLabelCostExgst { get; set; }

        [JsonProperty("psc_price_exgst")]
        public double PscPriceExgst { get; set; }

        [JsonProperty("excess_label_cost_exgst")]
        public string ExcessLabelCostExgst { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("base_weight")]
        public int BaseWeight { get; set; }

        [JsonProperty("max_weight")]
        public int MaxWeight { get; set; }
    }
}