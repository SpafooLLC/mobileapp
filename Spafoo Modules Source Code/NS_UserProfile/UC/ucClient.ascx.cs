using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Netsam.Modules.NS_UserProfile.Components;
using Netsam.Modules.MakeAppointment.Components;
namespace Netsam.Modules.NS_UserProfile.UC
{
    public partial class ucClient : NS_UserProfileModuleBase
    {
        public string GetUnseenCount
        {
            get
            {

                NS_ProfileController octrl = new NS_ProfileController();
                NotificationController oNotiCtl = new NotificationController();
                List<NotificationInfo> lstNotifs = oNotiCtl.GetMyNotifications(this.UserId);

                return lstNotifs.Count.ToString(); //octrl.GetUnseenCount(this.UserId).ToString();
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}