using System;
using System.IO;
using System.Xml;
using System.Xml.Xsl;
using System.Xml.XPath;
using System.Xml.Serialization;
using System.Text;

namespace Netsam.Common
{   
    public class NS_XMLController
    {               
        public static MemoryStream Transform(Stream st, string sXslPath)
        {
            try
            {                
                //load the Xml doc
                st.Position = 0;
                XPathDocument myXPathDoc = new XPathDocument(st);

                //XslTransform myXslTrans = new XslTransform();
                XslCompiledTransform myXslTrans = new XslCompiledTransform();

                //load the Xsl 
                myXslTrans.Load(sXslPath);

                //create the output stream
                MemoryStream outStream = new MemoryStream();
                XmlTextWriter myWriter = new XmlTextWriter(outStream, new UTF8Encoding(false));
                myWriter.Formatting = Formatting.Indented;

                //do the actual transform of Xml
                myXslTrans.Transform(myXPathDoc, null, myWriter);
                return outStream;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        /// <summary>
        /// To convert a Byte Array of Unicode values (UTF-8 encoded) to a complete String.
        /// </summary>
        /// <param name="characters">Unicode Byte Array to be converted to String</param>
        /// <returns>String converted from Unicode Byte Array</returns>
        public static String UTF8ByteArrayToString(Byte[] characters)
        {
            UTF8Encoding encoding = new UTF8Encoding(false);
            String constructedString = encoding.GetString(characters);
            return (constructedString);
        }

        /// <summary>
        /// Converts the String to UTF8 Byte array and is used in De serialization
        /// </summary>
        /// <param name="pXmlString"></param>
        /// <returns></returns>
        public static Byte[] StringToUTF8ByteArray(String pXmlString)
        {
            UTF8Encoding encoding = new UTF8Encoding(false);
            Byte[] byteArray = encoding.GetBytes(pXmlString);
            return byteArray;
        }        

        public static String SerializeObject(Object pObject)
        {
            try
            {
                //pObject
                String XmlizedString = null;
                MemoryStream memoryStream = new MemoryStream();

                // Use Reflection to Retrive the Datatype of the Object
                //System.Type[] tp = new Type[] { oObject.GetType() };
                XmlSerializer xs = new XmlSerializer(pObject.GetType());
                XmlTextWriter xmlTextWriter = new XmlTextWriter(memoryStream, new UTF8Encoding(false));
                XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
                ns.Add("", "");
                xmlTextWriter.Formatting = Formatting.Indented;

                xs.Serialize(xmlTextWriter, pObject, ns);
                memoryStream = (MemoryStream)xmlTextWriter.BaseStream;
                XmlizedString = UTF8ByteArrayToString(memoryStream.ToArray());
                return XmlizedString;
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e);
                return null;
            }
        }

        public static void SerializeObject(Object pObject, string filename)
        {
            try
            {
                XmlSerializer xs = new XmlSerializer(pObject.GetType());
                XmlTextWriter xmlWriter = new XmlTextWriter(filename, System.Text.Encoding.UTF8);
                XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
                ns.Add("", "");
                xmlWriter.Formatting = Formatting.Indented;
                xmlWriter.WriteProcessingInstruction("xml", "version='1.0'");

                xs.Serialize(xmlWriter, pObject, ns);
                xmlWriter.Close();
            }
            catch (Exception ex)
            {
                throw ex;
                //WriteError(ex.ToString());
            }
        }

        public static string MemoryStreamToString(MemoryStream memStream)
        {
            // Reset the stream otherwise you will just get an empty string.
            // Remember the position so we can restore it later.
            int pos = (int)memStream.Position;
            memStream.Position = 0;

            StreamReader reader = new StreamReader(memStream);
            string str = reader.ReadToEnd();

            // Reset the position so that subsequent writes are correct.
            memStream.Position = pos;

            return str;
        }

        public static string XmlNodetoString(XmlNode xmlNode)
        {
            using (StringWriter swr = new StringWriter())
            {
                using (var xw = new XmlTextWriter(swr))
                {
                    xw.Formatting = Formatting.Indented;
                    xw.Indentation = 2; //default is 1. I used 2 to make the indents larger.

                    xmlNode.WriteTo(xw);
                }
                return swr.ToString(); //The node, as a string, with indents!
            }
        }


        public static T ConvertNode<T>(XmlNode node) where T : class
        {
            MemoryStream stm = new MemoryStream();

            StreamWriter stw = new StreamWriter(stm);
            stw.Write(node.OuterXml);
            stw.Flush();

            stm.Position = 0;

            XmlSerializer ser = new XmlSerializer(typeof(T));
            T result = (ser.Deserialize(stm) as T);

            return result;
        }

        public static void SerializeToXml<T>(T obj, string fileName)
        {
            FileStream fileStream = new FileStream(fileName, FileMode.Create); 
            XmlSerializer ser = new XmlSerializer(typeof(T)); 
            ser.Serialize(fileStream, obj);
            fileStream.Close();             
        }
        public static T DeserializeFromXml<T>(string xml)
        {
            T result;
            XmlSerializer ser = new XmlSerializer(typeof(T));
            using (TextReader tr = new StringReader(xml))
            {
                result = (T)ser.Deserialize(tr);
            }
            return result;
        }
    }
}