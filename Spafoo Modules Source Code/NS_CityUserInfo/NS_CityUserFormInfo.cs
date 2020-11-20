using System;
namespace NS.Modules.NS_CityUserInfo
{
	public class NS_CityUserFormInfo
	{
		public int UserFormID
		{
			get;
			set;
		}
		public int FormID
		{
			get;
			set;
		}
		public int UserID
		{
			get;
			set;
		}
		public string Firstname
		{
			get;
			set;
		}
		public string Lastname
		{
			get;
			set;
		}
		public string ContactPhone
		{
			get;
			set;
		}

        /// <summary>
        /// SSN is both SSN and TaxID : TaxID in case of IsCommercial true and SSN when false
        /// </summary>
		public string SSN
		{
			get;
			set;
		}
		public string DOB
		{
			get;
			set;
		}
		public string TypeOfID
		{
			get;
			set;
		}
		public string StateID
		{
			get;
			set;
		}
		public string DriverLicense
		{
			get;
			set;
		}
		public string IDState
		{
			get;
			set;
		}
		public bool HaveEmail
		{
			get;
			set;
		}
        public bool IsCommercial { get; set; }

        //TaxID is not in user as Separate property...please use SSN as TaxID in case of IsCommercial=true
        public string TaxID { get; set; }
        public string DBA { get; set; }
        public string PersonReqService { get; set; }
		public bool KeepConfidential
		{
			get;
			set;
		}
		public string ConnectDate
		{
			get;
			set;
		}
		public string EmailAddress
		{
			get;
			set;
		}
		public string ServiceStreet
		{
			get;
			set;
		}
		public string ServiceCity
		{
			get;
			set;
		}
		public string ServiceState
		{
			get;
			set;
		}
		public string ServiceZip
		{
			get;
			set;
		}
		public bool BillingAddressSame
		{
			get;
			set;
		}
		public string BillingStreet
		{
			get;
			set;
		}
		public string BillingCity
		{
			get;
			set;
		}
		public string BillingState
		{
			get;
			set;
		}
		public string BilliingZip
		{
			get;
			set;
		}
		public bool EBilling
		{
			get;
			set;
		}
		public string EBillingEmail
		{
			get;
			set;
		}
		public bool EnrolBankDraft
		{
			get;
			set;
		}
		public string BankRoutingNumber
		{
			get;
			set;
		}
		public string BankAccountNumber
		{
			get;
			set;
		}
		public string NameOnAccount
		{
			get;
			set;
		}
		public string BankName
		{
			get;
			set;
		}
		public bool AutoDraftAccount
		{
			get;
			set;
		}
		public string StateIDFile
		{
			get;
			set;
		}
		public string DriverLicenseFile
		{
			get;
			set;
		}
		public string CancelledCheckFile
		{
			get;
			set;
		}
		public string POAFile
		{
			get;
			set;
		}
		public string SSNFile
		{
			get;
			set;
		}
	}
}
