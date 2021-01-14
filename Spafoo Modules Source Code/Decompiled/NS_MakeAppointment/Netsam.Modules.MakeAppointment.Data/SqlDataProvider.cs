using DotNetNuke.Common.Utilities;
using DotNetNuke.Framework.Providers;
using Microsoft.ApplicationBlocks.Data;
using System;
using System.Data;

namespace Netsam.Modules.MakeAppointment.Data
{
    public class SqlDataProvider : DataProvider
    {
        private const string ProviderType = "data";

        private const string ModuleQualifier = "NS_MA_";

        private readonly ProviderConfiguration _providerConfiguration = ProviderConfiguration.GetProviderConfiguration("data");

        private readonly string _connectionString;

        private readonly string _providerPath;

        private readonly string _objectQualifier;

        private readonly string _databaseOwner;

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

        private string NamePrefix
        {
            get
            {
                return this.DatabaseOwner + this.ObjectQualifier + "NS_MA_";
            }
        }

        public SqlDataProvider()
        {

            // Read the configuration specific information for this provider
            Provider objProvider = (Provider)(_providerConfiguration.Providers[_providerConfiguration.DefaultProvider]);

            // Read the attributes for this provider

            //Get Connection string from web.config
            _connectionString = Config.GetConnectionString();

            if (string.IsNullOrEmpty(_connectionString))
            {
                // Use connection string specified in provider
                _connectionString = objProvider.Attributes["connectionString"];
            }

            _providerPath = objProvider.Attributes["providerPath"];

            _objectQualifier = objProvider.Attributes["objectQualifier"];
            if (!string.IsNullOrEmpty(_objectQualifier) && _objectQualifier.EndsWith("_", StringComparison.Ordinal) == false)
            {
                _objectQualifier += "_";
            }

            _databaseOwner = objProvider.Attributes["databaseOwner"];
            if (!string.IsNullOrEmpty(_databaseOwner) && _databaseOwner.EndsWith(".", StringComparison.Ordinal) == false)
            {
                _databaseOwner += ".";
            }

        }

        //public SqlDataProvider()
        //{
        //	//IL_0006: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_000b: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_0019: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_0024: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_0033: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_0038: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_0055: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_006c: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_0082: Unknown result type (might be due to invalid IL or missing references)
        //	//IL_00d8: Unknown result type (might be due to invalid IL or missing references)
        //	Provider val = this._providerConfiguration.Providers[this._providerConfiguration.DefaultProvider];
        //	this._connectionString = Config.GetConnectionString();
        //	if (string.IsNullOrEmpty(this._connectionString))
        //	{
        //		this._connectionString = val.Attributes["connectionString"];
        //	}
        //	this._providerPath = val.Attributes["providerPath"];
        //	this._objectQualifier = val.Attributes["objectQualifier"];
        //	if (!string.IsNullOrEmpty(this._objectQualifier) && !this._objectQualifier.EndsWith("_", StringComparison.Ordinal))
        //	{
        //		this._objectQualifier += "_";
        //	}
        //	this._databaseOwner = val.Attributes["databaseOwner"];
        //	if (!string.IsNullOrEmpty(this._databaseOwner) && !this._databaseOwner.EndsWith(".", StringComparison.Ordinal))
        //	{
        //		this._databaseOwner += ".";
        //	}
        //}

        private static object GetNull(object field)
        {
            return Null.GetNull(field, (object)DBNull.Value);
        }

        public override IDataReader ListAllAppointmentByAny()
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "ListAllAppointmentByAny", new object[0]);
        }

        public override IDataReader ListAppointmentByProvider(int UID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "ListAppointmentByProvider", new object[1]
            {
                UID
            });
        }

        public override IDataReader ListAppointmentByClient(int UID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "ListAppointmentByClient", new object[1]
            {
                UID
            });
        }

        public override IDataReader GetAppointment(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetAppointment", new object[1]
            {
                AppointmentID
            });
        }

        public override IDataReader ListServicesByAppointment(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "ListServiceByAppointment", new object[1]
            {
                AppointmentID
            });
        }

        public override IDataReader GetAppointmentLocation(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetAppointmentLocation", new object[1]
            {
                AppointmentID
            });
        }

        public override int AddProviderAppointment(int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string PayTxnID, string CCNumber, string Expriry, string Comment, string PaymentProfileID, int EditAppID, decimal Discount, string AnyProviderIDs)
        {
            return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "AddProviderAppointment", new object[14]
            {
                ClientID,
                ProviderID,
                AddressID,
                ForDate,
                AtTime,
                EndTime,
                PayTxnID,
                CCNumber,
                Expriry,
                Comment,
                PaymentProfileID,
                EditAppID,
                Discount,
                AnyProviderIDs
            }).ToString());
        }

        public override int AddUserLocation(string Address, string City, string State, string Zip)
        {
            return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "AddAddress", new object[4]
            {
                Address,
                City,
                State,
                Zip
            }).ToString());
        }

        public override int AddServiceToAppointment(int AppointmentID, int ServiceID, int Qty, decimal Rate)
        {
            return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "AddServiceToAppointment", new object[4]
            {
                AppointmentID,
                ServiceID,
                Qty,
                Rate
            }).ToString());
        }

        public override void ClearAppServices(int AppointmentID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "ClearAppServices", new object[1]
            {
                AppointmentID
            });
        }

        public override void UpdateAppointment(int ID, string Comments, string PaymentTxnID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "UpdateAppointment", new object[3]
            {
                ID,
                Comments,
                PaymentTxnID
            });
        }

        public override void UpdateAppointmentStatus(int ID, int Status)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "UpdateAppointmentStatus", new object[2]
            {
                ID,
                Status
            });
        }

        public override int AcceptAppointment(int ProviderID, int AppID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "AcceptAppointment", new object[2]
            {
                ProviderID,
                AppID
            }).ToString());
        }

        public override void Unavailable4App(int ProviderID, int AppID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "Unavailable4App", new object[2]
            {
                ProviderID,
                AppID
            });
        }

        public override void UpdateAppSeenStatus(int ID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "UpdateSeenStatus", new object[1]
            {
                ID
            });
        }

        public override void UpdateAppBasicInfo(int AppID, int ClientID, int ProviderID, int AddressID, string ForDate, string AtTime, string EndTime, string Comment)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "UpdateAppBasic", new object[8]
            {
                AppID,
                ClientID,
                ProviderID,
                AddressID,
                ForDate,
                AtTime,
                EndTime,
                Comment
            });
        }

        public override void RemoveApp(int AppID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "RemoveApp", new object[1]
            {
                AppID
            });
        }

        public override void HideApp4Me(int AppID, string UserType)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "HideApp4Me", new object[2]
            {
                AppID,
                UserType
            });
        }

        public override bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime)
        {
            int num = int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "IsFreeSlotFor", new object[3]
            {
                ProID,
                StartDateTime,
                EndDateTime
            }).ToString());
            if (num == 1)
            {
                return true;
            }
            return false;
        }

        public override bool IsProviderSlotFree(int ProID, string StartDateTime, string EndDateTime, int AppID)
        {
            int num = int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "IsFreeSlotForEM", new object[4]
            {
                ProID,
                StartDateTime,
                EndDateTime,
                AppID
            }).ToString());
            if (num == 1)
            {
                return true;
            }
            return false;
        }

        public override IDataReader GetProOccupiedSlots(int ProviderID, string FromDate, string ToDate)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetProOccupiedSlots", new object[3]
            {
                ProviderID,
                FromDate,
                ToDate
            });
        }

        public override bool CanSetAvailability(int ProID, string StartDateTime, string EndDateTime)
        {
            int num = int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "CanSetAvailability", new object[3]
            {
                ProID,
                StartDateTime,
                EndDateTime
            }).ToString());
            if (num == 1)
            {
                return true;
            }
            return false;
        }

        public override IDataReader GetUsersInRole(string RoleName, int CP, int RPP)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetUsersInRole", new object[3]
            {
                RoleName,
                CP,
                RPP
            });
        }

        public override int AddRating(int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID, int AppID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "AddRating", new object[5]
            {
                RatingByID,
                RatingToID,
                RatingValue,
                RatingTypeID,
                AppID
            }).ToString());
        }

        public override int AddUserReview(int ByUserID, int ToUserID, string ILike, string IDLike, string Comments, int DisplayNameAs, int AppID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "AddUserReview", new object[7]
            {
                ByUserID,
                ToUserID,
                ILike,
                IDLike,
                Comments,
                DisplayNameAs,
                AppID
            }).ToString());
        }

        public override IDataReader ListRating(int RatingFilterType)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "ListRatingType", new object[1]
            {
                RatingFilterType
            });
        }

        public override bool DidIRated(int ByUserId, int AppID)
        {
            string a = SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "DidIRated", new object[2]
            {
                ByUserId,
                AppID
            }).ToString();
            if (a == "0")
            {
                return false;
            }
            return true;
        }

        public override void AddUserPaymentProfile(int UserID, string ProfileID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "UpdateUserPayProfile", new object[2]
            {
                UserID,
                ProfileID
            });
        }

        public override void DeleteUserPaymentProfile(int UserID, string ProfileID)
        {
            throw new NotImplementedException();
        }

        public override IDataReader GetPaymentProfile(int UserID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetPayProfile", new object[1]
            {
                UserID
            });
        }

        public override void AddAppointmentPhoto(int UserID, int AID, string FilePath)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "AddAppointmentPhoto", new object[3]
            {
                UserID,
                AID,
                FilePath
            });
        }

        public override void RemoveAppointmentPhoto(int FileID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "RemoveAppointmentPhoto", new object[1]
            {
                FileID
            });
        }

        public override IDataReader ListAppointmentPhotos(int AppointmentID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "ListAppointmentPhotos", new object[1]
            {
                AppointmentID
            });
        }

        public override int AddNotification(int ByID, int ToID, int NotTypeID, int Privacy, int RelatedEntityID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(this.ConnectionString, this.NamePrefix + "AddNotification", new object[5]
            {
                ByID,
                ToID,
                NotTypeID,
                Privacy,
                RelatedEntityID
            }).ToString());
        }

        public override void RemoveNotification(int NotID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "RemoveNotification", new object[1]
            {
                NotID
            });
        }

        public override IDataReader GetMyNotifications(int MyUserID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetNotifications", new object[1]
            {
                MyUserID
            });
        }

        public override IDataReader GetAdminNotifications(int Page, int RecsPerPage)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetAdminNotifications", new object[2]
            {
                Page,
                RecsPerPage
            });
        }

        public override void RemoveNotificationByUser(int UserID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "RemoveNotificationByUser", new object[1]
            {
                UserID
            });
        }

        public override void UpdateNotificationStatus(int AppID)
        {
            SqlHelper.ExecuteNonQuery(this.ConnectionString, this.NamePrefix + "UpdateNotificationStatus", new object[1]
            {
                AppID
            });
        }

        public override IDataReader GetOrderWithIn(int Hrs)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, this.NamePrefix + "GetOrderWithIn", new object[1]
            {
                Hrs
            });
        }

        public override IDataReader GetUserBasicInfo(int UserID)
        {
            return SqlHelper.ExecuteReader(this.ConnectionString, "NS_GetUserBasicInfo", new object[1]
            {
                UserID
            });
        }


        public string NS_GetCalendarPreference(int UserID)
        {
            try
            {
                var dt = SqlHelper.ExecuteDataset(ConnectionString, "NS_GetCalendarPreference", UserID).Tables[0];
                return dt.Rows[0]["OptionText"].ToString();
            }
            catch { }

            return "";

        }



        public string NS_AddCalendarPreference(int UserID)
        {
            try
            {
                var dt = SqlHelper.ExecuteDataset(ConnectionString, "NS_AddCalendarPreference", UserID).Tables[0];
                return "1";
            }
            catch { }

            return "";

        }

        public string NS_SaveCalendarPreference(int UserID,string CalendarPreference)
        {
            try
            {
                // Google Calendar, Office365 Calendar, None
                var dt = SqlHelper.ExecuteDataset(ConnectionString, "NS_SaveCalendarPreference", UserID, CalendarPreference).Tables[0];
                return "1";
            }
            catch { }

            return "";

        }


        public string NS_GetAddress(int AddressID)
        {
            try
            {
                var dt = SqlHelper.ExecuteDataset(ConnectionString,CommandType.Text,
              string.Format(@"SELECT  [Address]+','+[City]+','+[State]+','+[Zip] 'Address'
              FROM [dbo].[NS_ClientCustomAddress] where [AddressID] = {0}", AddressID)).Tables[0];

                return  dt.Rows[0]["Address"].ToString();
            }
            catch(Exception ex) {

              // return ("<!--"+ex.Message+ex.StackTrace+"-->");
            }

            return "";

        }
    }
}
