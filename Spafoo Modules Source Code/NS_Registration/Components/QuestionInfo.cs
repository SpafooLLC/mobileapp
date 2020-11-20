using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Netsam.Modules.NS_Registration.Components
{
    public class QuestionInfo
    {
        /// <summary>
        /// Class Constructor
        /// </summary>
        public QuestionInfo() { }

        /// <summary>
        /// ID of Question
        /// </summary>
        public int QuestionID { get; set; }

        public int UserID { get; set; }

        /// <summary>
        /// Description for Question
        /// </summary>
        public string QuestionText { get; set; }
        public int OrderID { get; set; }
        public string QType { get; set; }

        public string QTypeSub { get; set; }
        public int QCategoryID { get; set; }
        // public string QCategoryDesc { get; set; }
        public List<QuestionOptionInfo> Options
        {
            get
            {
                QuestionController oCtrl = new QuestionController();
                return oCtrl.ListOptionsByQuestion(this.QuestionID);
            }
        }
        /// <summary>
        /// DNN Profile Property Name
        /// </summary>
        public string ProfileProperty { get; set; }
        public bool IsVisible { get; set; }
        public bool IsRequired { get; set; }
        public string HintText { get; set; }
        public bool IsFullWidth { get; set; }

        /// <summary>
        /// User Response Field - ID of Option (mulitple option case)
        /// </summary>
        public int OptionID { get; set; }

        /// <summary>
        /// User Response Field - Text given by user for Question Type Text
        /// </summary>
        public string OptionText { get; set; }

        /// <summary>
        /// User Response Field - Primary ID (auto) of Response given by user
        /// </summary>
        public int ResponseID { get; set; }

    }
}