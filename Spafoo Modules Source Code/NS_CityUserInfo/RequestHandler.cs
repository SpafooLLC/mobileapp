using DotNetNuke.Common;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Mail;
using System;
using System.Collections;
using System.Text;
using System.Web.Script.Services;
using System.Web.Services;
using System.ComponentModel;
namespace NS.Modules.NS_CityUserInfo
{
    [ToolboxItem(false), ScriptService, WebService(Namespace = "http://tempuri.org/"), WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	public class RequestHandler : WebService
	{
		[WebMethod]
		public string SaveFormData(int MID, string AsEmail, string UID, string FN, string LN, string Phone, string SSN, string DOB, string TID, string SID, string DL, string IDState, bool HavEmail, string EmailAddress, bool KC, string ConnectDate, string SStreet, string SCity, string SState, string SZip, bool SameBilling, string BStreet, string BCity, string BState, string BZip, bool EBilling, string EBillingEmail, bool EnrolBankDraft, string BRN, string BAN, string NOA, string BN, bool ADAgree, string StateDocument, string DLDocument, string ChequeDcoument, string SSNFile, string POAFile,bool IsCommercial,string TaxID,string DBA,string PersonReqService)
		{
			if (AsEmail == "Y")
			{
				string text = "";
				ModuleController moduleController = new ModuleController();
				Hashtable moduleSettings = moduleController.GetModuleSettings(MID);
				string text2 = "";
				if (moduleSettings["NS_City_SubmitEmail"] != null)
				{
					text2 = moduleSettings["NS_City_SubmitEmail"].ToString();
				}
				if (moduleSettings["NS_City_AdminEmailContent"] != null)
				{
					text = moduleSettings["NS_City_AdminEmailContent"].ToString();
				}
				text = text.Replace("[FirstName]", FN);
				text = text.Replace("[LastName]", LN);
				text = text.Replace("[ContactPhone]", Phone);
				text = text.Replace("[ConnectDate]", ConnectDate);
				text = text.Replace("[Street]", SStreet);
				text = text.Replace("[City]", SCity);
				text = text.Replace("[State]", SState);
				text = text.Replace("[Zip]", SZip);
				text = text.Replace("[AdminTab]", "");
				if (text2 != "")
				{
					Mail.SendMail("webmaster@tylertexas.com", text2, "", "", MailPriority.High, "Customer Service Request Submitted", MailFormat.Html, Encoding.UTF8, text, "", Convert.ToString(Globals.HostSettings["SMTPServer"]), Convert.ToString(Globals.HostSettings["SMTPAuthentication"]), Convert.ToString(Globals.HostSettings["SMTPUsername"]), Convert.ToString(Globals.HostSettings["SMTPPassword"]));
				}
				NS_CityUserInfoController nS_CityUserInfoController = new NS_CityUserInfoController();
                nS_CityUserInfoController.AddForm(int.Parse(UID), FN, LN, Phone, SSN, DOB, TID, SID, DL, IDState, HavEmail, EmailAddress, KC, ConnectDate, SStreet, SCity, SState, SZip, SameBilling, BStreet, BCity, BState, BZip, EBilling, EBillingEmail, EnrolBankDraft, BRN, BAN, NOA, BN, ADAgree, StateDocument, DLDocument, ChequeDcoument, SSNFile, POAFile, IsCommercial, TaxID, DBA, PersonReqService);
			}
			else
			{
				NS_CityUserInfoController nS_CityUserInfoController = new NS_CityUserInfoController();
                nS_CityUserInfoController.AddForm(int.Parse(UID), FN, LN, Phone, SSN, DOB, TID, SID, DL, IDState, HavEmail, EmailAddress, KC, ConnectDate, SStreet, SCity, SState, SZip, SameBilling, BStreet, BCity, BState, BZip, EBilling, EBillingEmail, EnrolBankDraft, BRN, BAN, NOA, BN, ADAgree, StateDocument, DLDocument, ChequeDcoument, SSNFile, POAFile, IsCommercial, TaxID, DBA, PersonReqService);
			}
			return "";
		}
		[WebMethod]
		public string CreateUser(string UN, string Pwd)
		{
			NS_CityUserInfoController nS_CityUserInfoController = new NS_CityUserInfoController();
			return nS_CityUserInfoController.AddUser(UN, Pwd);
		}
		[WebMethod]
		public int GetUser(string UN, string Pwd)
		{
			NS_CityUserInfoController nS_CityUserInfoController = new NS_CityUserInfoController();
			return nS_CityUserInfoController.GetUser(UN, Pwd);
		}
		[WebMethod]
		public NS_CityUserFormInfo LoadUserForm(int UID)
		{
			NS_CityUserInfoController nS_CityUserInfoController = new NS_CityUserInfoController();
			return nS_CityUserInfoController.GetUserForm(UID);
		}
		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}
	}
}
