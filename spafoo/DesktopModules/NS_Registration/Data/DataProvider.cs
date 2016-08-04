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

using System.Data;
using System;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Framework.Providers;


namespace Netsam.Modules.NS_Registration.Data
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// An abstract class for the data access layer
    /// 
    /// The abstract data provider provides the methods that a control data provider (sqldataprovider)
    /// must implement. You'll find two commented out examples in the Abstract methods region below.
    /// </summary>
    /// -----------------------------------------------------------------------------
    public abstract class DataProvider
    {

        #region Shared/Static Methods

        private static DataProvider provider;

        // return the provider
        public static DataProvider Instance()
        {
            if (provider == null)
            {
                const string assembly = "Netsam.Modules.NS_Registration.Data.SqlDataprovider,NS_Registration";
                Type objectType = Type.GetType(assembly, true, true);

                provider = (DataProvider)Activator.CreateInstance(objectType);
                DataCache.SetCache(objectType.FullName, provider);
            }

            return provider;
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1024:UsePropertiesWhereAppropriate", Justification = "Not returning class state information")]
        public static IDbConnection GetConnection()
        {
            const string providerType = "data";
            ProviderConfiguration _providerConfiguration = ProviderConfiguration.GetProviderConfiguration(providerType);

            Provider objProvider = ((Provider)_providerConfiguration.Providers[_providerConfiguration.DefaultProvider]);
            string _connectionString;
            if (!String.IsNullOrEmpty(objProvider.Attributes["connectionStringName"]) && !String.IsNullOrEmpty(System.Configuration.ConfigurationManager.AppSettings[objProvider.Attributes["connectionStringName"]]))
            {
                _connectionString = System.Configuration.ConfigurationManager.AppSettings[objProvider.Attributes["connectionStringName"]];
            }
            else
            {
                _connectionString = objProvider.Attributes["connectionString"];
            }

            IDbConnection newConnection = new System.Data.SqlClient.SqlConnection();
            newConnection.ConnectionString = _connectionString.ToString();
            newConnection.Open();
            return newConnection;
        }

        #endregion

        #region Abstract methods

        //public abstract IDataReader GetItems(int userId, int portalId);

        //public abstract IDataReader GetItem(int itemId);        
        public abstract void UpdateUserNotes(int UserID,string Notes);
        public abstract IDataReader GetuserNotes(int UserID);
        public abstract IDataReader GetQCategories(int StepID);
        
        public abstract int AddQCategory(string Description, int StepID);
        
        public abstract IDataReader GetQCategory(int QCatID);

        public abstract void UpdateCategory(string CatID, string Desc, string OrderID);

        public abstract IDataReader GetQuestions(int StepID,int QCategoryID);
        public abstract IDataReader GetUserResponse(int UserID, int StepID, int QCategoryID);
        public abstract IDataReader GetQuestion(int QuestionID);
        
        public abstract IDataReader GetOptionsByQuestion(int QuestionID);
        public abstract IDataReader ListUserResponseOptions(int UserID, int QuestionID);

        public abstract int AddQuestion(string QuestionText, string QType, int QCategoryID, bool IsRequired, bool IsVisible, bool IsFullWidth, string HintText, int OrderID);
        public abstract void UpdateQuestion(int QuestionID, string QuestionText, string QType, int QCategoryID, bool IsRequired,bool IsFullWidth, bool IsVisible, string HintText, int OrderID);
        
        public abstract void RemoveQuestion(int QuestionID);

        public abstract int AddOption(string QID, string OptionText,int OnSelect);

        public abstract IDataReader GetOption(string OptionID);

        public abstract void RemoveOption(string OID);

        public abstract int AddUserReponse(int UserID, int QuestionID, int OptionID,string OptionText);

        public abstract void AddUpdateUserRegister(int UserID, string Status, string Reason, int ByUserID);

        public abstract IDataReader GetRegisteredUsers(string Status,string keywords);

        public abstract int GetTotalSteps();
        
        #endregion

    }

}