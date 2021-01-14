using AuthorizeNet.Api.Contracts.V1;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using DotNetNuke.Framework;
using DotNetNuke.Modules.Html;
using DotNetNuke.Security.Roles;
using ExcelLibrary.SpreadSheet;
//using net.authorize.sample;
using Netsam.Modules.MakeAppointment.Components;
using Netsam.Modules.ServiceDashBoard.Components;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using net.authorize.sample;
using RestSharp;
using DotNetNuke.Data;

namespace Netsam.Modules.MakeAppointment
{
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[ToolboxItem(false)]
	[ScriptService]
	public class rh : WebService
	{
		[WebMethod]
		public int AddAppointment(int SID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax)
		{
			//IL_000e: Unknown result type (might be due to invalid IL or missing references)
			//IL_0013: Unknown result type (might be due to invalid IL or missing references)
			//IL_0014: Unknown result type (might be due to invalid IL or missing references)
			//IL_001c: Unknown result type (might be due to invalid IL or missing references)
			//IL_0024: Unknown result type (might be due to invalid IL or missing references)
			//IL_002c: Unknown result type (might be due to invalid IL or missing references)
			//IL_0034: Unknown result type (might be due to invalid IL or missing references)
			//IL_003d: Unknown result type (might be due to invalid IL or missing references)
			//IL_0046: Unknown result type (might be due to invalid IL or missing references)
			//IL_004f: Unknown result type (might be due to invalid IL or missing references)
			//IL_0054: Unknown result type (might be due to invalid IL or missing references)
			//IL_0055: Unknown result type (might be due to invalid IL or missing references)
			//IL_0056: Unknown result type (might be due to invalid IL or missing references)
			Image = Image.Replace('~', '_');
			ServiceInfo val = new ServiceInfo();
			val.ServiceID=(SID);
			val.ShortDescription=(SD);
			val.ServiceTypeID=(-1);
			val.ServiceName=(SN);
			val.Price=(Price);
			val.ParentID=(PID);
			val.Image=(Image);
			ServiceController val2 = new ServiceController();
			return val2.AddService(val);
		}

		[WebMethod]
		public int AddAddress(string street, string city, string state, string zip)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.AddLocation(street, city, state, zip);
		}

		[WebMethod]
		public ClientLocation GetAppLocation(int AppID)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.GetAppLocation(AppID);
		}

		[WebMethod]
		public int ProviderDenyASAP(int AppID)
		{
			int result = -1;
			AppointmentController appointmentController = new AppointmentController();
			AppointmentInfo appointment = appointmentController.GetAppointment(AppID);
			if (appointment != null)
			{
				NotificationController notificationController = new NotificationController();
				result = notificationController.AddNotification(appointment.ProviderID, appointment.ClientID, 19, 0, appointment.AppointmentID);
				appointmentController.UpdateAppointmentStatus(AppID, 7);
			}
			return result;
		}

		[WebMethod]
		public int UpdateAppStatus(int AppID, int Status)
		{
			int result = -1;
			AppointmentController appointmentController = new AppointmentController();
			AppointmentInfo appointment = appointmentController.GetAppointment(AppID);
			if (appointment != null)
			{
				NotificationController notificationController = new NotificationController();
				if (Status == 0)
				{
					result = ((appointment.Status == -1) ? notificationController.AddNotification(appointment.ProviderID, appointment.ClientID, 17, 0, appointment.AppointmentID) : notificationController.AddNotification(appointment.ClientID, appointment.ProviderID, 12, 0, appointment.AppointmentID));
				}
				if (Status == 5)
				{
					result = notificationController.AddNotification(appointment.ProviderID, appointment.ClientID, 11, 0, appointment.AppointmentID);
				}
				if (Status == 6)
				{
					result = notificationController.AddNotification(appointment.ProviderID, appointment.ClientID, 18, 0, appointment.AppointmentID);
				}
				appointmentController.UpdateAppointmentStatus(AppID, Status);
			}
			return result;
		}

		[WebMethod]
		public int AcceptAppointment(int ProviderID, int AppID)
		{
			AppointmentController appointmentController = new AppointmentController();
			int num = appointmentController.AcceptAppointment(ProviderID, AppID);
			if (num == 1)
			{
				AppointmentInfo appointment = appointmentController.GetAppointment(AppID);
				NotificationController notificationController = new NotificationController();
				notificationController.AddNotification(ProviderID, appointment.ClientID, 15, 0, AppID);
			}
			return num;
		}

		[WebMethod]
		public void Unavailable4Appointment(int ProviderId, int AppID)
		{
			AppointmentController appointmentController = new AppointmentController();
			appointmentController.Unavailable4App(ProviderId, AppID);
		}

		[WebMethod]
		public void UpdateAppSeenStatus(int AppID)
		{
			AppointmentController appointmentController = new AppointmentController();
			appointmentController.UpdateAppSeenStatus(AppID);
		}

		[WebMethod]
		public int MakeAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string CSVSRVC, string PayTxnID, string CCNumber, string Expriry, string Comment, string PayProfileID, int EditAppID, decimal Discount, string AnyProviderIDs)
		{
			AppointmentController appointmentController = new AppointmentController();
			if (CCNumber.Trim() != "")
			{
				CCNumber = CCNumber.Substring(CCNumber.Length - 4, 4);
			}
			int num = appointmentController.AddAppointment(ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, PayTxnID, CCNumber, Expriry, Comment, PayProfileID, EditAppID, Discount, AnyProviderIDs);
			if (EditAppID != 0)
			{
				appointmentController.ClearAppServices(EditAppID);
				num = EditAppID;
			}
			string[] array = CSVSRVC.Split('|');
			string[] array2 = array;
			foreach (string text in array2)
			{
				if (text.Trim() != "")
				{
					string[] array3 = text.Split(':');
					int serviceID = int.Parse(array3[0]);
					int qty = int.Parse(array3[1]);
					decimal rate = decimal.Parse(array3[2]);
					appointmentController.AddServiceToAppointment(num, serviceID, qty, rate);
				}
			}
			if (EditAppID == 0)
			{
				NotificationController notificationController = new NotificationController();
				if (ForDate.Trim() == "")
				{
					appointmentController.UpdateAppointmentStatus(num, 4);
					notificationController.AddNotification(ClientID, ProviderID, 10, 0, num);
					notificationController.AddNotification(ProviderID, ClientID, 16, 0, num);
				}
				else if (ProviderID != -1)
				{
					notificationController.AddNotification(ClientID, ProviderID, 4, 0, num);
				}
				else
				{
					appointmentController.UpdateAppointmentStatus(num, 8);
					string[] array4 = AnyProviderIDs.Split('|');
					string[] array5 = array4;
					foreach (string s in array5)
					{
						int toID = int.Parse(s);
						notificationController.AddNotification(ClientID, toID, 4, 0, num);
					}
				}
			}
			return num;
		}

		[WebMethod]
		public int UpdateAppBasicInfo(int AppID, int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string Comment)
		{
			AppointmentController appointmentController = new AppointmentController();
			appointmentController.UpdateAppBasicInfo(AppID, ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, Comment);
			return AppID;
		}

		[WebMethod]
		public AppointmentInfo GetAppointment(int ID)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.GetAppointment(ID);
		}

		[WebMethod]
		public BasicAppointmentInfo GetBasicAppointment(int ID)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.GetBasicAppointment(ID);
		}

		[WebMethod]
		public List<BasicAppointmentInfo> ListAllAppointmentByAny()
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.ListAllBasicAppointmentByAny();
		}

		[WebMethod]
		public List<AppointmentInfo> ListAppointmentByProvider(int UID)
		{
			try
			{
				AppointmentController appointmentController = new AppointmentController();
				return appointmentController.ListAppointmentByProvider(UID);
			}
			catch (Exception)
			{
				return new List<AppointmentInfo>();
			}
		}

		[WebMethod]
		public string ListAppointmentByProviderJSON(int UID)
		{
			try
			{
				AppointmentController appointmentController = new AppointmentController();
				return new JavaScriptSerializer().Serialize(appointmentController.ListAppointmentByProvider(UID));
			}
			catch (Exception)
			{
				List<AppointmentInfo> obj = new List<AppointmentInfo>();
				return new JavaScriptSerializer().Serialize(obj);
			}
		}

		[WebMethod]
		public List<AppointmentInfo> ListAppointmentByClient(int UID)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.ListAppointmentByClient(UID);
		}

		[WebMethod]
		public string ListAppointmentByClientJSON(int UID)
		{
			AppointmentController appointmentController = new AppointmentController();
			return new JavaScriptSerializer().Serialize(appointmentController.ListAppointmentByClient(UID));
		}

		[WebMethod]
		public List<ServiceInfo> ListServicesByAppID(int ID)
		{
			AppointmentController appointmentController = new AppointmentController();
			AppointmentInfo appointment = appointmentController.GetAppointment(ID);
			return appointment.Services;
		}

		[WebMethod]
		public void UpdateAppointment(int ID, string C, string PaymentTxnID)
		{
			AppointmentController appointmentController = new AppointmentController();
			appointmentController.UpdateAppointment(ID, C, PaymentTxnID);
		}

		[WebMethod]
		public void RemoveApp(int ID)
		{
			AppointmentController appointmentController = new AppointmentController();
			AppointmentInfo appointment = appointmentController.GetAppointment(ID);
			NotificationController notificationController = new NotificationController();
			notificationController.AddNotification(appointment.ClientID, appointment.ProviderID, 13, 0, ID);
			appointmentController.RemoveApp(ID);
		}

		[WebMethod]
		public void HideApp4Me(int AID, string UserType)
		{
			AppointmentController appointmentController = new AppointmentController();
			appointmentController.HideApp4Me(AID, UserType);
		}

		[WebMethod]
		public bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime)
		{
			bool flag = false;
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.IsProviderSlotFree(ProID, StartDateTime, EndDateTime);
		}

		[WebMethod]
		public bool IsProviderSlotFreeEM(int ProID, string StartDateTime, string EndDateTime, int AppID)
		{
			bool flag = false;
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.IsProviderSlotFree(ProID, StartDateTime, EndDateTime, AppID);
		}

		[WebMethod]
		public List<AppointmentInfo> GetProOccupiedSlots(int a, string b, string c)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.GetProOccupiedSlots(a, b, c);
		}

		[WebMethod]
		public bool CanSetAvailability(int ProID, string StartDateTime, string EndDateTime)
		{
			bool flag = false;
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.CanSetAvailability(ProID, StartDateTime, EndDateTime);
		}

		[WebMethod]
		public List<UserInfo> GetUsersInRole(string RN, int CP, int RPP)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.GetUsersInRole(RN, CP, RPP);
		}

		[WebMethod]
		public void AddRating(int RatingByID, int RatingToID, string RatingCSV, string ReviewCSV, int AppID)
		{
			RatingController ratingController = new RatingController();
			string[] array = RatingCSV.Split('|');
			string[] array2 = array;
			foreach (string text in array2)
			{
				if (text.Trim() != "")
				{
					string[] array3 = text.Split(':');
					decimal ratingValue = decimal.Parse(array3[1]);
					int ratingTypeID = int.Parse(array3[0]);
					ratingController.AddRating(RatingByID, RatingToID, ratingValue, ratingTypeID, AppID);
				}
			}
			string[] array4 = ReviewCSV.Split(':');
			string iLike = "";
			string iDLike = "";
			string comments = "";
			if (array4[0].Trim() != "-1" || array4[0].Trim() != "")
			{
				iLike = array4[0].Trim();
			}
			if (array4[1].Trim() != "-1" || array4[1].Trim() != "")
			{
				iDLike = array4[1].Trim();
			}
			if (array4[2].Trim() != "-1" || array4[2].Trim() != "")
			{
				comments = array4[2].Trim();
			}
			ratingController.AddUserReview(RatingByID, RatingToID, iLike, iDLike, comments, int.Parse(array4[3]), AppID);
			NotificationController notificationController = new NotificationController();
			notificationController.AddNotification(RatingByID, RatingToID, 14, 0, AppID);
		}

		[WebMethod]
		public string SendNotification(int UserID, int RoleID, string Message)
		{
			NotificationController notificationController = new NotificationController();
            SendText(UserID, Message);
            return notificationController.SendNotification(UserID, RoleID, Message);
		}



        [WebMethod]
        public string GetCalendarPreference(int UserID)
        {
            return new Netsam.Modules.MakeAppointment.Data.SqlDataProvider().NS_GetCalendarPreference(UserID);
        }



        [WebMethod]
        public string GetCalendarURL(int AppointmentID)
        {

            var appointmentInfo=GetAppointment(AppointmentID);

            UserInfo client = UserController.GetUserById(0, appointmentInfo.ClientID);
            UserInfo provider = UserController.GetUserById(0, appointmentInfo.ProviderID);
            var db = new Netsam.Modules.MakeAppointment.Data.SqlDataProvider();
            string CalendarPreference= db.NS_GetCalendarPreference(appointmentInfo.ProviderID);
            if(CalendarPreference=="" || CalendarPreference == "None")
            {
                return string.Empty;
            }else if (CalendarPreference == "Google Calendar")
            {
                string nameOftheEvent = "Spafoo Appointment";
                string location = db.NS_GetAddress(appointmentInfo.AddressID);

                //In this section, can you format like this:
                string details = "Spafoo Appointment" + "<br/>";
                details += "Client: " + client.FirstName + " " + client.LastName + "-" + client.Profile.Cell + "<br/>";
                details += "Provider: " + provider.FirstName + " " + provider.LastName + "-" + provider.Profile.Cell + "<br/>";
                details += "Time: " + Convert.ToDateTime(appointmentInfo.ForDate).ToLongDateString() + " ";
                //Should be a range like 1:00pm - 2:30pm
                details += appointmentInfo.AtTime + " - " + appointmentInfo.EndTime;
               
                string dates=Convert.ToDateTime(appointmentInfo.ForDate).ToUniversalTime().ToString("yyyyMMddTHHmmss");
                string googleCalendarURL = string.Format("https://calendar.google.com/calendar/r/eventedit?text={0}&dates={1}&details={2}&location={3}"
                   , nameOftheEvent, dates, details, location);
                return googleCalendarURL;
            }

            return string.Empty;
        }




        [WebMethod]
        public string AddCalendarPreference(int UserID)
        {
            var db = new Netsam.Modules.MakeAppointment.Data.SqlDataProvider();
            return db.NS_AddCalendarPreference(UserID);
        }


        [WebMethod]
        public string SaveCalendarPreference(int UserID,string CalendarPreference)
        {
            var db = new Netsam.Modules.MakeAppointment.Data.SqlDataProvider();
            return db.NS_SaveCalendarPreference(UserID, CalendarPreference);
        }

        [WebMethod]
        public string SendText(int UserID, string Message)
        {
            try
            {
                UserInfo user = UserController.GetUserById(0, UserID);
                string token = "80324c7621f8b8b3b6f1c8f8908f41dc";
                string phone = user.Profile.Cell;
                string message = Message;

                //var //client = new RestClient("https://app2.simpletexting.com/v1/send?token=YOUR_API_TOKEN&phone=SOME_STRING_VALUE&message=SOME_STRING_VALUE");
                var client = new RestClient(String.Format("https://app2.simpletexting.com/v1/send?token={0}&phone={1}&message={2}"
                    , token, phone, message));
                var request = new RestRequest(Method.POST);
                request.AddHeader("accept", "application/json");
                request.AddHeader("content-type", "application/x-www-form-urlencoded");
                IRestResponse response = client.Execute(request);
                NotificationService.log("simpletexting success--"+response.StatusDescription);
                return response.StatusDescription;
            }
            catch (Exception ex)
            {
                NotificationService.Errorlog(ex);

            }

            return "error";
        }


        [WebMethod]
        public string SendText2Phone(string PhoneNumber, string Message)
        {
            try
            {
               // UserInfo user = UserController.GetUserById(0, UserID);
                string token = "80324c7621f8b8b3b6f1c8f8908f41dc";
                string phone = PhoneNumber;// user.Profile.Cell;
                string message = Message;

                //var //client = new RestClient("https://app2.simpletexting.com/v1/send?token=YOUR_API_TOKEN&phone=SOME_STRING_VALUE&message=SOME_STRING_VALUE");
                var client = new RestClient(String.Format("https://app2.simpletexting.com/v1/send?token={0}&phone={1}&message={2}"
                    , token, phone, message));
                var request = new RestRequest(Method.POST);
                request.AddHeader("accept", "application/json");
                request.AddHeader("content-type", "application/x-www-form-urlencoded");
                IRestResponse response = client.Execute(request);
                NotificationService.log("simpletexting success--" + response.StatusDescription);
                return response.StatusDescription;
            }
            catch (Exception ex)
            {
                NotificationService.Errorlog(ex);

            }

            return "error";
        }

        [WebMethod]
		public List<NS_MinUserInfo> GetUsersByRole(string RoleName)
		{
			//IL_0001: Unknown result type (might be due to invalid IL or missing references)
			//IL_0006: Unknown result type (might be due to invalid IL or missing references)
			//IL_000d: Unknown result type (might be due to invalid IL or missing references)
			//IL_0027: Unknown result type (might be due to invalid IL or missing references)
			//IL_002c: Unknown result type (might be due to invalid IL or missing references)
			//IL_0038: Unknown result type (might be due to invalid IL or missing references)
			//IL_0047: Unknown result type (might be due to invalid IL or missing references)
			//IL_0056: Unknown result type (might be due to invalid IL or missing references)
			//IL_0065: Unknown result type (might be due to invalid IL or missing references)
			//IL_0067: Unknown result type (might be due to invalid IL or missing references)
			RoleController val = new RoleController();
			List<NS_MinUserInfo> list = new List<NS_MinUserInfo>();
			List<UserInfo> list2 = new List<UserInfo>(val.GetUsersByRole(0, RoleName));
			foreach (UserInfo item in list2)
			{
				NS_MinUserInfo nS_MinUserInfo = new NS_MinUserInfo();
				nS_MinUserInfo.UserID = item.UserID;
				nS_MinUserInfo.FirstName = item.FirstName;
				nS_MinUserInfo.LastName = item.LastName;
				nS_MinUserInfo.PhoneNumber = item.Profile.Cell;
				list.Add(nS_MinUserInfo);
			}
			return list;
		}

		[WebMethod]
		public bool DidIRated(int ByUserID, int AppID)
		{
			AppointmentController appointmentController = new AppointmentController();
			return appointmentController.DidIRated(ByUserID, AppID);
		}

		[WebMethod]
		public List<RatingInfo> ListRating(int RatingTypeID)
		{
			RatingController ratingController = new RatingController();
			return ratingController.ListRatingType(RatingTypeID);
		}

		[WebMethod(true)]
		public ANetApiResponse ChargeCard(string CCNumber, string Expiry, string CardCode, decimal amount)
		{
			if (base.Session["NS_MA_Init"] != null)
			{
				return ChargeCreditCard.Run(CCNumber, Expiry, CardCode, amount);
			}
			return new ANetApiResponse();
		}

		[WebMethod(true)]
		public ANetApiResponse AuthCard(string CCNumber, string Expiry, string CardCode, decimal amount)
		{
			return AuthorizeCreditCard.Run(CCNumber, Expiry, CardCode, amount);
		}

		[WebMethod(true)]
		public string AuthCardJSON(string CCNumber, string Expiry, string CardCode, decimal amount)
		{
			ANetApiResponse obj = AuthorizeCreditCard.Run(CCNumber, Expiry, CardCode, amount);
			return new JavaScriptSerializer().Serialize(obj);
		}

		[WebMethod]
		public ANetApiResponse ChargeProfile(string PID, string PPID, decimal amount)
		{
			if (amount > decimal.Zero)
			{
				return ChargeCustomerProfile.Run(PID, PPID, amount);
			}
			return new ANetApiResponse();
		}

		[WebMethod]
		public string ChargeProfileJSON(string PID, string PPID, decimal amount)
		{
			ANetApiResponse obj = ChargeCustomerProfile.Run(PID, PPID, amount);
			return new JavaScriptSerializer().Serialize(obj);
		}

		[WebMethod(true)]
		public ANetApiResponse AuthProfile(string PID, string PPID, decimal amount)
		{
			return AuthorizeCustomerProfile.Run(PID, PPID, amount);
		}

		[WebMethod(true)]
		public string AuthProfileJSON(string PID, string PPID, decimal amount)
		{
			ANetApiResponse obj = AuthorizeCustomerProfile.Run(PID, PPID, amount);
			return new JavaScriptSerializer().Serialize(obj);
		}

		[WebMethod(true)]
		public ANetApiResponse ChargePreviousAuth(string Txn, decimal amount)
		{
			ANetApiResponse result = CapturePreviouslyAuthorizedAmount.Run(amount, Txn);
			NotificationController notificationController = new NotificationController();
			return result;
		}

		[WebMethod]
		public string ChargePreviousAuthJSON(string Txn, decimal amount)
		{
			ANetApiResponse obj = CapturePreviouslyAuthorizedAmount.Run(amount, Txn);
			NotificationController notificationController = new NotificationController();
			return new JavaScriptSerializer().Serialize(obj);
		}

		[WebMethod]
		public ANetApiResponse RefundCard(int AID)
		{
			ANetApiResponse oResponse = new ANetApiResponse();
			AppointmentController appointmentController = new AppointmentController();
			AppointmentInfo appointment = appointmentController.GetAppointment(AID);
			if (appointment.ForDate != "")
			{
				DateTime value = DateTime.Parse(appointment.ForDate + " " + appointment.AtTime);
				if (DateTime.Now.Subtract(value).Hours >= 12)
				{
					oResponse = ChargeCustomerProfile.Run(appointment.CustomerProfileID, appointment.PayProfileID, 25m);
					if (oResponse.messages.resultCode == messageTypeEnum.Ok)
					{
						oResponse = rh.CancelNCloseApp(oResponse, appointment, "");
					}
				}
				else
				{
					oResponse = rh.CancelNCloseApp(oResponse, appointment, "");
				}
			}
			else
			{
				oResponse = rh.CancelNCloseApp(oResponse, appointment, "");
			}
			return oResponse;
		}

		private static ANetApiResponse CancelNCloseApp(ANetApiResponse oResponse, AppointmentInfo oInfo, string attach)
		{
			AppointmentController appointmentController = new AppointmentController();
			NotificationController notificationController = new NotificationController();
			notificationController.AddNotification(oInfo.ClientID, oInfo.ProviderID, 9, 0, oInfo.AppointmentID);
			appointmentController.UpdateAppointmentStatus(oInfo.AppointmentID, 3);
			messagesType messagesType = new messagesType();
			messagesTypeMessage[] array = new messagesTypeMessage[1];
			messagesTypeMessage messagesTypeMessage = new messagesTypeMessage();
			messagesTypeMessage.code = "Removed";
			messagesTypeMessage.text = "Appointment cancelled successfully " + attach;
			array[0] = messagesTypeMessage;
			messagesType.message = array;
			oResponse.messages = messagesType;
			oResponse.messages.resultCode = messageTypeEnum.Ok;
			return oResponse;
		}

		[WebMethod]
		public string RefundCardJSON(int AID)
		{
			ANetApiResponse aNetApiResponse = new ANetApiResponse();
			aNetApiResponse = this.RefundCard(AID);
			return new JavaScriptSerializer().Serialize(aNetApiResponse);
		}

		[WebMethod]
		public createCustomerProfileResponse CreateCustomerProfile(int UID, string name, string CCNumber, string Expiry, string CVV, string Email, string adrs, string city, string state, string zip, string phone)
		{
			createCustomerProfileResponse createCustomerProfileResponse = new createCustomerProfileResponse();
			createCustomerProfileResponse = net.authorize.sample.CreateCustomerProfile.Run(CCNumber, Expiry, CVV, Email, name, adrs, city, state, zip, phone);
			if (createCustomerProfileResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				createCustomerPaymentProfileResponse createCustomerPaymentProfileResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(createCustomerProfileResponse.customerProfileId, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
				createCustomerProfileResponse.messages.message[0].text = createCustomerProfileResponse.messages.message[0].text + " " + createCustomerPaymentProfileResponse.customerPaymentProfileId;
				UserPaymentProfile userPaymentProfile = new UserPaymentProfile();
				userPaymentProfile.CustomerProfileID = createCustomerProfileResponse.customerProfileId;
				userPaymentProfile.UserID = UID;
				PaymentProfileController paymentProfileController = new PaymentProfileController();
				paymentProfileController.AddUserPaymentProfile(userPaymentProfile);
			}
			else if (createCustomerProfileResponse.messages.message[0].code == "E00039")
			{
				string text = createCustomerProfileResponse.messages.message[0].text.Split(' ')[5].ToString();
				createCustomerPaymentProfileResponse createCustomerPaymentProfileResponse2 = net.authorize.sample.CreateCustomerPaymentProfile.Run(text, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
				createCustomerProfileResponse.messages.message[0].text = createCustomerProfileResponse.messages.message[0].text + " " + createCustomerPaymentProfileResponse2.customerPaymentProfileId;
				UserPaymentProfile userPaymentProfile2 = new UserPaymentProfile();
				userPaymentProfile2.CustomerProfileID = text;
				userPaymentProfile2.UserID = UID;
				PaymentProfileController paymentProfileController2 = new PaymentProfileController();
				paymentProfileController2.AddUserPaymentProfile(userPaymentProfile2);
			}
			return createCustomerProfileResponse;
		}

		[WebMethod]
		public string CreateCustomerProfileJSON(int UID, string name, string CCNumber, string Expiry, string CVV, string Email, string adrs, string city, string state, string zip, string phone)
		{
			createCustomerProfileResponse createCustomerProfileResponse = new createCustomerProfileResponse();
			createCustomerProfileResponse = net.authorize.sample.CreateCustomerProfile.Run(CCNumber, Expiry, CVV, Email, name, adrs, city, state, zip, phone);
			if (createCustomerProfileResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				createCustomerPaymentProfileResponse createCustomerPaymentProfileResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(createCustomerProfileResponse.customerProfileId, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
				createCustomerProfileResponse.messages.message[0].text = createCustomerProfileResponse.messages.message[0].text + " " + createCustomerPaymentProfileResponse.customerPaymentProfileId;
				UserPaymentProfile userPaymentProfile = new UserPaymentProfile();
				userPaymentProfile.CustomerProfileID = createCustomerProfileResponse.customerProfileId;
				userPaymentProfile.UserID = UID;
				PaymentProfileController paymentProfileController = new PaymentProfileController();
				paymentProfileController.AddUserPaymentProfile(userPaymentProfile);
			}
			else if (createCustomerProfileResponse.messages.message[0].code == "E00039")
			{
				string text = createCustomerProfileResponse.messages.message[0].text.Split(' ')[5].ToString();
				createCustomerPaymentProfileResponse createCustomerPaymentProfileResponse2 = net.authorize.sample.CreateCustomerPaymentProfile.Run(text, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
				createCustomerProfileResponse.messages.message[0].text = createCustomerProfileResponse.messages.message[0].text + " " + createCustomerPaymentProfileResponse2.customerPaymentProfileId;
				UserPaymentProfile userPaymentProfile2 = new UserPaymentProfile();
				userPaymentProfile2.CustomerProfileID = text;
				userPaymentProfile2.UserID = UID;
				PaymentProfileController paymentProfileController2 = new PaymentProfileController();
				paymentProfileController2.AddUserPaymentProfile(userPaymentProfile2);
			}
			return new JavaScriptSerializer().Serialize(createCustomerProfileResponse);
		}

		[WebMethod]
		public createCustomerPaymentProfileResponse CreateCustomerPaymentProfile(string PID, string name, string CCNumber, string Expiry, string CVV, string adrs, string city, string state, string zip, string phone, int UID)
		{
			createCustomerPaymentProfileResponse createCustomerPaymentProfileResponse;
			return createCustomerPaymentProfileResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(PID, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
		}

		[WebMethod]
		public string CreateCustomerPaymentProfileJSON(string PID, string name, string CCNumber, string Expiry, string CVV, string adrs, string city, string state, string zip, string phone)
		{
			createCustomerPaymentProfileResponse createCustomerPaymentProfileResponse = createCustomerPaymentProfileResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(PID, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
			return new JavaScriptSerializer().Serialize(createCustomerPaymentProfileResponse);
		}

		[WebMethod]
		public ANetApiResponse GetCustomerProfile(int UID)
		{
			ANetApiResponse aNetApiResponse = new ANetApiResponse();
			PaymentProfileController paymentProfileController = new PaymentProfileController();
			UserPaymentProfile paymentProfile = paymentProfileController.GetPaymentProfile(UID);
			return net.authorize.sample.GetCustomerProfile.Run(paymentProfile.CustomerProfileID);
		}

		[WebMethod]
		[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
		public string GetCustomerProfileJSON(int UID)
		{
			ANetApiResponse aNetApiResponse = new ANetApiResponse();
			PaymentProfileController paymentProfileController = new PaymentProfileController();
			UserPaymentProfile paymentProfile = paymentProfileController.GetPaymentProfile(UID);
			aNetApiResponse = net.authorize.sample.GetCustomerProfile.Run(paymentProfile.CustomerProfileID);
			return new JavaScriptSerializer().Serialize(aNetApiResponse);
		}

		[WebMethod]
		public ANetApiResponse DeleteCustomerPayProfile(string PID, string PPID)
		{
			ANetApiResponse aNetApiResponse = new ANetApiResponse();
			return DeleteCustomerPaymentProfile.Run(PID, PPID);
		}

		[WebMethod]
		[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
		public string DeleteCustomerPayProfileJSON(string PID, string PPID)
		{
			ANetApiResponse aNetApiResponse = new ANetApiResponse();
			aNetApiResponse = DeleteCustomerPaymentProfile.Run(PID, PPID);
			return new JavaScriptSerializer().Serialize(aNetApiResponse);
		}

		[WebMethod]
		public List<AppointmentPhotoInfo> GetAppointmentPhotos(int AID)
		{
			AppointmentController appointmentController = new AppointmentController();
			List<AppointmentPhotoInfo> list = appointmentController.ListAppointmentPhotos(AID);
			int num = 3 - list.Count;
			if (num < 1)
			{
				num = 1;
			}
			for (int i = 0; i < num; i++)
			{
				AppointmentPhotoInfo appointmentPhotoInfo = new AppointmentPhotoInfo();
				appointmentPhotoInfo.FilePath = "/DesktopModules/NS_MakeAppointment/Images/Site/noimg.png";
				list.Add(appointmentPhotoInfo);
			}
			return list;
		}

		[WebMethod]
		public void AddAppointmentPhoto(int AID, int UID, string FilePath)
		{
			AppointmentController appointmentController = new AppointmentController();
			appointmentController.AddAppointmentPhoto(UID, AID, FilePath);
		}

		[WebMethod]
		public void RemoveAppointmentPhoto(int ID)
		{
			AppointmentController appointmentController = new AppointmentController();
			appointmentController.RemoveAppointmentPhoto(ID);
		}

		[WebMethod]
		public void AddNotification(int ByID, int ToID, int NotTypeID, int RelatedEntityID)
		{
			NotificationController notificationController = new NotificationController();
			notificationController.AddNotification(ByID, ToID, NotTypeID, 0, RelatedEntityID);
		}

		[WebMethod]
		public void RemoveNotification(int ID)
		{
			NotificationController notificationController = new NotificationController();
			notificationController.RemoveNotification(ID);
		}

		[WebMethod]
		public void RemoveUserNotification(int UID)
		{
			NotificationController notificationController = new NotificationController();
			notificationController.RemoveNotificationByUser(UID);
		}

		[WebMethod]
		public List<NotificationInfo> GetMyNotification(int MyID)
		{
			NotificationController notificationController = new NotificationController();
			return notificationController.GetMyNotifications(MyID);
		}

		[WebMethod]
		public List<NotificationInfo> GetAdminNotification(int PN, int RPP)
		{
			NotificationController notificationController = new NotificationController();
			return notificationController.GetAdminNotification(PN, RPP);
		}

		[WebMethod(true)]
		public int GetUserNotification()
		{
			//IL_0001: Unknown result type (might be due to invalid IL or missing references)
			int userID = rh.GetCurrentUserInfo().UserID;
			if (userID != -1)
			{
				NotificationController notificationController = new NotificationController();
				return notificationController.GetMyNotifications(userID).Count;
			}
			return 0;
		}

        public static UserInfo GetCurrentUserInfo()
        {
            UserInfo user;
            if ((HttpContext.Current == null))
            {
                if (!Thread.CurrentPrincipal.Identity.IsAuthenticated)
                { return new UserInfo(); }
                var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
                if (portalSettings != null)
                { user = UserController.GetCachedUser(portalSettings.PortalId, Thread.CurrentPrincipal.Identity.Name); return user ?? new UserInfo(); }
                return new UserInfo();
            }
            else if (HttpContext.Current.Items["UserInfo"] == null)
            {
                if (HttpContext.Current.Request.IsAuthenticated)
                { user = UserController.GetCachedUser(PortalSettings.Current.PortalId, HttpContext.Current.User.Identity.Name); HttpContext.Current.Items["UserInfo"] = user; }
            }
            user = (UserInfo)HttpContext.Current.Items["UserInfo"];
            return user ?? new UserInfo();
        }


        [WebMethod]
        public string WriteExcel(string RN)
        {
            AppointmentController oCtrl = new AppointmentController();
            List<UserInfo> lstUser = oCtrl.GetUsersInRole(RN, 1, 100000);

            string TargetFolder = HttpContext.Current.Server.MapPath("~/images");
            //create new xls file 
            string file = TargetFolder + "/userlist_" + RN + ".xls";
            Workbook workbook = new Workbook();
            Worksheet worksheet = new Worksheet("Sheet1");
            int row = 0;
            foreach (UserInfo oUser in lstUser)
            {
                worksheet.Cells[row, 0] = (new Cell(oUser.FirstName.Trim()));// First Name 
                worksheet.Cells[row, 1] = new Cell(oUser.LastName.Trim()); // Last Name
                worksheet.Cells[row, 2] = new Cell(oUser.Email); // Email
                row++;
            }
            workbook.Worksheets.Add(worksheet);
            workbook.Save(file);
            return "1";
            //worksheet.Cells[0, 1] = new Cell((short)1); 
            //worksheet.Cells[2, 0] = new Cell(9999999); 
            //worksheet.Cells[3, 3] = new Cell((decimal)3.45); 
            //worksheet.Cells[2, 2] = new Cell("Text string"); 
            //worksheet.Cells[2, 4] = new Cell("Second string");
            //worksheet.Cells[4, 0] = new Cell(32764.5, "#,##0.00"); 
            //worksheet.Cells[5, 1] = new Cell(DateTime.Now, @"YYYY-MM-DD"); 
            //worksheet.Cells.ColumnWidth[0, 1] = 3000; 

            // open xls file 
            //  Workbook book = Workbook.Load(file); 
            //Worksheet sheet = book.Worksheets[0];
        }

        [WebMethod]
		public string GetHTML(int ModID)
		{
			//IL_0001: Unknown result type (might be due to invalid IL or missing references)
			//IL_0006: Unknown result type (might be due to invalid IL or missing references)
			//IL_0007: Unknown result type (might be due to invalid IL or missing references)
			//IL_000f: Unknown result type (might be due to invalid IL or missing references)
			//IL_0014: Unknown result type (might be due to invalid IL or missing references)
			//IL_0015: Unknown result type (might be due to invalid IL or missing references)
			HtmlTextController val = new HtmlTextController();
			HtmlTextInfo val2 = val.GetAllHtmlText(ModID)[0];
			return val2.Content;
		}
	}
}
