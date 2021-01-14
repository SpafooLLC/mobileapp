using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Serialization;
using System.Xml.XPath;
using System.Xml.Xsl;

namespace Netsam.Common
{
	public class NS_XMLController
	{
		public static MemoryStream Transform(Stream st, string sXslPath)
		{
			try
			{
				st.Position = 0L;
				XPathDocument input = new XPathDocument(st);
				XslCompiledTransform xslCompiledTransform = new XslCompiledTransform();
				xslCompiledTransform.Load(sXslPath);
				MemoryStream memoryStream = new MemoryStream();
				XmlTextWriter xmlTextWriter = new XmlTextWriter(memoryStream, new UTF8Encoding(false));
				xmlTextWriter.Formatting = Formatting.Indented;
				xslCompiledTransform.Transform(input, null, xmlTextWriter);
				return memoryStream;
			}
			catch (Exception)
			{
				return null;
			}
		}

		public static string UTF8ByteArrayToString(byte[] characters)
		{
			UTF8Encoding uTF8Encoding = new UTF8Encoding(false);
			return uTF8Encoding.GetString(characters);
		}

		public static byte[] StringToUTF8ByteArray(string pXmlString)
		{
			UTF8Encoding uTF8Encoding = new UTF8Encoding(false);
			return uTF8Encoding.GetBytes(pXmlString);
		}

		public static string SerializeObject(object pObject)
		{
			try
			{
				string text = null;
				MemoryStream w = new MemoryStream();
				XmlSerializer xmlSerializer = new XmlSerializer(pObject.GetType());
				XmlTextWriter xmlTextWriter = new XmlTextWriter(w, new UTF8Encoding(false));
				XmlSerializerNamespaces xmlSerializerNamespaces = new XmlSerializerNamespaces();
				xmlSerializerNamespaces.Add("", "");
				xmlTextWriter.Formatting = Formatting.Indented;
				xmlSerializer.Serialize(xmlTextWriter, pObject, xmlSerializerNamespaces);
				w = (MemoryStream)xmlTextWriter.BaseStream;
				return NS_XMLController.UTF8ByteArrayToString(w.ToArray());
			}
			catch (Exception value)
			{
				Console.WriteLine(value);
				return null;
			}
		}

		public static void SerializeObject(object pObject, string filename)
		{
			try
			{
				XmlSerializer xmlSerializer = new XmlSerializer(pObject.GetType());
				XmlTextWriter xmlTextWriter = new XmlTextWriter(filename, Encoding.UTF8);
				XmlSerializerNamespaces xmlSerializerNamespaces = new XmlSerializerNamespaces();
				xmlSerializerNamespaces.Add("", "");
				xmlTextWriter.Formatting = Formatting.Indented;
				xmlTextWriter.WriteProcessingInstruction("xml", "version='1.0'");
				xmlSerializer.Serialize(xmlTextWriter, pObject, xmlSerializerNamespaces);
				xmlTextWriter.Close();
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public static string MemoryStreamToString(MemoryStream memStream)
		{
			int num = (int)memStream.Position;
			memStream.Position = 0L;
			StreamReader streamReader = new StreamReader(memStream);
			string result = streamReader.ReadToEnd();
			memStream.Position = num;
			return result;
		}

		public static string XmlNodetoString(XmlNode xmlNode)
		{
			using (StringWriter stringWriter = new StringWriter())
			{
				using (XmlTextWriter xmlTextWriter = new XmlTextWriter(stringWriter))
				{
					xmlTextWriter.Formatting = Formatting.Indented;
					xmlTextWriter.Indentation = 2;
					xmlNode.WriteTo(xmlTextWriter);
				}
				return stringWriter.ToString();
			}
		}

		public static T ConvertNode<T>(XmlNode node) where T : class
		{
			MemoryStream memoryStream = new MemoryStream();
			StreamWriter streamWriter = new StreamWriter(memoryStream);
			streamWriter.Write(node.OuterXml);
			streamWriter.Flush();
			memoryStream.Position = 0L;
			XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));
			return (T)(xmlSerializer.Deserialize(memoryStream) as T);
		}

		public static void SerializeToXml<T>(T obj, string fileName)
		{
			FileStream fileStream = new FileStream(fileName, FileMode.Create);
			XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));
			xmlSerializer.Serialize(fileStream, obj);
			fileStream.Close();
		}

		public static T DeserializeFromXml<T>(string xml)
		{
			XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));
			using (TextReader textReader = new StringReader(xml))
			{
				return (T)xmlSerializer.Deserialize(textReader);
			}
		}
	}
}
