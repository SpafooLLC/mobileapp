using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Netsam.Modules.NS_Registration.Components
{
    public class QuestionOptionInfo
    {
        /// <summary>
        /// Class Constructor
        /// </summary>
        public QuestionOptionInfo() { }

        /// <summary>
        /// ID of Question
        /// </summary>
        public int QuestionID { get; set; }

        /// <summary>
        /// Description for Question
        /// </summary>
        public string OptionText { get; set; }
        public int OrderID { get; set; }
        public int OptionID { get; set; }
        /// <summary>
        /// DNN RoleID which will be assigned to user when user select this options during registration
        /// </summary>
        public int OnSelect { get; set; }

        public string ProfileProperty { get; set; }
    }
}