namespace SpafooWebService.Model
{
    using System;
    using System.Web;
    using System.IO;
    using System.Net;
    using System.Net.Security;
    using System.Net.Sockets;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Configuration;

    public class NotificationService
    {
        #region Send Android Notification Function
        public void SendAndroidNotification(string deviceToken, string Message)
        {
            if (!string.IsNullOrEmpty(deviceToken) && deviceToken.Length > 40)
            {
                try
                {
                    string RegistrationId = deviceToken;

                    var applicationID = System.Web.Configuration.WebConfigurationManager.AppSettings["AndroidAPIKey"].ToString(); ;
                    var SENDER_ID = System.Web.Configuration.WebConfigurationManager.AppSettings["AndroidSenderId"].ToString(); ;

                    //--------------------------- New Code by Shivam--------------------------

                    var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://gcm-http.googleapis.com/gcm/send");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "POST";
                    httpWebRequest.Headers.Add(string.Format("Authorization: key={0}", applicationID));
                    httpWebRequest.Headers.Add(string.Format("Sender: id={0}", SENDER_ID));
                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        //string postData = "{\"collapse_key\":\"score_update\",\"time_to_live\":108,\"delay_while_idle\":true,\"data\": { \"message\" : " + "\"" + Message + "\",\"time\": " + "\"" + System.DateTime.Now.ToString() + "\"},\"registration_ids\":[\"" + RegistrationId + "\"]}";
                        string postData = "{\"data\": { \"message\" : " + "\"" + Message + "\",\"time\": " + "\"" + System.DateTime.Now.ToString() + "\"},\"registration_ids\":[\"" + RegistrationId + "\"]}";
                        streamWriter.Write(postData);
                        streamWriter.Flush();
                        streamWriter.Close();
                    }

                    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        var result = streamReader.ReadToEnd();
                    }

                }
                catch (Exception ex)
                {

                }
            }
        }
        #endregion

        #region Send iPhone Notification Function
        public void SendToiOS(string DeviceID, string Message)
        {
            int port = 2195;
            //   String hostname = "gateway.sandbox.push.apple.com";
            String hostname = ConfigurationManager.AppSettings["AppleHostName"].ToString();
            //   String hostname = "gateway.push.apple.com";

            string certificatePath = HttpContext.Current.Server.MapPath("Certificate/SpafooPushService.p12");
            //  string certificatePath = filePaths;
            string certificatePassword = "";

            X509Certificate2 clientCertificate = new X509Certificate2(certificatePath, certificatePassword, X509KeyStorageFlags.MachineKeySet);
            X509Certificate2Collection certificatesCollection = new X509Certificate2Collection(clientCertificate);

            TcpClient client = new TcpClient(hostname, port);
            SslStream sslStream = new SslStream(
                            client.GetStream(),
                            true,
                            new RemoteCertificateValidationCallback(ValidateServerCertificate),
                            null
            );

            try
            {
                //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                sslStream.AuthenticateAsClient(hostname, certificatesCollection, SslProtocols.Tls, false);
            }
            catch (AuthenticationException ex)
            {
                Console.WriteLine("Authentication failed " + ex.Message.Trim().ToString());
                client.Close();
                return;
            }
            catch (WebException ex)
            {
                Console.WriteLine("Authentication failed " + ex.Message.Trim().ToString());
                client.Close();
                return;
            }
            MemoryStream memoryStream = new MemoryStream();
            BinaryWriter writer = new BinaryWriter(memoryStream);

            writer.Write((byte)0);
            writer.Write((byte)0);
            writer.Write((byte)32);

            byte[] b0 = HexString2Bytes(DeviceID);
            //   byte[] b0 = System.Text.Encoding.ASCII.GetBytes(DeviceID);
            WriteMultiLineByteArray(b0);




            writer.Write(b0);
            String payload;
            string strmsgbody = "";
            int totunreadmsg = 0;
            strmsgbody = Message;

            //payload = "{\"aps\":{\"alert\":\"" + strmsgbody + "\",\"badge\":" + totunreadmsg.ToString() + ",\"sound\":\"default\"},\"acme1\":\"bar\",\"acme2\":42}";
            payload = "{\"aps\":{\"alert\":\"" + strmsgbody + "\",\"badge\":" + totunreadmsg.ToString() + ",\"sound\":\"default\"}}";

            writer.Write((byte)0);
            writer.Write((byte)payload.Length);

            byte[] b1 = System.Text.Encoding.UTF8.GetBytes(payload);
            writer.Write(b1);
            writer.Flush();

            byte[] array = memoryStream.ToArray();
            try
            {
                sslStream.Write(array);
                sslStream.Flush();
            }
            catch (Exception ex)
            {
                //   Common.SaveLog(ex.Message, "SendIOSNotification", "NotificationService", "MobileApp");
            }

            client.Close();
        }
        #endregion

        #region Hex String to Bytes Function
        private byte[] HexString2Bytes(string hexString)
        {
            //check for null
            if (hexString == null) return null;
            //get length
            int len = hexString.Length;
            if (len % 2 == 1) return null;
            int len_half = len / 2;
            //create a byte array
            byte[] bs = new byte[len_half];
            try
            {
                //convert the hexstring to bytes

                for (int i = 0; i != len_half; i++)
                {
                    bs[i] = (byte)Int32.Parse(hexString.Substring(i * 2, 2), System.Globalization.NumberStyles.HexNumber);
                }
            }
            catch (Exception ex)
            {
                //MessageBox.Show("Exception : " + ex.Message);
            }
            //return the byte array
            return bs;
        }
        #endregion

        #region Validate Server Certificate Function
        public static bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            if (sslPolicyErrors == SslPolicyErrors.None)
                return true;

            Console.WriteLine("Certificate error: {0}", sslPolicyErrors);

            // Do not allow this client to communicate with unauthenticated servers.
            return false;
        }
        #endregion

        #region Write MultiLine Byte Array Function
        public static void WriteMultiLineByteArray(byte[] bytes)
        {
            const int rowSize = 20;
            int iter;

            Console.WriteLine("initial byte array");
            Console.WriteLine("------------------");

            for (iter = 0; iter < bytes.Length - rowSize; iter += rowSize)
            {
                Console.Write(
                    BitConverter.ToString(bytes, iter, rowSize));
                Console.WriteLine("-");
            }

            Console.WriteLine(BitConverter.ToString(bytes, iter));
            Console.WriteLine();
        }
        #endregion
    }
}
