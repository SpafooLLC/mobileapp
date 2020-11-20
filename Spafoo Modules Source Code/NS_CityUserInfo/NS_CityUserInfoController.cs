using DotNetNuke.Common.Utilities;
using System;
using System.Collections.Generic;
namespace NS.Modules.NS_CityUserInfo
{
	public class NS_CityUserInfoController
	{
		public string AddUser(string UN, string Pwd)
		{
			return DataProvider.Instance().AddUser(UN, Pwd);
		}
		public int GetUser(string UN, string PWD)
		{
			return DataProvider.Instance().GetUser(UN, PWD);
		}
        public void AddForm(int UserID, string Firstname, string Lastname, string ContactPhone, string SSN, string DOB, string TypeOfID, string StateID, string DriverLicense, string IDState, bool HaveEmail, string EmailAddress, bool KeepConfidential, string ConnectDate, string ServiceStreet, string ServiceCity, string ServiceState, string ServiceZip, bool BillingAddressSame, string BillingStreet, string BillingCity, string BillingState, string BilliingZip, bool EBilling, string EBillingEmail, bool EnrolBankDraft, string BankRoutingNumber, string BankAccountNumber, string NameOnAccount, string BankName, bool AutoDraftAccount, string StateIDFile, string DriverLicenseFile, string CancelledCheckFile, string SSNFIle, string POAFile, bool IsCommercial, string TaxID, string DBA,string PersonReqService)
		{
            DataProvider.Instance().AddNS_CityUserForm(UserID, Firstname, Lastname, ContactPhone, SSN, DOB, TypeOfID, StateID, DriverLicense, IDState, HaveEmail, EmailAddress, KeepConfidential, ConnectDate, ServiceStreet, ServiceCity, ServiceState, ServiceZip, BillingAddressSame, BillingStreet, BillingCity, BillingState, BilliingZip, EBilling, EBillingEmail, EnrolBankDraft, BankRoutingNumber, BankAccountNumber, NameOnAccount, BankName, AutoDraftAccount, StateIDFile, DriverLicenseFile, CancelledCheckFile, SSNFIle, POAFile, IsCommercial, TaxID, DBA, PersonReqService);
		}
		public NS_CityUserFormInfo GetUserForm(int UID)
		{
			return (NS_CityUserFormInfo)CBO.FillObject(DataProvider.Instance().GetUserForm(UID), typeof(NS_CityUserFormInfo));
		}
		public List<NS_CityUserFormInfo> GetUsersForm(int PI, int PS)
		{
			return CBO.FillCollection<NS_CityUserFormInfo>(DataProvider.Instance().GetUsersForm(PI, PS));
		}
		public void DeleteUserForm(int FormID)
		{
			DataProvider.Instance().DeleteUserForm(FormID);
		}
	}
}
