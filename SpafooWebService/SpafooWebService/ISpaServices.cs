

namespace SpafooWebService
{
    using MakeAppointment;
    using ManageScheduled;
    using Model;
    using Registration;
    using System.ServiceModel;
    using System.ServiceModel.Web;

    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ISpaServices" in both code and config file together.
    [ServiceContract]
    public interface ISpaServices
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AppointmentCompleted")]
        ReturnValues AppointmentCompleted(AppointmentComplete obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "RegisterUser")]
        ReturnValues RegisterUser(RegisterUser UserRegister);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "ChangePasswordUser")]
        ReturnValues ChangePasswordUser(ChangePassword obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "LoginUser")]
        ReturnValues LoginUser(LoginUser UserLogin);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "LogOutUser")]
        ReturnValues LogOutUser();

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "CreateCustomerProfile")]
        ReturnValues CreateCustomerProfile(CreditCardInfo info);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "CreateCustomerRegistrationProfile")]
        ReturnValues CreateCustomerRegistrationProfile(CreditCardInfo info);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetUserInfo/{userID}")]
        ServiceDashBoard.UserInfo GetUserInfo(string userID);
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetUserJSON/{userID}")]
        string GetUserJSON(string userID);
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetWithInMile")]
        int GetWithInMile();
        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ValidateCoupon/{Code}")]
        ServiceDashBoard.CouponInfo ValidateCoupon(string Code);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "UpdateCouponCount/{Code}")]
        void UpdateCouponCount(string Code);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetHTML/{ModID}")]
        string GetHTML(string ModID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetServiceList/{ParentID}")]
        ServiceDashBoard.ServiceInfo[] GetServiceList(string ParentID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ListRootBottomService")]
        ServiceDashBoard.ServiceInfo[] ListRootBottomService();

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetSpecificServiceRecord/{ServiceID}")]
        ServiceDashBoard.ServiceInfo[] GetSpecificServiceRecord(string ServiceID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetCustomerProfile/{userID}")]
        string GetCustomerProfile(string userID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetMyNotification/{userID}")]
        MakeAppointment.NotificationInfo[] GetMyNotification(string userID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetProfilePic/{fileId}")]
        string GetProfilePic(string fileId);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetServiceFrmNotification/{AppointmentID}")]
        string GetServiceFrmNotification(string AppointmentID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "RemoveUserNotification/{userID}")]
        ReturnValues RemoveUserNotification(string userID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "RemoveNotification/{NotificationID}")]
        ReturnValues RemoveNotification(string NotificationID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ListProvidersByServices/{ServiceID}")]
        ServiceDashBoard.UserInfo[] ListProvidersByServices(string ServiceID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "ListProvidersByServices_p")]
        ServiceDashBoard.UserInfo[] ListProvidersByServices_p(clsService obj);


        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "MakeAppointment")]
        int MakeAppointment(ScheduleAppointment obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AddAddress")]
        int AddAddress(AddAddress objAddress);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AuthCard")]
        MakeAppointment.ANetApiResponse AuthCard(CreditCardInfo obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AuthCardJSON")]
        string AuthCardJSON(CreditCardInfo obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AuthCardJSON1")]
        ReturnValues AuthCardJSON1(CreditCardInfo obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetMyRating/{UserID}")]
        ReturnValues GetMyRating(string UserID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetProTagLine/{UserID}")]
        ReturnValues GetProTagLine(string UserID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetProviderServices/{UserID}")]
        ServiceDashBoard.ServiceInfo[] GetProviderServices(string UserID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetWorkSamples/{UserID}")]
        ServiceDashBoard.WorkSample[] GetWorkSamples(string UserID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetMyReview/{UserID}")]
        ServiceDashBoard.UserReviewInfo[] GetMyReview(string UserID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ListAppointmentByClient/{UserID}")]
        AppointmentInfo[] ListAppointmentByClient(string UserID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetAppointment/{AppointMentID}")]
        AppointmentInfo GetAppointment(string AppointMentID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetAppLocation/{AppointMentID}")]
        ClientLocation GetAppLocation(string AppointMentID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "RefundCard")]
        string RefundCard(RefundCancelCard obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "DeleteCustomerPayProfile/{PID}/{PPID}")]
        string DeleteCustomerPayProfile(string PID, string PPID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ListRating/{RatingTypeID}")]
        RatingInfo[] ListRating(string RatingTypeID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AddRating")]
        ReturnValues AddRating(Rating obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "UpdateUser")]
        ReturnValues UpdateUser(updateUsers obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetQuestion/{QID}")]
        QuestionInfo GetQuestion(string QID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ListAppointmentByProvider/{UserID}")]
        AppointmentInfo[] ListAppointmentByProvider(string UserID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "UpdateAppSeenStatus/{AppointmentID}")]
        ReturnValues UpdateAppSeenStatus(string AppointmentID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "RemoveAppointmentPhoto/{AppointmentID}")]
        ReturnValues RemoveAppointmentPhoto(string AppointmentID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "ChargePreviousAuth")]
        string ChargePreviousAuth(RefundCancelCard obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "UpdateAppointment")]
        ReturnValues UpdateAppointment(UpdateAppointments obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "RemoveMySample")]
        ReturnValues RemoveMySample(RemoveMySamples obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ListMyAvail/{AppointmentID}")]
        string ListMyAvail(string AppointmentID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AddMyAvail")]
        ReturnValues AddMyAvail(AddMyAvails obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "RemoveAvail/{PID}")]
        ReturnValues RemoveAvail(string PID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "HideApp4Me/{AID}/{UserType}")]
        ReturnValues HideApp4Me(string AID, string UserType);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "AddNotification")]
        ReturnValues AddNotification(AddNotifications obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetAppointmentPhotos/{AppointMentID}")]
        AppointmentPhotoInfo[] GetAppointmentPhotos(string AppointMentID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "UpdateAppBasicInfo")]
        int UpdateAppBasicInfo(SetSoonest obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "UpdateAppStatus/{AppID}/{Status}")]
        ReturnValues UpdateAppStatus(string AppID, string Status);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ProviderDenyASAP/{AppID}")]
        ReturnValues ProviderDenyASAP(string AppID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "RemoveApp/{AppID}")]
        ReturnValues RemoveApp(string AppID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "IsProviderSlotFree")]
        bool IsProviderSlotFree(IsProviderSlotFrees obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetProviderSlotFree?AppID={AppID}&ProID={ProID}&EndDateTime={EndDateTime}&StartDateTime={StartDateTime}")]
        bool GetProviderSlotFree(string AppID, string ProID, string StartDateTime, string EndDateTime);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, UriTemplate = "MakeAppointment1?AddressID={AddressID}&AtTime={AtTime}&CCNumber={CCNumber}&CSVSRVC={CSVSRVC}&ClientID={ClientID}&Comment={Comment}&EditAppID={EditAppID}&EndTime={EndTime}&Expriry={Expriry}&ForDate={ForDate}&PayTxnID={PayTxnID}&ProviderID={ProviderID}&PayProfileID={PayProfileID}")]
        int MakeAppointment1(string addressID, string atTime, string cCNumber, string cSVSRVC, string clientID, string comment, string editAppID, string endTime, string expriry, string forDate, string payTxnID, string PayProfileID, string ProviderID);


        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "IsProviderSlotFreeEM")]
        bool IsProviderSlotFreeEM(IsProviderSlotFrees obj);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "GetProOccupiedSlots")]
        AppointmentInfo[] GetProOccupiedSlots(IsProviderSlotFrees obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "AuthProfileJSON/{PID}/{PPID}/{amount}")]
        string AuthProfileJSON(string PID, string PPID, string amount);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetServicesIn/{ServiceID}")]
        MakeAppointment.ServiceInfo[] GetServicesIn(string ServiceID);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "DidIRated/{ByUserID}/{AppID}")]
        bool DidIRated(string ByUserID, string AppID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "SendNotification")]
        void SendNotification(IoSData obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "ListUserHardware")]
        NS_UserHardware[] ListUserHardware();

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "GetUserHardware/{userID}")]
        NS_UserHardware[] GetUserHardware(string userID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "CanSetAvailability")]
        bool CanSetAvailability(IsProviderSlotFrees obj);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "VerifyCode/{UserEmailID}/{Code}")]
        string VerifyCode(string UserEmailID, string Code);

        [OperationContract]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "RequestVCode/{UserEmailID}")]
        string RequestVCode(string UserEmailID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, UriTemplate = "ChangePwd")]
        string ChangePwd(ChangePassword obj);



    }
}
