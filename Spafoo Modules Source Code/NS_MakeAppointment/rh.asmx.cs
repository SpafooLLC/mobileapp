using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using Netsam.Modules.MakeAppointment.Components;
using Netsam.Modules.ServiceDashBoard.Components;
using AuthorizeNet.Api.Contracts.V1;
using System.Text.RegularExpressions;
using DotNetNuke.Common;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using System.Threading;
using System.Web.Script.Services;
using System.Xml.Serialization;
using System.Web.Script.Serialization;
using DotNetNuke.Services.Exceptions;
using DotNetNuke.Entities.Host;
using ExcelLibrary.SpreadSheet;
using DotNetNuke.Modules.Html;
namespace Netsam.Modules.MakeAppointment    
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    
    public class rh : System.Web.Services.WebService
    {

        [WebMethod]
        public int AddAppointment(int SID, string SN, string SD, string Image, int PID, decimal Price, decimal Tax)
        {
            /* 
             int SID - Service ID,
             * int STID - Service TypeID, 
             * string SN - Service Name,
             * string SD - Short Description , 
             * string Image, 
             * int PID - Parent ID , 
             * decimal Price, 
             * decimal Tax
             */
            Image = Image.Replace('~', '_');
            ServiceInfo oService = new ServiceInfo();
            oService.ServiceID = SID;
           // oService.Tax = Tax;
            oService.ShortDescription = SD;
            oService.ServiceTypeID = -1;// STID;
            oService.ServiceName = SN;
            oService.Price = Price;
            oService.ParentID = PID;
            oService.Image = Image;
           
            ServiceController oCtrl = new ServiceController();
            return oCtrl.AddService(oService);
           
        }

        [WebMethod]
        public int AddAddress(string street,string city,string state,string zip) {
            AppointmentController oCtrl = new AppointmentController();
           return oCtrl.AddLocation(street, city, state, zip);
        }

        [WebMethod]
        public ClientLocation GetAppLocation(int AppID)
        {
            AppointmentController oCtrl = new AppointmentController();
            return oCtrl.GetAppLocation(AppID);
        }

       [WebMethod]
        public int ProviderDenyASAP(int AppID)
        {
            int irVal = -1;
            AppointmentController oCtrl = new AppointmentController();

            AppointmentInfo oApp = oCtrl.GetAppointment(AppID);
            if (oApp != null)
            {
                NotificationController oNCtrl = new NotificationController();
                irVal = oNCtrl.AddNotification(oApp.ProviderID, oApp.ClientID, 19, 0, oApp.AppointmentID);
                oCtrl.UpdateAppointmentStatus(AppID, 7); // Provider DENIED the ASAP appointment Request
            }
            
            return irVal;
        }
        [WebMethod]
        public int UpdateAppStatus(int AppID, int Status)
        {
            int irVal = -1;
            AppointmentController oCtrl = new AppointmentController();
            
            AppointmentInfo oApp = oCtrl.GetAppointment(AppID);
            if (oApp != null)
            {
                NotificationController oNCtrl = new NotificationController();
                if (Status == 0)
                {
                    if (oApp.Status != -1)
                    {
                        // client accepted the provider given date for soonest appointment
                   irVal=     oNCtrl.AddNotification(oApp.ClientID, oApp.ProviderID, 12, 0, oApp.AppointmentID);
                    }
                    else
                    {
                        // Provider accepted the appointment
                        irVal = oNCtrl.AddNotification(oApp.ProviderID, oApp.ClientID, 17, 0, oApp.AppointmentID);
                    }
                }
                if (Status == 5)
                {
                    // Provider given given date for soonest appointment
                    irVal = oNCtrl.AddNotification(oApp.ProviderID, oApp.ClientID, 11, 0, oApp.AppointmentID);
                }
                if (Status == 6)
                {/* implemented on 23/03/2017 by Sachin to show the notification to client that his appointment request is denied by Provider
                    in notification we need to show a link as 'Available Providers'  
                  */
                    // Provider did not accepted the appointment request by the client 
                    irVal = oNCtrl.AddNotification(oApp.ProviderID, oApp.ClientID, 18, 0, oApp.AppointmentID);
                }
                oCtrl.UpdateAppointmentStatus(AppID, Status);

            }
            return irVal;
        }

        [WebMethod]
        public void UpdateAppSeenStatus(int AppID)
        {
            AppointmentController oCtrl = new AppointmentController();
            oCtrl.UpdateAppSeenStatus(AppID);
        }

        [WebMethod]
        public int MakeAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime,string EndTime ,string CSVSRVC, string PayTxnID, string CCNumber, string Expriry,string Comment,string PayProfileID,int EditAppID,decimal Discount)
        {
            AppointmentController oCtrl = new AppointmentController();
            if (CCNumber.Trim()!="")
                CCNumber = CCNumber.Substring((CCNumber.Length - 4), 4);
            int AppointmentID = oCtrl.AddAppointment(ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, PayTxnID, CCNumber, Expriry, Comment, PayProfileID, EditAppID,Discount);

            if (EditAppID != 0)
            {
                /* if appointment edited , clear all the services entered before and add fresh entry for services */
                oCtrl.ClearAppServices(EditAppID);
                AppointmentID = EditAppID;
            }
            string[] arySRVC = CSVSRVC.Split('|');
            foreach (string SRVC in arySRVC)
            {
                if (SRVC.Trim() != "")
                {
                    string[] aryService = SRVC.Split(':');
                    int iServiceID = int.Parse(aryService[0]);
                    int iQty = int.Parse(aryService[1]);
                    decimal dRate = decimal.Parse(aryService[2]);
                    oCtrl.AddServiceToAppointment(AppointmentID, iServiceID, iQty, dRate);
                }
            }
            if (EditAppID == 0)
            {
                NotificationController oNCtrl = new NotificationController();
                if (ForDate.Trim() == "")
                {
                    oCtrl.UpdateAppointmentStatus(AppointmentID, 4);// Soonest Appointment created, Status ID will be 4 
                    oNCtrl.AddNotification(ClientID, ProviderID, 10, 0, AppointmentID);
                    oNCtrl.AddNotification(ProviderID, ClientID, 16, 0, AppointmentID);
                }
                else
                {
                    oNCtrl.AddNotification(ClientID, ProviderID, 4, 0, AppointmentID);
                 //   oNCtrl.AddNotification(ProviderID, ClientID, 15, 0, AppointmentID);
                }
            }
            return AppointmentID;
        }
        [WebMethod]
        public int UpdateAppBasicInfo(int AppID,int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime,string EndTime, string Comment)
        {
            AppointmentController oCtrl = new AppointmentController();
            oCtrl.UpdateAppBasicInfo(AppID, ClientID, ProviderID, AddressID, ForDate, AtTime, EndTime, Comment);
            return AppID;
        }
        [WebMethod]
        public AppointmentInfo GetAppointment(int ID) {
            AppointmentController oCtrl = new AppointmentController();
            return oCtrl.GetAppointment(ID);
        }
        [WebMethod]
        public List<AppointmentInfo> ListAppointmentByProvider(int UID)
        {
            try
            {
                AppointmentController oCtrl = new AppointmentController();
                return oCtrl.ListAppointmentByProvider(UID);
            }
            catch (Exception ex)
            {
                List<AppointmentInfo> lstApp = new List<AppointmentInfo>();
                return lstApp;
            }
          
        }

        [WebMethod]
        public List<AppointmentInfo> ListAppointmentByClient(int UID)
        {
            AppointmentController oCtrl = new AppointmentController();
            return oCtrl.ListAppointmentByClient(UID);
        }

        [WebMethod]
        public List<ServiceInfo> ListServicesByAppID(int ID)
        {
            AppointmentController oCtrl = new AppointmentController();
            AppointmentInfo oApp = oCtrl.GetAppointment(ID);
            return oApp.Services;
        }

        [WebMethod]
        public void UpdateAppointment(int ID,string C,string PaymentTxnID)
        {
            AppointmentController octrl = new AppointmentController();
            octrl.UpdateAppointment(ID, C, PaymentTxnID);
        }

        [WebMethod]
        public void RemoveApp(int ID)
        {
            AppointmentController octrl = new AppointmentController();
            AppointmentInfo oApp = octrl.GetAppointment(ID);
            NotificationController oNCtrl = new NotificationController();
            oNCtrl.AddNotification(oApp.ClientID, oApp.ProviderID, 13, 0, ID);
            octrl.RemoveApp(ID);
        }
        [WebMethod]
        public void HideApp4Me(int AID,string UserType)
        {
            AppointmentController octrl = new AppointmentController();
            octrl.HideApp4Me(AID, UserType);
        }

        [WebMethod]
        public bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime)
        {
            bool rValue = false;
            AppointmentController oCtrl = new AppointmentController();
            rValue = oCtrl.IsProviderSlotFree(ProID, StartDateTime, EndDateTime);
            return rValue;
        }
       
        [WebMethod]
        public bool IsProviderSlotFreeEM(int ProID, string StartDateTime, string EndDateTime,int AppID)
        {// FOR EDIT MODE
            bool rValue = false;
            AppointmentController oCtrl = new AppointmentController();
            rValue = oCtrl.IsProviderSlotFree(ProID, StartDateTime, EndDateTime,AppID);
            return rValue;
        }

        [WebMethod]
        public List<AppointmentInfo> GetProOccupiedSlots(int a, string b, string c)
        {
            // a - ProID, b - Startfrom, c- EndDate
            AppointmentController oCtrl = new AppointmentController();
            List<AppointmentInfo> lstApp = oCtrl.GetProOccupiedSlots(a, b, c);
            return lstApp;

        }
        [WebMethod]
        public bool CanSetAvailability(int ProID, string StartDateTime, string EndDateTime)
        {
            bool rValue = false;
            AppointmentController oCtrl = new AppointmentController();
            rValue = oCtrl.CanSetAvailability(ProID, StartDateTime, EndDateTime);
            return rValue;
        }

        [WebMethod]
        public List<UserInfo> GetUsersInRole(string RN,int CP,int RPP)
        {
            // RN - RoleName , CP - Current Page Number, RPP - records per page
            AppointmentController oCtrl = new AppointmentController();
            List<UserInfo> lstUser = oCtrl.GetUsersInRole(RN, CP, RPP);
            return lstUser;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="RatingByID"></param>
        /// <param name="RatingToID"></param>
        /// <param name="RatingValue"></param>
        /// <param name="RatingTypeID">0 - Star Rating , > 0 - Other Rating (e.g. communcation, punctuality etc)</param>
        [WebMethod]
        public void AddRating(int RatingByID, int RatingToID, string RatingCSV, string ReviewCSV,int AppID)
        {
            // RatingCSV : RatingTypeID:RatingValue|RatingTypeID:RatingValue
            RatingController oRCtrl = new RatingController();

            // Save Rating
            string[] aryRating = RatingCSV.Split('|');
            foreach (string oRating in aryRating)
            {
                if (oRating.Trim() != "")
                {
                    string[] iRating = oRating.Split(':');
                    decimal RatingValue = decimal.Parse(iRating[1]);
                    int RatingTypeID = int.Parse(iRating[0]);
                    oRCtrl.AddRating(RatingByID, RatingToID, RatingValue, RatingTypeID,AppID);
                }
            }

            // Save User Review
            string[] aryReview = ReviewCSV.Split(':');
            // ReviewCSV: ILike:IDLike:Comments:DisplayNameAs
            string ILike = "";
            string IDLike = "";
            string comment = "";
            if ((aryReview[0].Trim() != "-1") || (aryReview[0].Trim()!="")) { ILike = aryReview[0].Trim(); }
            if ((aryReview[1].Trim() != "-1") || (aryReview[1].Trim()!="")) { IDLike = aryReview[1].Trim(); }
            if ((aryReview[2].Trim() != "-1") || (aryReview[2].Trim() != "")) { comment = aryReview[2].Trim(); }
            oRCtrl.AddUserReview(RatingByID, RatingToID, ILike, IDLike, comment, int.Parse(aryReview[3]),AppID);
            NotificationController oNCtrl = new NotificationController();
            oNCtrl.AddNotification(RatingByID, RatingToID, 14, 0,AppID); // User Review to Provider Notification
        }
        [WebMethod]
        public bool DidIRated(int ByUserID,int AppID)
        {
            AppointmentController oCtrl = new AppointmentController();
            return oCtrl.DidIRated(ByUserID, AppID);
        }

        [WebMethod]
        public List<Netsam.Modules.MakeAppointment.Components.RatingInfo> ListRating(int RatingTypeID)
        {
           RatingController oRCtrl = new RatingController();
            return oRCtrl.ListRatingType(RatingTypeID);

        }

        [WebMethod(enableSession:true)]
        public ANetApiResponse ChargeCard(string CCNumber, string Expiry, string CardCode, decimal amount)
        {
            if (Session["NS_MA_Init"] != null)
            {
                ANetApiResponse oResponse = net.authorize.sample.ChargeCreditCard.Run(CCNumber, Expiry, CardCode, amount);
                return oResponse;
            }
            else
            {
                ANetApiResponse oResp = new ANetApiResponse();
                return oResp;
            }
        }
        [WebMethod(enableSession: true)]
        public ANetApiResponse AuthCard(string CCNumber, string Expiry, string CardCode, decimal amount)
        {
            //if (Session["NS_MA_Init"] != null)
            //{
               ANetApiResponse oResponse = net.authorize.sample.AuthorizeCreditCard.Run(CCNumber, Expiry, CardCode, amount);
                return oResponse;
            //}
            //else
            //{
            //    ANetApiResponse oResp = new ANetApiResponse();
            //    return oResp;
            //}
        }
[WebMethod(enableSession: true)]
        public string AuthCardJSON(string CCNumber, string Expiry, string CardCode, decimal amount)
        {
            //if (Session["NS_MA_Init"] != null)
            //{
                ANetApiResponse oResponse = net.authorize.sample.AuthorizeCreditCard.Run(CCNumber, Expiry, CardCode, amount);
                return new JavaScriptSerializer().Serialize(oResponse); ;
            //}
            //else
            //{
            //    ANetApiResponse oResp = new ANetApiResponse();
            //    return new JavaScriptSerializer().Serialize(oResp); ;
            //}
        }

        [WebMethod]
        public ANetApiResponse ChargeProfile(string PID, string PPID, decimal amount)
        {
            //if (Session["NS_MA_Init"] != null)
            //{
            if (amount > 0)
            {
                ANetApiResponse oResponse = net.authorize.sample.ChargeCustomerProfile.Run(PID, PPID, amount);
                return oResponse;
            }
            else
            {
                ANetApiResponse oResponse = new ANetApiResponse();
                return oResponse;
            }
               
           // }
            //else
            //{
            //    ANetApiResponse oResp = new ANetApiResponse();
            //    return oResp;
            //}
        }
        [WebMethod]
        public string ChargeProfileJSON(string PID, string PPID, decimal amount)
        {
            //if (Session["NS_MA_Init"] != null)
            //{
            ANetApiResponse oResponse = net.authorize.sample.ChargeCustomerProfile.Run(PID, PPID, amount);
            return new JavaScriptSerializer().Serialize(oResponse);
            // }
            //else
            //{
            //    ANetApiResponse oResp = new ANetApiResponse();
            //    return oResp;
            //}
        }
        [WebMethod(enableSession: true)]
        public ANetApiResponse AuthProfile(string PID, string PPID, decimal amount)
        {
          //  if (Session["NS_MA_Init"] != null)
           // {
                ANetApiResponse oResponse = net.authorize.sample.AuthorizeCustomerProfile.Run(PID, PPID, amount);
                return oResponse;
          //  }
            //else
            //{
            //    ANetApiResponse oResp = new ANetApiResponse();
            //    return oResp;
            //}
        }
        [WebMethod(enableSession: true)]
        public string AuthProfileJSON(string PID, string PPID, decimal amount)
        {
                ANetApiResponse oResponse = net.authorize.sample.AuthorizeCustomerProfile.Run(PID, PPID, amount);
                return new JavaScriptSerializer().Serialize(oResponse);
        }
        [WebMethod(enableSession: true)]
        public ANetApiResponse ChargePreviousAuth(string Txn,decimal amount)
        {
            //if ((Session["NS_MA_Init"] != null) || Session["MSS_Session"]!=null)
            //{
                ANetApiResponse oResponse = net.authorize.sample.CapturePreviouslyAuthorizedAmount.Run(amount,Txn);
                NotificationController oNCtrl = new NotificationController();
                return oResponse;
           // }
            //else
            //{
            //    ANetApiResponse oResp = new ANetApiResponse();
            //    return oResp;
            //}
        }
        [WebMethod]
        public string ChargePreviousAuthJSON(string Txn, decimal amount)
        {
                ANetApiResponse oResponse = net.authorize.sample.CapturePreviouslyAuthorizedAmount.Run(amount, Txn);
                NotificationController oNCtrl = new NotificationController();
                return new JavaScriptSerializer().Serialize(oResponse);
        }
        [WebMethod]
        public ANetApiResponse RefundCard(int AID)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            AppointmentController oCtrl = new AppointmentController();
            AppointmentInfo oInfo = oCtrl.GetAppointment(AID);
            if (oInfo.ForDate != "")
            {
                DateTime oDate = DateTime.Parse(oInfo.ForDate + ' ' + oInfo.AtTime);
                if (DateTime.Now.Subtract(oDate).Hours >= 12)
                {
                    /* 
                        $25 will be charged if appointment is cancelled before 12hrs of booking
                     */
                    oResponse = net.authorize.sample.ChargeCustomerProfile.Run(oInfo.CustomerProfileID, oInfo.PayProfileID, 25);
                    if (oResponse.messages.resultCode == messageTypeEnum.Ok)
                    {
                        oResponse = CancelNCloseApp(oResponse, oInfo, "");
                    }
                }
                else
                {
                    oResponse = CancelNCloseApp(oResponse, oInfo,"");
                }
                //else
                //{
                //    messagesType m = new messagesType();
                //    messagesTypeMessage[] o = new messagesTypeMessage[1];
                //    messagesTypeMessage Item = new messagesTypeMessage();
                //    Item.code = "Expired";
                //    Item.text = "Sorry, Appointment can be cancelled within 12 hrs only";
                //    o[0] = Item;
                //    m.message = o;
                //    oResponse.messages = m;
                //    oResponse.messages.resultCode = messageTypeEnum.Error;
                //}
            }
            else
            {
                oResponse = CancelNCloseApp(oResponse, oInfo,"");
            }

            return oResponse;
        }

        private static ANetApiResponse CancelNCloseApp(ANetApiResponse oResponse, AppointmentInfo oInfo,string attach)
        {
            AppointmentController oCtrl = new AppointmentController();
            NotificationController oNCtrl = new NotificationController();
            oNCtrl.AddNotification(oInfo.ClientID, oInfo.ProviderID, 9, 0, oInfo.AppointmentID);
            oCtrl.UpdateAppointmentStatus(oInfo.AppointmentID, 3);
            messagesType m = new messagesType();
            messagesTypeMessage[] o = new messagesTypeMessage[1];
            messagesTypeMessage Item = new messagesTypeMessage();
            Item.code = "Removed";
            Item.text = "Appointment cancelled successfully" + " " + attach;
            o[0] = Item;
            m.message = o;
            oResponse.messages = m;
            oResponse.messages.resultCode = messageTypeEnum.Ok;
            return oResponse;
        }

        [WebMethod]
        public string RefundCardJSON(int AID)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            oResponse = RefundCard(AID);
            return new JavaScriptSerializer().Serialize(oResponse);
        }

        [WebMethod]
        public createCustomerProfileResponse CreateCustomerProfile(int UID, string name, string CCNumber, string Expiry, string CVV, string Email, string adrs, string city, string state, string zip, string phone)
        {
            createCustomerProfileResponse oResponse =  new createCustomerProfileResponse();
            oResponse = net.authorize.sample.CreateCustomerProfile.Run(CCNumber, Expiry, CVV, Email, name, adrs, city, state, zip, phone);
            if (oResponse.messages.resultCode== messageTypeEnum.Ok)
            {
                createCustomerPaymentProfileResponse oSubResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(oResponse.customerProfileId, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
                oResponse.messages.message[0].text = oResponse.messages.message[0].text + " " + oSubResponse.customerPaymentProfileId;
                UserPaymentProfile oProfile= new UserPaymentProfile();
                oProfile.CustomerProfileID=oResponse.customerProfileId;
                oProfile.UserID=UID;
                PaymentProfileController oCtrl = new PaymentProfileController();
                oCtrl.AddUserPaymentProfile(oProfile);
            }
            else if (oResponse.messages.message[0].code == "E00039") // A duplicate record already exists on authorize.net but not our database.
            {
                string tempCustomeProfileID = oResponse.messages.message[0].text.Split(' ')[5].ToString();
                createCustomerPaymentProfileResponse oSubResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(tempCustomeProfileID, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
                oResponse.messages.message[0].text = oResponse.messages.message[0].text + " " + oSubResponse.customerPaymentProfileId;
                UserPaymentProfile oProfile = new UserPaymentProfile();
                oProfile.CustomerProfileID = tempCustomeProfileID;
                oProfile.UserID = UID;
                PaymentProfileController oCtrl = new PaymentProfileController();
                oCtrl.AddUserPaymentProfile(oProfile);
            }
            //if (oResponse.messages.message[0].code == "E00039")
            //{
            //    string resultString = Regex.Match(oResponse.messages.message[0].text, @"\d+").Value;
            //    net.authorize.sample.DeleteCustomerPaymentProfile.Run(resultString)
            //}
            return oResponse;
        }

        [WebMethod]
        public string CreateCustomerProfileJSON(int UID, string name, string CCNumber, string Expiry, string CVV, string Email, string adrs, string city, string state, string zip, string phone)
        {
            createCustomerProfileResponse oResponse = new createCustomerProfileResponse();
            oResponse = net.authorize.sample.CreateCustomerProfile.Run(CCNumber, Expiry, CVV, Email, name, adrs, city, state, zip, phone);
            if (oResponse.messages.resultCode == messageTypeEnum.Ok)
            {
                createCustomerPaymentProfileResponse oSubResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(oResponse.customerProfileId, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
                oResponse.messages.message[0].text = oResponse.messages.message[0].text + " " + oSubResponse.customerPaymentProfileId;
                UserPaymentProfile oProfile = new UserPaymentProfile();
                oProfile.CustomerProfileID = oResponse.customerProfileId;
                oProfile.UserID = UID;
                PaymentProfileController oCtrl = new PaymentProfileController();
                oCtrl.AddUserPaymentProfile(oProfile);
            }
            else if (oResponse.messages.message[0].code == "E00039") // A duplicate record already exists on authorize.net but not our database.
            {
                string tempCustomeProfileID = oResponse.messages.message[0].text.Split(' ')[5].ToString();
                createCustomerPaymentProfileResponse oSubResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(tempCustomeProfileID, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
                oResponse.messages.message[0].text = oResponse.messages.message[0].text + " " + oSubResponse.customerPaymentProfileId;
                UserPaymentProfile oProfile = new UserPaymentProfile();
                oProfile.CustomerProfileID = tempCustomeProfileID;
                oProfile.UserID = UID;
                PaymentProfileController oCtrl = new PaymentProfileController();
                oCtrl.AddUserPaymentProfile(oProfile);
            }
            return new JavaScriptSerializer().Serialize(oResponse);
        }
        [WebMethod]
        public createCustomerPaymentProfileResponse CreateCustomerPaymentProfile(string PID, string name, string CCNumber, string Expiry, string CVV, string adrs, string city, string state, string zip, string phone, int UID)
        {
            createCustomerPaymentProfileResponse oResponse = oResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(PID, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
          //  oResponse.customerPaymentProfileId
            return oResponse;
        }

        [WebMethod]
        public string CreateCustomerPaymentProfileJSON(string PID, string name, string CCNumber, string Expiry, string CVV, string adrs, string city, string state, string zip, string phone)
        {
            createCustomerPaymentProfileResponse oResponse = oResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(PID, CCNumber, Expiry, CVV, name, adrs, city, state, zip, phone);
            //  oResponse.customerPaymentProfileId
            return new JavaScriptSerializer().Serialize(oResponse);
        }

        [WebMethod]
        public ANetApiResponse GetCustomerProfile(int UID)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            PaymentProfileController oCtrl = new PaymentProfileController();
            UserPaymentProfile oInfo = oCtrl.GetPaymentProfile(UID);
            oResponse = net.authorize.sample.GetCustomerProfile.Run(oInfo.CustomerProfileID);
            return oResponse;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat=ResponseFormat.Json)]
        public string GetCustomerProfileJSON(int UID)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            PaymentProfileController oCtrl = new PaymentProfileController();
            UserPaymentProfile oInfo = oCtrl.GetPaymentProfile(UID);
            oResponse = net.authorize.sample.GetCustomerProfile.Run(oInfo.CustomerProfileID);
            return new JavaScriptSerializer().Serialize(oResponse);
        }
        [WebMethod]
        public ANetApiResponse DeleteCustomerPayProfile(string PID, string PPID)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            oResponse = net.authorize.sample.DeleteCustomerPaymentProfile.Run(PID, PPID);
            return oResponse;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat=ResponseFormat.Json)]
        public string DeleteCustomerPayProfileJSON(string PID, string PPID)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            oResponse = net.authorize.sample.DeleteCustomerPaymentProfile.Run(PID, PPID);
            return new JavaScriptSerializer().Serialize(oResponse);
        }

        [WebMethod]
        public List<AppointmentPhotoInfo> GetAppointmentPhotos(int AID)
        {
            AppointmentController oCtrl = new AppointmentController();
            List<AppointmentPhotoInfo> lstString = oCtrl.ListAppointmentPhotos(AID);
            int Counter = (3- lstString.Count);
            if (Counter < 1) { Counter = 1; }
            for (int i = 0; i < Counter; i++)
            {
                AppointmentPhotoInfo oNew = new AppointmentPhotoInfo();
                oNew.FilePath = "/DesktopModules/NS_MakeAppointment/Images/Site/noimg.png";
                lstString.Add(oNew);
            }
            return lstString;
        }
        [WebMethod]
        public void AddAppointmentPhoto(int AID, int UID, string FilePath)
        {
            AppointmentController oCtrl = new AppointmentController();
            oCtrl.AddAppointmentPhoto(UID, AID, FilePath);
        }
        [WebMethod]
        public void RemoveAppointmentPhoto(int ID)
        {
            AppointmentController oCtrl = new AppointmentController();
            oCtrl.RemoveAppointmentPhoto(ID);
        }

        [WebMethod]
        public void AddNotification(int ByID, int ToID, int NotTypeID, int RelatedEntityID)
        {
            NotificationController oCtrl = new NotificationController();
            oCtrl.AddNotification(ByID, ToID, NotTypeID, 0, RelatedEntityID);
        }

        [WebMethod]
        public void RemoveNotification(int ID)
        {
            NotificationController oCtrl = new NotificationController();
            oCtrl.RemoveNotification(ID);
        }
        [WebMethod]
        public void RemoveUserNotification(int UID)
        {
            NotificationController oCtrl = new NotificationController();
            oCtrl.RemoveNotificationByUser(UID);
        }
        [WebMethod]
        public List<NotificationInfo> GetMyNotification(int MyID)
        {
            NotificationController oCtrl = new Components.NotificationController();
            return oCtrl.GetMyNotifications(MyID);
        }

        /// <summary>
        /// Admin wants to see the activity by the clients and service providers
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public List<NotificationInfo> GetAdminNotification(int PN, int RPP)
        { // PN- Current Page Number, RPP - Records Per Page
            NotificationController oCtrl = new Components.NotificationController();
            return oCtrl.GetAdminNotification(PN, RPP);
        }
        
        [WebMethod(enableSession: true)]
        public int GetUserNotification()
        {
            var ops = GetCurrentUserInfo().UserID;
            if (ops != -1)
            {
                NotificationController oCtrl = new Components.NotificationController();
                return oCtrl.GetMyNotifications(ops).Count;
            }
            else
            {
                return 0;
            }
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
                { user =UserController.GetCachedUser(portalSettings.PortalId, Thread.CurrentPrincipal.Identity.Name); return user ?? new UserInfo(); }
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
            string file = TargetFolder + "/userlist_"+RN+".xls";
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
            HtmlTextController oCtrl = new HtmlTextController();
            HtmlTextInfo rValue = oCtrl.GetAllHtmlText(ModID)[0];
            return rValue.Content;
        }
     }

 
}
