using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Netsam.AuthorizeNet
{
    public class Shopism_EnumConverter<T> : JsonConverter where T : struct, IConvertible {
        Dictionary<string, string> values;
        public Shopism_EnumConverter ()
        {
            values = new Dictionary<string, string> ();
            if (!typeof (T).IsEnum)
                throw new InvalidCastException ("Specified type T must be an enum");
        }

        public override bool CanConvert (Type objectType)
        {
            return objectType == typeof (T);
        }

        public override object ReadJson (JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.Value == null)
                return null;

            var name = reader.Value as string;
            name = name.Replace ("_", "");
            
            return Enum.Parse (typeof (T), name, true);
        }

        public override void WriteJson (JsonWriter writer, object value, JsonSerializer serializer)
        {
            string key = value.ToString ();
            string result;

            if (!values.TryGetValue (key, out result)) {
                result = Regex.Replace (key, @"(?<!^|_|[A-Z])([A-Z])", "_$1").ToLowerInvariant ();
                values [key] = result;
            }
            writer.WriteValue (result);
        }
    }
}
