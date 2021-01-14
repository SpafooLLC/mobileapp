#define DEBUG
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web.Hosting;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class NotificationService
	{
		public int SendAndroidNotification(string deviceToken, string Message)
		{
			if (!string.IsNullOrEmpty(deviceToken) && deviceToken.Length > 40)
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
						string value = "{\"data\": { \"message\" : \"" + Message + "\",\"time\": \"" + DateTime.Now.ToString() + "\", \"title\" : \"" + text + "\"},\"registration_ids\":[\"" + deviceToken + "\"]}";
						streamWriter.Write(value);
						streamWriter.Flush();
						streamWriter.Close();
					}
					HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
					using (StreamReader streamReader = new StreamReader(httpWebResponse.GetResponseStream()))
					{
						string text2 = streamReader.ReadToEnd();
					}
					return 987;
				}
				catch (Exception ex)
				{
					NotificationService.Errorlog(ex);
					StackTrace stackTrace = new StackTrace(ex, true);
					StackFrame frame = stackTrace.GetFrame(0);
					return frame.GetFileLineNumber();
				}
			}
			return 999;
		}

		public void SendToiOS(string DeviceID, string Message)
		{
			try
			{
				int port = 2195;
				string text = "gateway.push.apple.com";
				string fileName = HostingEnvironment.MapPath("~/Spafoo_PushNotification.p12");
				string password = "";
				X509Certificate2 certificate = new X509Certificate2(fileName, password, X509KeyStorageFlags.MachineKeySet);
				X509Certificate2Collection clientCertificates = new X509Certificate2Collection(certificate);
				TcpClient tcpClient = new TcpClient(text, port);
				SslStream sslStream = new SslStream(tcpClient.GetStream(), false, NotificationService.ValidateServerCertificate, null);
				sslStream.AuthenticateAsClient(text, clientCertificates, SslProtocols.Default, false);
				MemoryStream memoryStream = new MemoryStream();
				BinaryWriter binaryWriter = new BinaryWriter(memoryStream);
				binaryWriter.Write((byte)0);
				binaryWriter.Write((byte)0);
				binaryWriter.Write((byte)32);
				byte[] array = this.HexString2Bytes(DeviceID);
				NotificationService.WriteMultiLineByteArray(array);
				binaryWriter.Write(array);
				string text2 = "";
				int num = 20;
				string text3 = "{\"aps\":{\"alert\":\"" + Message + "\",\"badge\":" + num.ToString() + ",\"sound\":\"mailsent.wav\"},\"acme1\":\"bar\",\"acme2\":42}";
				binaryWriter.Write((byte)0);
				binaryWriter.Write((byte)text3.Length);
				byte[] bytes = Encoding.UTF8.GetBytes(text3);
				binaryWriter.Write(bytes);
				binaryWriter.Flush();
				byte[] array2 = memoryStream.ToArray();
				Debug.WriteLine("This is being sent...\n\n");
				Debug.WriteLine(array2);
				sslStream.Write(array2);
				sslStream.Flush();
				tcpClient.Close();
				Debug.WriteLine("Client closed.");
			}
			catch (Exception ex)
			{
				NotificationService.Errorlog(ex);
			}
		}

		private byte[] HexString2Bytes(string hexString)
		{
			if (hexString == null)
			{
				return null;
			}
			int length = hexString.Length;
			if (length % 2 == 1)
			{
				return null;
			}
			int num = length / 2;
			byte[] array = new byte[num];
			try
			{
				for (int i = 0; i != num; i++)
				{
					array[i] = (byte)int.Parse(hexString.Substring(i * 2, 2), NumberStyles.HexNumber);
				}
			}
			catch (Exception)
			{
			}
			return array;
		}

		public static bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
		{
			if (sslPolicyErrors == SslPolicyErrors.None)
			{
				return true;
			}
			Console.WriteLine("Certificate error: {0}", sslPolicyErrors);
			return false;
		}

		public static void WriteMultiLineByteArray(byte[] bytes)
		{
			Console.WriteLine("initial byte array");
			Console.WriteLine("------------------");
			int i;
			for (i = 0; i < bytes.Length - 20; i += 20)
			{
				Console.Write(BitConverter.ToString(bytes, i, 20));
				Console.WriteLine("-");
			}
			Console.WriteLine(BitConverter.ToString(bytes, i));
			Console.WriteLine();
		}

		public static void Errorlog(Exception ex)
		{
			string value = DateTime.Now.ToString("yyyyMMddTHHmmss") + "------>" + ex.StackTrace + Environment.NewLine + Environment.NewLine;
			string path = HostingEnvironment.MapPath("~/errorfile.txt");
			if (!File.Exists(path))
			{
				using (StreamWriter streamWriter = File.CreateText(path))
				{
					streamWriter.WriteLine(value);
				}
			}
			using (StreamWriter streamWriter2 = File.AppendText(path))
			{
				streamWriter2.WriteLine(value);
			}
		}


        public static void log(string logData)
        {
            string value = DateTime.Now.ToString("yyyyMMddTHHmmss") + "------>" +logData + Environment.NewLine + Environment.NewLine;
            string path = HostingEnvironment.MapPath("~/logfile.txt");
            if (!File.Exists(path))
            {
                using (StreamWriter streamWriter = File.CreateText(path))
                {
                    streamWriter.WriteLine(value);
                }
            }
            using (StreamWriter streamWriter2 = File.AppendText(path))
            {
                streamWriter2.WriteLine(value);
            }
        }
    }
}
