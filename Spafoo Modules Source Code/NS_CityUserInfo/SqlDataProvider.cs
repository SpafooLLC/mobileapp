using DotNetNuke.Common.Utilities;
using DotNetNuke.Framework.Providers;
using Microsoft.ApplicationBlocks.Data;
using System;
using System.Data;
namespace NS.Modules.NS_CityUserInfo
{
	public class SqlDataProvider : DataProvider
	{
		private const string ProviderType = "data";
		private const string ModuleQualifier = "";
		private ProviderConfiguration _providerConfiguration = ProviderConfiguration.GetProviderConfiguration("data");
		private string _connectionString;
		private string _providerPath;
		private string _objectQualifier;
		private string _databaseOwner;
		public string ConnectionString
		{
			get
			{
				return this._connectionString;
			}
		}
		public string ProviderPath
		{
			get
			{
				return this._providerPath;
			}
		}
		public string ObjectQualifier
		{
			get
			{
				return this._objectQualifier;
			}
		}
		public string DatabaseOwner
		{
			get
			{
				return this._databaseOwner;
			}
		}
		public SqlDataProvider()
		{
			Provider provider = (Provider)this._providerConfiguration.Providers[this._providerConfiguration.DefaultProvider];
			this._connectionString = Config.GetConnectionString();
			if (this._connectionString == "")
			{
				this._connectionString = provider.Attributes["connectionString"];
			}
			this._providerPath = provider.Attributes["providerPath"];
			this._objectQualifier = provider.Attributes["objectQualifier"];
			if (this._objectQualifier != "" & !this._objectQualifier.EndsWith("_"))
			{
				this._objectQualifier += "_";
			}
			this._databaseOwner = provider.Attributes["databaseOwner"];
			if (this._databaseOwner != "" & !this._databaseOwner.EndsWith("."))
			{
				this._databaseOwner += ".";
			}
		}
		private string GetFullyQualifiedName(string name)
		{
			return this.DatabaseOwner + this.ObjectQualifier + name;
		}
		private object GetNull(object Field)
		{
			return Null.GetNull(Field, DBNull.Value);
		}
		public override void AddNS_CityUserForm(int UserID, string Firstname, string Lastname, string ContactPhone, string SSN, string DOB, string TypeOfID, string StateID, string DriverLicense, string IDState, bool HaveEmail, string EmailAddress, bool KeepConfidential, string ConnectDate, string ServiceStreet, string ServiceCity, string ServiceState, string ServiceZip, bool BillingAddressSame, string BillingStreet, string BillingCity, string BillingState, string BilliingZip, bool EBilling, string EBillingEmail, bool EnrolBankDraft, string BankRoutingNumber, string BankAccountNumber, string NameOnAccount, string BankName, bool AutoDraftAccount, string StateIDFile, string DriverLicenseFile, string CancelledCheckFile, string SSNFile, string POAFile,bool IsCommercial,string TaxID,string DBA,string PersonReqService)
		{
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.GetFullyQualifiedName("NS_City_AddForm"), new object[]
			{
				UserID,
				Firstname,
				Lastname,
				ContactPhone,
				SSN,
				DOB,
				TypeOfID,
				StateID,
				DriverLicense,
				IDState,
				HaveEmail,
				EmailAddress,
				KeepConfidential,
				ConnectDate,
				ServiceStreet,
				ServiceCity,
				ServiceState,
				ServiceZip,
				BillingAddressSame,
				BillingStreet,
				BillingCity,
				BillingState,
				BilliingZip,
				EBilling,
				EBillingEmail,
				EnrolBankDraft,
				BankRoutingNumber,
				BankAccountNumber,
				NameOnAccount,
				BankName,
				AutoDraftAccount,
				StateIDFile,
				DriverLicenseFile,
				CancelledCheckFile,
				SSNFile,
				POAFile,
                IsCommercial,
                TaxID,
                DBA,PersonReqService
            });
		}
		public override string AddUser(string UN, string Pwd)
		{
			return SqlHelper.ExecuteScalar(this.ConnectionString, this.GetFullyQualifiedName("NS_City_AddUser"), new object[]
			{
				UN,
				Pwd
			}).ToString();
		}
		public override int GetUser(string UN, string PWD)
		{
			return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.GetFullyQualifiedName("NS_City_GetUserInfo"), new object[]
			{
				UN,
				PWD
			}).ToString());
		}
		public override IDataReader GetUsersForm(int PI, int PS)
		{
			return SqlHelper.ExecuteReader(this.ConnectionString, this.GetFullyQualifiedName("NS_CityListUsersForm"), new object[]
			{
				PI,
				PS
			});
		}
		public override IDataReader GetUserForm(int UID)
		{
			return SqlHelper.ExecuteReader(this.ConnectionString, this.GetFullyQualifiedName("NS_City_GetUserForm"), new object[]
			{
				UID
			});
		}
		public override void DeleteUserForm(int FormID)
		{
			SqlHelper.ExecuteNonQuery(this.ConnectionString, "NS_City_DeleteUserForm", new object[]
			{
				FormID
			});
		}
	}
}
