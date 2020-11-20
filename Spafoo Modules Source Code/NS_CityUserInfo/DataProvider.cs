using DotNetNuke.Framework;
using System;
using System.Data;
namespace NS.Modules.NS_CityUserInfo
{
	public abstract class DataProvider
	{
		private static DataProvider objProvider;
		static DataProvider()
		{
			DataProvider.objProvider = null;
			DataProvider.CreateProvider();
		}
		private static void CreateProvider()
		{
			DataProvider.objProvider = (DataProvider)Reflection.CreateObject("data", "NS.Modules.NS_CityUserInfo", "");
		}
		public static DataProvider Instance()
		{
			return DataProvider.objProvider;
		}
		public abstract string AddUser(string UN, string Pwd);
		public abstract int GetUser(string UN, string PWD);
        public abstract void AddNS_CityUserForm(int UserID, string Firstname, string Lastname, string ContactPhone, string SSN, string DOB, string TypeOfID, string StateID, string DriverLicense, string IDState, bool HaveEmail, string EmailAddress, bool KeepConfidential, string ConnectDate, string ServiceStreet, string ServiceCity, string ServiceState, string ServiceZip, bool BillingAddressSame, string BillingStreet, string BillingCity, string BillingState, string BilliingZip, bool EBilling, string EBillingEmail, bool EnrolBankDraft, string BankRoutingNumber, string BankAccountNumber, string NameOnAccount, string BankName, bool AutoDraftAccount, string StateIDFile, string DriverLicenseFile, string CancelledCheckFile, string SSNFile, string POAFile, bool IsCommercial, string TaxID, string DBA,string PersonReqService);
		public abstract IDataReader GetUsersForm(int PI, int PS);
		public abstract IDataReader GetUserForm(int UID);
		public abstract void DeleteUserForm(int FormID);
	}
}
