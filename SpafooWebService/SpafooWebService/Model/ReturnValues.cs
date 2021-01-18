

namespace SpafooWebService.Model
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    #region ["Return Values"]
    [DataContract]
    public class ReturnValues
    {
        [DataMember]
        public string Success { get; set; }
        [DataMember]
        public string Failure { get; set; }
        [DataMember]
        public string CustomerID { get; set; }

        [DataMember]
        public string Source { get; set; }
        [DataMember]
        public bool Status { get; set; }
        [DataMember]
        public string Usertype { get; set; }
   [DataMember]
        public string ProfileID { get; set; }

    }
    #endregion

    #region ["Register User"]
    [DataContract]
    public class RegisterUser
    {
        [DataMember]
        public string Username { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string EmailAddress { get; set; }
        [DataMember]
        public int PortalID { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public string Street { get; set; }
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public string State { get; set; }
        [DataMember]
        public string Zipcode { get; set; }
        [DataMember]
        public string PhoneNo { get; set; }
        [DataMember]
        public string MobileNo { get; set; }
        [DataMember]
        public string picFID { get; set; }
        [DataMember]
        public string HardwareName { get; set; }
        [DataMember]
        public string DeviceToken { get; set; }

    }
    #endregion

    #region ["Change Password"]
    [DataContract]
    public class ChangePassword
    {
        [DataMember]
        public int UserID { get; set; }
        [DataMember]
        public string CurrentPassword { get; set; }
        [DataMember]
        public string NewPassword { get; set; }
        [DataMember]
        public string ConfirmNewPassword { get; set; }
        [DataMember]
        public string UserEmailID { get; set; }

    }

    #endregion

    #region ["Login User"]
    [DataContract]
    public class LoginUser
    {
        [DataMember]
        public string Username { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public string HardwareName { get; set; }
        [DataMember]
        public string DeviceToken { get; set; }
    }
    #endregion

    #region ["Credit Card Information"]
    [DataContract]
    public class CreditCardInfo
    {

        [DataMember]
        public int UID { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string CCNumber { get; set; }
        [DataMember]
        public string Expiry { get; set; }
        [DataMember]
        public string CVV { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public string State { get; set; }
        [DataMember]
        public string Zip { get; set; }
        [DataMember]
        public string Phone { get; set; }
        [DataMember]
        public decimal Amount { get; set; }
    }
    #endregion
    [DataContract]
    public class clsService {
        [DataMember]
        public string ServiceID { get; set; }
    }


    #region["Make Appointment"]
    [DataContract]
    public class ScheduleAppointment
    {
        [DataMember]
        public int ClientID { get; set; }
        [DataMember]
        public int ProviderID { get; set; }
        [DataMember]
        public int AddressID { get; set; }
        [DataMember]
        public string ForDate { get; set; }
        [DataMember]
        public string AtTime { get; set; }
        [DataMember]
        public string EndTime { get; set; }
        [DataMember]
        public string CSVSRVC { get; set; }
        [DataMember]
        public string PayTxnID { get; set; }
        [DataMember]
        public string CCNumber { get; set; }
        [DataMember]
        public string Expriry { get; set; }
        [DataMember]
        public string Comment { get; set; }
        [DataMember]
        public string oAuthTxn { get; set; }
        [DataMember]
        public string PayProfileID { get; set; }
        [DataMember]
        public int EditAppID { get; set; }
        [DataMember]
        public decimal Discount { get; set; }
        [DataMember]
        public int AnyProviderIDs { get; set; }

    }

    #endregion

    #region ["AddAddress"]
    [DataContract]
    public class AddAddress
    {
        [DataMember]
        public string street { get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string state { get; set; }
        [DataMember]
        public string zip { get; set; }
    }
    #endregion

    #region ["AddAddress"]
    [DataContract]
    public class RefundCancelCard
    {

        [DataMember]
        public int AID { get; set; }
        [DataMember]
        public string TxnID { get; set; }
        [DataMember]
        public decimal Amount { get; set; }

    }

    [DataContract]
    public class UpdateAppointments
    {

        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public string Comment { get; set; }
        [DataMember]
        public string PaymentTxnID { get; set; }

    }

    [DataContract]
    public class AppointmentComplete
    {
        [DataMember]
        public int UserID { get; set; }
        [DataMember]
        public int clientId { get; set; }
        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public string Comment { get; set; }
        [DataMember]
        public string authTxnID { get; set; }
        [DataMember]
        public string PaymentTxnID { get; set; }
        [DataMember]
        public string PID { get; set; }
        [DataMember]
        public string PPID { get; set; }
        [DataMember]
        public string Amount { get; set; }



    }
    #endregion

    #region ["Rating"]
    [DataContract]
    public class Rating
    {
        [DataMember]
        public int RatingByID { get; set; }
        [DataMember]
        public int RatingToID { get; set; }
        [DataMember]
        public int AppID { get; set; }
        [DataMember]
        public string RatingCSV { get; set; }
        [DataMember]
        public string ReviewCSV { get; set; }

    }
    #endregion

    #region ["UpdateUsers"]
    [DataContract]
    public class updateUsers
    {
        [DataMember]
        public int UserID { get; set; }
        [DataMember]
        public string FN { get; set; }
        [DataMember]
        public string LN { get; set; }
        [DataMember]
        public string E { get; set; }
        [DataMember]
        public string p { get; set; }
        [DataMember]
        public string Mo { get; set; }
        [DataMember]
        public string Str { get; set; }
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public string Region { get; set; }
        [DataMember]
        public string PC { get; set; }
        [DataMember]
        public string DN { get; set; }
        [DataMember]
        public string Bio { get; set; }
        [DataMember]
        public string TagLine { get; set; }
        [DataMember]
        public string Gender { get; set; }
        [DataMember]
        public string TOE { get; set; }
        [DataMember]
        public string Lic { get; set; }
        [DataMember]
        public string SSN { get; set; }
        [DataMember]
        public string EIN { get; set; }
        [DataMember]
        public string uPOS { get; set; }

    }
    #endregion

    #region["AddMyAvail"]
    [DataContract]
    public class AddMyAvails
    {
        [DataMember]
        public int ProID { get; set; }
        [DataMember]
        public string CSV { get; set; }
    }
    #endregion

    #region["Remove My Sample"]
    [DataContract]
    public class RemoveMySamples
    {
        [DataMember]
        public int UserID { get; set; }
        [DataMember]
        public string FilePath { get; set; }
    }
    #endregion

    #region[Add Notification"]
    [DataContract]
    public class AddNotifications
    {
        [DataMember]
        public int ByID { get; set; }
        [DataMember]
        public int ToID { get; set; }
        [DataMember]
        public int NotTypeID { get; set; }
        [DataMember]
        public int RelatedEntityID { get; set; }

    }
    #endregion

    #region[Set Soonest App"]
    [DataContract]
    public class SetSoonest
    {

        [DataMember]
        public int AppID { get; set; }
        [DataMember]
        public int ClientID { get; set; }
        [DataMember]
        public int ProviderID { get; set; }
        [DataMember]
        public int AddressID { get; set; }
        [DataMember]
        public string ForDate { get; set; }
        [DataMember]
        public string AtTime { get; set; }
        [DataMember]
        public string EndTime { get; set; }
        [DataMember]
        public string Comment { get; set; }


    }
    #endregion

    #region
    [DataContract]
    public class IsProviderSlotFrees
    {
        [DataMember]
        public int ProID { get; set; }
        [DataMember]
        public string StartDateTime { get; set; }
        [DataMember]
        public string EndDateTime { get; set; }
        [DataMember]
        public int AppID { get; set; }
    }
    #endregion

    [DataContract]
    public class IoSData
    {
        [DataMember]
        public string Devicetoken { get; set; }
        [DataMember]
        public string Messages { get; set; }
    }

    #region [API Response]
  [DataContract]
    public partial class CustomerPaymentProfileresult
    {
        [DataMember]
        public string refId { get; set; }
    
        [DataMember]
        public string customerProfileId { get; set; }
        [DataMember]
        public string customerPaymentProfileId { get; set; }
        [DataMember]
        public string validationDirectResponse { get; set; }
        [DataMember]
        public messagesType messages { get; set; }
        [DataMember]
        public string sessionToken { get; set; }
    }

    [DataContract]
    public partial class ANetApiResponse
    {
        [DataMember]
        public string refId { get; set; }
        [DataMember]
        public transactionResponse transactionResponse { get; set; }

        [DataMember]
        public messagesType messages { get; set; }
        [DataMember]
        public string sessionToken { get; set; }
    }
    [DataContract]
    public partial class transactionResponse
    {
        [DataMember]
        public string responseCode { get; set; }
        [DataMember]
        public string rawResponseCode { get; set; }
        [DataMember]
        public string authCode { get; set; }
        [DataMember]
        public string avsResultCode { get; set; }
        [DataMember]
        public string cvvResultCode { get; set; }
        [DataMember]
        public string cavvResultCode { get; set; }
        [DataMember]
        public string transId { get; set; }
        [DataMember]
        public string refTransID { get; set; }
        [DataMember]
        public string transHash { get; set; }
        [DataMember]
        public string testRequest { get; set; }
        [DataMember]
        public string accountNumber { get; set; }
        [DataMember]
        public string accountType { get; set; }
        [DataMember]
        public string splitTenderId { get; set; }
        [DataMember]
        public string prePaidCard { get; set; }
    }
    [DataContract]
    public partial class messagesType
    {
        [DataMember]
        public messageTypeEnum resultCode { get; set; }
        [DataMember]
        public messagesTypeMessage[] message { get; set; }

    }


    [DataContract]
    public partial class messages
    {
        [DataMember]
        public message[] message { get; set; }
        [DataMember]
        public string resultCode { get; set; }

    }


    [DataContract]
    public partial class message
    {
        [DataMember]
        public string code { get; set; }
        [DataMember]
        public string text { get; set; }
    }

    [DataContract]
    public partial class messagesTypeMessage
    {
        [DataMember]
        public string code { get; set; }
        [DataMember]
        public string text { get; set; }
    }
    [DataContract]
    public enum messageTypeEnum
    {
        Ok,
        Error,
    }
    #endregion
}