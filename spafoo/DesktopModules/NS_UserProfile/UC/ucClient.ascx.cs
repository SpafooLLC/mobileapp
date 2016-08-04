using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Netsam.Modules.NS_UserProfile.Components;
namespace Netsam.Modules.NS_UserProfile.UC
{
    public partial class ucClient : NS_UserProfileModuleBase
    {
        public string GetUnseenCount
        {
            get
            {

                NS_ProfileController octrl = new NS_ProfileController();
                return octrl.GetUnseenCount(this.UserId).ToString();
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}