using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Xml;
using System.Web;
using DotNetNuke;
using DotNetNuke.Common;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;
using Netsam.Modules.NS_Registration.Data;

namespace Netsam.Modules.NS_Registration.Components
{
    /// -----------------------------------------------------------------------------
    ///<summary>
    /// The Controller class for the Group Members
    /// </summary>
    /// <remarks>
    /// </remarks>
    /// <history>
    /// </history>
    /// -----------------------------------------------------------------------------
    public class QuestionController
    {

        #region Constructors
        public QuestionController()
        {

        }
        #endregion

        #region Public Methods


        public void UpdateUserNotes(int UserID, string Notes)
        {
            DataProvider.Instance().UpdateUserNotes(UserID, Notes);
        }

        public NSR_User GetUserNotes(int UserId)
        {
            return CBO.FillObject<NSR_User>(DataProvider.Instance().GetuserNotes(UserId));
        }
        public List<QCategoryInfo> GetQCatgories(int StepID) {
            return CBO.FillCollection<QCategoryInfo>(DataProvider.Instance().GetQCategories(StepID));
        }
        public QCategoryInfo GetQCategory(int CategoryID) {
            return CBO.FillObject<QCategoryInfo>(DataProvider.Instance().GetQCategory(CategoryID));
        }

        public void UpdateCategory(int CatID, string Desc, string OrderID)
        {
            DataProvider.Instance().UpdateCategory(CatID.ToString(), Desc, OrderID);
        }
        public int AddQCategory(int StepID, string Description) {
            return DataProvider.Instance().AddQCategory(Description, StepID);
        }

        
        /// <summary>
        /// Returns list of questions to be shown on Registration UI
        /// </summary>
        /// <returns></returns>
        
        public List<QuestionInfo> GetQuestions(int StepID,int QCategoryID)
        {
            return CBO.FillCollection<QuestionInfo>(DataProvider.Instance().GetQuestions(StepID,QCategoryID));
        }

        public List<QuestionInfo> GetUserResponse(int UserID,int StepID, int QCategoryID)
        {
            return CBO.FillCollection<QuestionInfo>(DataProvider.Instance().GetUserResponse(UserID,StepID, QCategoryID));
        }

        public QuestionInfo GetQuestion(int QuestionID)
        {
            return CBO.FillObject<QuestionInfo>(DataProvider.Instance().GetQuestion(QuestionID));
        }

        public int AddQuestion(string QuestionText, string QType, int QCategoryID, bool IsRequired, bool IsVisible,bool IsFullWidth, string HintText, int OrderID)
        {
            return DataProvider.Instance().AddQuestion(QuestionText, QType, QCategoryID, IsRequired, IsVisible,IsFullWidth, HintText, OrderID);
        }
        
        public void RemoveQuestion(int QuestionID) {
            DataProvider.Instance().RemoveQuestion(QuestionID);
        }

        public void UpdateQuestion(int QuestionID, string QuestionText, string QType, int QCategoryID, bool IsRequired, bool IsVisible,bool IsFullWidth, string HintText, int OrderID) {
            DataProvider.Instance().UpdateQuestion(QuestionID, QuestionText, QType, QCategoryID, IsRequired, IsFullWidth, IsVisible, HintText, OrderID);
        }

        // Add options to given QuestionID
        public int AddOption(string QID, string OptionText,int OnSelect)
        {
            return DataProvider.Instance().AddOption(QID, OptionText, OnSelect);
        }

        public QuestionOptionInfo GetOption(string OptionID)
        {
            return CBO.FillObject<QuestionOptionInfo>(DataProvider.Instance().GetOption(OptionID));
        }

        public void RemoveOption(string OID) {
            DataProvider.Instance().RemoveOption(OID);
        }

        public void AddUserResponse(int UserID, int QuestionID, int OptionID,string OptionText)
        {
            DataProvider.Instance().AddUserReponse(UserID, QuestionID, OptionID, OptionText);
        }

        public void AddUpdateUserRegister(int UserId, string Status, string Reason, int ByUserID) {
            DataProvider.Instance().AddUpdateUserRegister(UserId, Status, Reason, ByUserID);
        }

        public List<QuestionOptionInfo> ListOptionsByQuestion(int QuestionID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<QuestionOptionInfo>(DataProvider.Instance().GetOptionsByQuestion(QuestionID));
        }

        public List<QuestionOptionInfo> ListUserResponseOptions(int UserID, int QuestionID)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<QuestionOptionInfo>(DataProvider.Instance().ListUserResponseOptions(UserID, QuestionID));
        }

        public List<NSR_User> ListOfRegisteredUser(string Status,string Keyword)
        {
            return DotNetNuke.Common.Utilities.CBO.FillCollection<NSR_User>(DataProvider.Instance().GetRegisteredUsers(Status, Keyword));
        }

        public int GetTotalSteps() {
            return DataProvider.Instance().GetTotalSteps();
        }
        #endregion
    }
}

