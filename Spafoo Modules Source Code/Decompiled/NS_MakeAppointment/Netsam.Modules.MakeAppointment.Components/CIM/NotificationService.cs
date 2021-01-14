namespace Netsam.Modules.MakeAppointment.Components
{
    using System;
    using System.Web;
    using System.IO;
    using System.Net;
    using System.Net.Security;
    using System.Net.Sockets;
    using System.Security.Authentication;
    using System.Security.Cryptography.X509Certificates;
    using System.Diagnostics;
    using System.Web.Hosting;

    /// <summary>
    /// Push Notification Service controller 
    /// </summary>
    public class NotificationService
    {
        #region Send Android Notification Function
        public int SendAndroidNotification(string deviceToken, string Message)
        {
            bool flag = !string.IsNullOrEmpty(deviceToken) && deviceToken.Length > 40;
            int result;
            if (flag)
            {
                try
                {
                    string arg = "AIzaSyBzCmvzkzeLNgmUSdefqA_J_LmdwehmS34";
                    string arg2 = "419078761457";
                    HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create("https://gcm-http.googleapis.com/gcm/send");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "POST";
                    httpWebRequest.Headers.Add(string.Format("Authorization: key={0}", arg));
                    httpWebRequest.Headers.Add(string.Format("Sender: id={0}", arg2));
                    using (StreamWriter streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        string text = "SpaFoo";
                        string value = string.Concat(new string[]
                        {
                            "{\"data\": { \"message\" : \"",
                            Message,
                            "\",\"time\": \"",
                            DateTime.Now.ToString(),
                            "\", \"title\" : \"",
                            text,
                            "\"},\"registration_ids\":[\"",
                            deviceToken,
                            "\"]}"
                        });
                        streamWriter.Write(value);
                        streamWriter.Flush();
                        streamWriter.Close();
                    }
                    HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (StreamReader streamReader = new StreamReader(httpWebResponse.GetResponseStream()))
                    {
                        string text2 = streamReader.ReadToEnd();
                    }
                    result = 987;
                    return result;
                }
                catch (Exception e)
                {
                    Errorlog(e);
                    StackTrace stackTrace = new StackTrace(e, true);
                    StackFrame frame = stackTrace.GetFrame(0);
                    int fileLineNumber = frame.GetFileLineNumber();
                    result = fileLineNumber;
                    return result;
                }
            }
            result = 999;
            return result;
        }
        #endregion

        #region Send iPhone Notification Function
        public void SendToiOS(string DeviceID, string Message)
        {
            try
            {
                string devicetocken = DeviceID; //"f9b4e2455335bf95d0048a598cd1a87bbc4b31ba7e45d26b2455bb903ffd0002";//  iphone device token
                int port = 2195;
                // String hostname = "gateway.sandbox.push.apple.com";
                String hostname = "gateway.push.apple.com";

                string certificatePath = HostingEnvironment.MapPath("~/Spafoo_PushNotification.p12");

                string certificatePassword = "";

                X509Certificate2 clientCertificate = new X509Certificate2(certificatePath, certificatePassword, X509KeyStorageFlags.MachineKeySet);
                X509Certificate2Collection certificatesCollection = new X509Certificate2Collection(clientCertificate);

                TcpClient client = new TcpClient(hostname, port);
                SslStream sslStream = new SslStream(
                                client.GetStream(),
                                false,
                                new RemoteCertificateValidationCallback(ValidateServerCertificate),
                                null
                );

                //try
                //{
                sslStream.AuthenticateAsClient(hostname, certificatesCollection, SslProtocols.Default, false);
                //}
                //catch (AuthenticationException ex)
                //{
                //    Console.WriteLine("Authentication failed");
                //    client.Close();
                //    Request.SaveAs(Server.MapPath("Authenticationfailed.txt"), true);
                //    return;
                //}


                //// Encode a test message into a byte array.
                MemoryStream memoryStream = new MemoryStream();
                BinaryWriter writer = new BinaryWriter(memoryStream);

                writer.Write((byte)0);  //The command
                writer.Write((byte)0);  //The first byte of the deviceId length (big-endian first byte)
                writer.Write((byte)32); //The deviceId length (big-endian second byte)

                byte[] b0 = HexString2Bytes(devicetocken);
                WriteMultiLineByteArray(b0);

                writer.Write(b0);
                String payload;
                string strmsgbody = "";
                int totunreadmsg = 20;
                strmsgbody = Message; //"Hey Aashish!";

                //Debug.WriteLine("during testing via device!");
                //Request.SaveAs(Server.MapPath("APNSduringdevice.txt"), true);

                payload = "{\"aps\":{\"alert\":\"" + strmsgbody + "\",\"badge\":" + totunreadmsg.ToString() + ",\"sound\":\"mailsent.wav\"},\"acme1\":\"bar\",\"acme2\":42}";

                writer.Write((byte)0); //First byte of payload length; (big-endian first byte)
                writer.Write((byte)payload.Length);     //payload length (big-endian second byte)

                byte[] b1 = System.Text.Encoding.UTF8.GetBytes(payload);
                writer.Write(b1);
                writer.Flush();

                byte[] array = memoryStream.ToArray();
                Debug.WriteLine("This is being sent...\n\n");
                Debug.WriteLine(array);
                //try
                //{
                sslStream.Write(array);
                sslStream.Flush();
                //}
                //catch
                //{
                //    Debug.WriteLine("Write failed buddy!!");
                //    Request.SaveAs(Server.MapPath("Writefailed.txt"), true);
                //}

                client.Close();
                Debug.WriteLine("Client closed.");
                //   Request.SaveAs(Server.MapPath("APNSSuccess.txt"), true);
            }
            catch (Exception EXX)
            {
                Errorlog(EXX);

            }

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

        public static void Errorlog(Exception ex)
        {
            string value = DateTime.Now.ToString("yyyyMMddTHHmmss") + "------>" + ex.StackTrace + Environment.NewLine + Environment.NewLine;

            string path2 = HostingEnvironment.MapPath("~/errorfile.txt");
            if (!File.Exists(path2))
            {
                using (StreamWriter streamWriter = File.CreateText(path2))
                {
                    streamWriter.WriteLine(value);
                }
            }
            using (StreamWriter streamWriter2 = File.AppendText(path2))
            {
                streamWriter2.WriteLine(value);
            }
        }

    }
}
