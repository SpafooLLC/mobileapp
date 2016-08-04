/*
' Copyright (c) 2016 Christoc.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Framework.Providers;
using Microsoft.ApplicationBlocks.Data;

namespace Netsam.Modules.NS_Registration.Data
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// SQL Server implementation of the abstract DataProvider class
    /// 
    /// This concreted data provider class provides the implementation of the abstract methods 
    /// from data dataprovider.cs
    /// 
    /// In most cases you will only modify the Public methods region below.
    /// </summary>
    /// -----------------------------------------------------------------------------
    public class SqlDataProvider : DataProvider
    {

        #region Private Members

        private const string ProviderType = "data";
        private const string ModuleQualifier = "NSR_";

        private readonly ProviderConfiguration _providerConfiguration = ProviderConfiguration.GetProviderConfiguration(ProviderType);
        private readonly string _connectionString;
        private readonly string _providerPath;
        private readonly string _objectQualifier;
        private readonly string _databaseOwner;

        #endregion

        #region Constructors

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

        #endregion

        #region Properties

        public string ConnectionString
        {
            get
            {
                return _connectionString;
            }
        }

        public string ProviderPath
        {
            get
            {
                return _providerPath;
            }
        }

        public string ObjectQualifier
        {
            get
            {
                return _objectQualifier;
            }
        }

        public string DatabaseOwner
        {
            get
            {
                return _databaseOwner;
            }
        }

        // used to prefect your database objects (stored procedures, tables, views, etc)
        private string NamePrefix
        {
            get { return DatabaseOwner + ObjectQualifier + ModuleQualifier; }
        }

        #endregion

        #region Private Methods

        private static object GetNull(object field)
        {
            return Null.GetNull(field, DBNull.Value);
        }

        #endregion

        #region Public Methods

        //public override IDataReader GetItem(int itemId)
        //{
        //    return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "spGetItem", itemId);
        //}

        //public override IDataReader GetItems(int userId, int portalId)
        //{
        //    return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "spGetItemsForUser", userId, portalId);
        //}

        public override void UpdateUserNotes(int UserID, string Notes)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateUserNotes", UserID, Notes);
        }

        public override System.Data.IDataReader GetuserNotes(int UserID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetUserNotes", UserID);
        }
        public override System.Data.IDataReader GetQCategories(int StepID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetQCategories" ,StepID);
        }

        public override int AddQCategory(string Description, int StepID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddQCategory", StepID, Description).ToString());
        }
        public override System.Data.IDataReader GetQCategory(int QCatID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetQCategory", QCatID);
        }

        public override void UpdateCategory(string CatID, string Desc, string OrderID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateCategory", CatID, Desc, OrderID);
        }


        public override System.Data.IDataReader GetQuestions(int StepID, int QCategoryID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetQuestions", QCategoryID,StepID);
        }
        public override System.Data.IDataReader GetUserResponse(int UserID, int StepID, int QCategoryID) {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetUserResponse",UserID, QCategoryID, StepID);
        }

        public override System.Data.IDataReader GetQuestion(int QuestionID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetQuestion", QuestionID);
        }

        public override System.Data.IDataReader GetOptionsByQuestion(int QuestionID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetOptionsByQuestion", QuestionID);
        }

        public override System.Data.IDataReader ListUserResponseOptions(int UserID, int QuestionID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "ListUserResponseOptions", UserID, QuestionID);
        }

        public override int AddQuestion(string QuestionText, string QType, int QCategoryID, bool IsRequired, bool IsVisible, bool IsFullWidth, string HintText, int OrderID)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "CreateQuestion", QuestionText, QType, QCategoryID, IsRequired, IsVisible, IsFullWidth, HintText, OrderID).ToString());
        }

        public override void RemoveQuestion(int QuestionID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveQuestion", QuestionID);
        }

        public override void UpdateQuestion(int QuestionID, string QuestionText, string QType, int QCategoryID, bool IsRequired, bool IsFullWidth, bool IsVisible, string HintText, int OrderID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "UpdateQuestion", QuestionID, QuestionText, QType, QCategoryID, IsRequired,IsFullWidth, IsVisible, HintText, OrderID);
        }
        public override int AddOption(string QID, string OptionText, int OnSelect)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddOption", QID, OptionText, OnSelect).ToString());
        }

        public override System.Data.IDataReader GetOption(string OptionID)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetOption",OptionID);
        }

        public override void RemoveOption(string OID)
        {
            SqlHelper.ExecuteNonQuery(ConnectionString, NamePrefix + "RemoveOption", OID);
        }

        public override int AddUserReponse(int UserID, int QuestionID, int OptionID, string OptionText)
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddUserResponse", UserID, QuestionID, OptionID, OptionText).ToString());
        }

        public override void AddUpdateUserRegister(int UserID, string Status, string Reason, int ByUserID)
        {
            SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "AddUpdateUserRegister", UserID, Status, Reason, ByUserID); ;
        }

        public override System.Data.IDataReader GetRegisteredUsers(string Status,string Keyword)
        {
            return SqlHelper.ExecuteReader(ConnectionString, NamePrefix + "GetRegisteredUsers",Status,Keyword);
        }
        public override int GetTotalSteps()
        {
            return int.Parse(SqlHelper.ExecuteScalar(ConnectionString, NamePrefix + "GetTotalSteps").ToString());
        }
        #endregion

    }

}