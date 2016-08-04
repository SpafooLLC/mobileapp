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
            oService.Tax = Tax;
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
        public void UpdateAppStatus(int AppID, int Status)
        {
            AppointmentController oCtrl = new AppointmentController();
            oCtrl.UpdateAppointmentStatus(AppID, Status);
            AppointmentInfo oApp = oCtrl.GetAppointment(AppID);
            if (oApp != null)
            {
                NotificationController oNCtrl = new NotificationController();
                if (Status == 0)
                {
                    // client accepted the provider given date for soonest appointment
                    oNCtrl.AddNotification(oApp.ClientID, oApp.ProviderID, 12, 0, oApp.AppointmentID);
                }
                if (Status == 5)
                {
                    // Provider given given date for soonest appointment
                    oNCtrl.AddNotification( oApp.ProviderID,oApp.ClientID, 11, 0, oApp.AppointmentID);
                }
            }
        }
        
        [WebMethod]
        public int MakeAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string CSVSRVC, string PayTxnID, string CCNumber, string Expriry,string Comment,string oAuthTxn,int EditAppID)
        {
            AppointmentController oCtrl = new AppointmentController();
            if (CCNumber.Trim()!="")
                CCNumber = CCNumber.Substring((CCNumber.Length - 4), 4);
            int AppointmentID = oCtrl.AddAppointment(ClientID, ProviderID, AddressID, ForDate, AtTime, PayTxnID, CCNumber, Expriry, Comment, oAuthTxn,EditAppID);

            if (EditAppID != 0)
            {
                /* if appointment edited , clear all the services entered before and add fresh entry for services */
                oCtrl.ClearAppServices(EditAppID);
                AppointmentID = EditAppID;
            }
            else
            {
                NotificationController oNCtrl = new NotificationController();
               
               
                if (ForDate.Trim() == "")
                {
                    oCtrl.UpdateAppointmentStatus(AppointmentID, 4);// Soonest Appointment created, Status ID will be 4 
                    oNCtrl.AddNotification(ClientID, ProviderID, 10, 0, AppointmentID);
                    oNCtrl.AddNotification(ClientID, ClientID, 10, 0, AppointmentID);
                }
                else
                {
                    oNCtrl.AddNotification(ClientID, ClientID, 4, 0, AppointmentID);
                    oNCtrl.AddNotification(ClientID, ProviderID, 4, 0, AppointmentID);
                }
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
            AppointmentController oCtrl = new AppointmentController();
            return oCtrl.ListAppointmentByProvider(UID);
        }

        [WebMethod]
        public List<AppointmentInfo> ListAppointmentByClient(int UID)
        {
            AppointmentController oCtrl = new AppointmentController();
            return oCtrl.ListAppointmentByClient(UID);
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
            oNCtrl.AddNotification(oApp.ClientID, oApp.ProviderID, 13, 0, -1);
            octrl.RemoveApp(ID);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="RatingByID"></param>
        /// <param name="RatingToID"></param>
        /// <param name="RatingValue"></param>
        /// <param name="RatingTypeID">0 - Star Rating , > 0 - Other Rating (e.g. communcation, punctuality etc)</param>
        [WebMethod]
        public void AddRating(int RatingByID, int RatingToID, string RatingCSV, string ReviewCSV)
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
                    oRCtrl.AddRating(RatingByID, RatingToID, RatingValue, RatingTypeID);
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
            oRCtrl.AddUserReview(RatingByID, RatingToID, ILike, IDLike, comment, int.Parse(aryReview[3]));
            NotificationController oNCtrl = new NotificationController();
            oNCtrl.AddNotification(RatingByID, RatingToID, 14, 0, -1); // User Review to Provider Notification
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
            if (Session["NS_MA_Init"] != null)
            {
                ANetApiResponse oResponse = net.authorize.sample.AuthorizeCreditCard.Run(CCNumber, Expiry, CardCode, amount);
                return oResponse;
            }
            else
            {
                ANetApiResponse oResp = new ANetApiResponse();
                return oResp;
            }
        }


        [WebMethod(enableSession: true)]
        public ANetApiResponse ChargeProfile(string PID, string PPID, decimal amount)
        {
            if (Session["NS_MA_Init"] != null)
            {
                ANetApiResponse oResponse = net.authorize.sample.ChargeCustomerProfile.Run(PID, PPID, amount);
                return oResponse;
            }
            else
            {
                ANetApiResponse oResp = new ANetApiResponse();
                return oResp;
            }
        }
        [WebMethod(enableSession: true)]
        public ANetApiResponse AuthProfile(string PID, string PPID, decimal amount)
        {
            if (Session["NS_MA_Init"] != null)
            {
                ANetApiResponse oResponse = net.authorize.sample.AuthorizeCustomerProfile.Run(PID, PPID, amount);
                return oResponse;
            }
            else
            {
                ANetApiResponse oResp = new ANetApiResponse();
                return oResp;
            }
        }
        [WebMethod(enableSession: true)]
        public ANetApiResponse ChargePreviousAuth(string Txn,decimal amount)
        {
            if ((Session["NS_MA_Init"] != null) || Session["MSS_Session"]!=null)
            {
                ANetApiResponse oResponse = net.authorize.sample.CapturePreviouslyAuthorizedAmount.Run(amount,Txn);
                NotificationController oNCtrl = new NotificationController();
                return oResponse;
            }
            else
            {
                ANetApiResponse oResp = new ANetApiResponse();
                return oResp;
            }
        }

        [WebMethod]
        public ANetApiResponse RefundCard(int AID, string TxnID, decimal Amount)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            AppointmentController oCtrl = new AppointmentController();
            AppointmentInfo oInfo = oCtrl.GetAppointment(AID);
            if (oInfo.ForDate != "")
            {
               // DateTime oDate = DateTime.Parse(oInfo.ForDate + ' ' + oInfo.AtTime);
                if (DateTime.Now.Subtract(oInfo.OrderDate).Hours < 12)
                {
                    Amount = ((Amount * 25) / 100); // charge 25% of the total amount, as per the refund/payment terms
                    oResponse = net.authorize.sample.CapturePreviouslyAuthorizedAmount.Run(Amount, TxnID);
                    if (oResponse.messages.resultCode == messageTypeEnum.Ok)
                    {
                        oCtrl.UpdateAppointmentStatus(AID, 3);// Appointment Status 3 - Cancelled
                        NotificationController oNCtrl = new NotificationController();
                        oNCtrl.AddNotification(oInfo.ClientID, oInfo.ProviderID, 9, 0, oInfo.AppointmentID);
                    }
                }
                else
                {
                    messagesType m = new messagesType();
                    messagesTypeMessage[] o = new messagesTypeMessage[1];
                    messagesTypeMessage Item = new messagesTypeMessage();
                    Item.code = "Expired";
                    Item.text = "Sorry, Appointment can be cancelled within 12 hrs only";
                    o[0] = Item;
                    m.message = o;
                    oResponse.messages = m;
                    oResponse.messages.resultCode = messageTypeEnum.Error;
                }
            }
            else
            {
                
                NotificationController oNCtrl = new NotificationController();
                oNCtrl.AddNotification(oInfo.ClientID, oInfo.ProviderID, 9, 0, oInfo.AppointmentID);
                oCtrl.UpdateAppointmentStatus(oInfo.AppointmentID, 3);
                messagesType m = new messagesType();
                messagesTypeMessage[] o = new messagesTypeMessage[1];
                messagesTypeMessage Item = new messagesTypeMessage();
                Item.code = "Removed";
                Item.text = "Appointment cancelled successfully";
                o[0] = Item;
                m.message = o;
                oResponse.messages = m;
                oResponse.messages.resultCode = messageTypeEnum.Ok;
            }
            return oResponse;
        }
        [WebMethod]
        public messagesType CreateCustomerProfile(int UID, string CCNumber, string Expiry, string CVV,string Email)
        {
            createCustomerProfileResponse oResponse =  new createCustomerProfileResponse();
            oResponse = net.authorize.sample.CreateCustomerProfile.Run(CCNumber, Expiry, CVV, Email);
            if (oResponse.messages.resultCode== messageTypeEnum.Ok)
            {
                UserPaymentProfile oProfile= new UserPaymentProfile();
                oProfile.CustomerProfileID=oResponse.customerProfileId;
                oProfile.UserID=UID;
                PaymentProfileController oCtrl = new PaymentProfileController();
                oCtrl.AddUserPaymentProfile(oProfile);
            }
            //if (oResponse.messages.message[0].code == "E00039")
            //{
            //    string resultString = Regex.Match(oResponse.messages.message[0].text, @"\d+").Value;
            //    net.authorize.sample.DeleteCustomerPaymentProfile.Run(resultString)
            //}
            return oResponse.messages;
        }

        [WebMethod]
        public messagesType CreateCustomerPaymentProfile(string PID, string CCNumber, string Expiry, string CVV)
        {
            createCustomerPaymentProfileResponse oResponse = oResponse = net.authorize.sample.CreateCustomerPaymentProfile.Run(PID, CCNumber, Expiry, CVV);
            return oResponse.messages;
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
        public ANetApiResponse DeleteCustomerPayProfile(string PID, string PPID)
        {
            ANetApiResponse oResponse = new ANetApiResponse();
            oResponse = net.authorize.sample.DeleteCustomerPaymentProfile.Run(PID, PPID);
            return oResponse;
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
    }
}
