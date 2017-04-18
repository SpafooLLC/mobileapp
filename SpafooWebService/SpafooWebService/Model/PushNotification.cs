using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace SpafooWebService.Model
{
    public class PushNotification
    {
        #region Send iPhone Notification Function
        public void SendToiOS(string DeviceID, string Message, string filePaths)
        {
            int port = 2195;
            //  String hostname = "gateway.sandbox.push.apple.com";
            String hostname = ConfigurationManager.AppSettings["AppleHostName"].ToString();
            //  String hostname = "gateway.push.apple.com";

            //   string certificatePath = HttpContext.Current.Server.MapPath("Certficate/APNS_Development_Certificates.p12");
            string certificatePath = filePaths;
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

            MemoryStream memoryStream = new MemoryStream();
            BinaryWriter writer = new BinaryWriter(memoryStream);

            writer.Write((byte)0);
            writer.Write((byte)0);
            writer.Write((byte)32);

            byte[] b0 = HexString2Bytes(DeviceID);
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


        public string SendNotification(string deviceId, string message)
        {
            string GoogleAppID = "com.spafoo";
            var SENDER_ID = "948453990051";
            var value = message;
            WebRequest tRequest;
            tRequest = WebRequest.Create("https://android.googleapis.com/gcm/send");
            tRequest.Method = "post";
            tRequest.ContentType = " application/x-www-form-urlencoded;charset=UTF-8";
            tRequest.Headers.Add(string.Format("Authorization: key={0}", GoogleAppID));

            tRequest.Headers.Add(string.Format("Sender: id={0}", SENDER_ID));

            string postData = @"collapse_key=score_update&time_to_live=108&
        delay_while_idle = 1 & data.message = " + value + " & data.time = " + 
        System.DateTime.Now.ToString() + "®istration_id=" + deviceId + "";
            Console.WriteLine(postData);
            Byte[] byteArray = Encoding.UTF8.GetBytes(postData);
            tRequest.ContentLength = byteArray.Length;

            Stream dataStream = tRequest.GetRequestStream();
            dataStream.Write(byteArray, 0, byteArray.Length);
            dataStream.Close();

            WebResponse tResponse = tRequest.GetResponse();

            dataStream = tResponse.GetResponseStream();

            StreamReader tReader = new StreamReader(dataStream);

            String sResponseFromServer = tReader.ReadToEnd();

            tReader.Close();
            dataStream.Close();
            tResponse.Close();
            return sResponseFromServer;
        }


    }
}