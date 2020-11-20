using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace Netsam.Modules.NS_Registration.Components
{

    public class QCategoryInfo:IRequiresSessionState
    {
        /// <summary>
        /// Class Constructor
        /// </summary>
        public QCategoryInfo() { }
        public QCategoryInfo(int StepID)
        {
            this.StepID = StepID;

        }

        public QCategoryInfo(int StepID,int UserID)
        {
            this.StepID = StepID;
            this.UserID = UserID;
        }


        /// <summary>
        /// ID of Question
        /// </summary>
        public int QCategoryID { get; set; }

        /// <summary>
        /// Description for Question
        /// </summary>
        public string QCategoryDesc { get; set; }

        public bool Visibility { get; set; }

        public int StepID { get; set; }

        public int UserID { get; set; }
        public int OrderID { get; set; }
        public List<QuestionInfo> Questions { get {
            QuestionController oCtrl = new QuestionController();
            if ((HttpContext.Current.Session==null) || (HttpContext.Current.Session["NSR_FID"]== null))
                return oCtrl.GetQuestions(this.StepID, this.QCategoryID);
            else {
                this.UserID = int.Parse(HttpContext.Current.Session["NSR_FID"].ToString());
                return oCtrl.GetUserResponse(this.UserID,this.StepID, this.QCategoryID);
            }
        } }
    }

    public class Steps {
        public Steps() { }

        public int UserID { get; set; }
        public int StepID { get; set; }
        public List<QCategoryInfo> Categories
        {
            get
            {
                QuestionController oCtrl = new QuestionController();
                List<QCategoryInfo> lstCategories = oCtrl.GetQCatgories(this.StepID);
                return lstCategories;
            }
        }
        public DotNetNuke.Entities.Users.UserInfo UserDetail {
            get
            {
                DotNetNuke.Entities.Users.UserInfo oUser = new DotNetNuke.Entities.Users.UserInfo();
                if (this.UserID != -1)
                {
                    oUser = DotNetNuke.Entities.Users.UserController.GetUserById(0, this.UserID);
                }
                return oUser;
            }
        }
    }

    public class FormUserSteps
    {
        public FormUserSteps() { }
        public FormUserSteps(string username) { this.Username = username; }
        public FormUserSteps(int StepID, string UserName) { this.StepID = StepID; this.Username = Username; }

        public string Username { get; set; }
        public int StepID { get; set; }
        public List<FormUserQCategoryInfo> Categories
        {
            get
            {
                QuestionController oCtrl = new QuestionController();
                List<FormUserQCategoryInfo> lstCategories = oCtrl.GetFormUserQCatgories(this.StepID);
                return lstCategories;
            }
        }
        public FormUserInfo UserDetail
        {
            get
            {
                QuestionController oQCtrl = new QuestionController();
                return oQCtrl.GetFormUser(this.Username);
               
            }
        }
    }

    public class FormUserQCategoryInfo : IRequiresSessionState
    {
        /// <summary>
        /// Class Constructor
        /// </summary>
        public FormUserQCategoryInfo() {}
        public FormUserQCategoryInfo(int StepID)
        {
            this.StepID = StepID;
        }

        public FormUserQCategoryInfo(int StepID, string Username)
        {
            this.StepID = StepID;
            this.Username = Username;
        }

        /// <summary>
        /// ID of Question
        /// </summary>
        public int QCategoryID { get; set; }

        /// <summary>
        /// Description for Question
        /// </summary>
        public string QCategoryDesc { get; set; }

        public bool Visibility { get; set; }

        public int StepID { get; set; }

        public int UserID { get; set; }
        public string Username { get; set; }
        public int OrderID { get; set; }

        private List<QuestionInfo> _Questions;
        public List<QuestionInfo> Questions
        {
            get
            {
                QuestionController oCtrl = new QuestionController();
                if ((HttpContext.Current.Session == null) || (HttpContext.Current.Session["NSR_Username"] == null))
                    return oCtrl.GetQuestions(this.StepID, this.QCategoryID);
                else
                {
                    this.Username = HttpContext.Current.Session["NSR_Username"].ToString();
                    return oCtrl.GetFormUserResponse(this.Username, this.StepID, this.QCategoryID);
                }
            }
        }
        public List<QuestionInfo> GetQuestions(string Username,int StepID,int QCategoryID)
        {
            QuestionController oCtrl = new QuestionController();
            _Questions=oCtrl.GetFormUserResponse(Username, StepID, QCategoryID);
            return _Questions;
        }
    }
    public class NSR_UserResponse {
        public NSR_UserResponse() { }

        public int UserID { get; set; }
        public int QuestionID { get; set; }
        public List<QuestionOptionInfo> Options { get {
            QuestionController oCtrl = new QuestionController();
            return oCtrl.ListOptionsByQuestion(this.QuestionID);
        } }
    }

    public class NSR_User {

        public NSR_User() { }

        public string Username { get; set; }
        public int UserID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Status { get; set; }

        public string RejectionReason { get; set; }
        public string Notes { get; set; }
        public bool IsApproved { get; set; }
    }

    public class NS_UserHardware
    {
        public NS_UserHardware() { }

        public int UserID { get; set; }
        public string HardwareName { get; set; }
        public string DeviceToken { get; set; }

        public bool IsWebVersion { get; set; }
    }
}