using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using Netsam.Modules.ManageScheduledServices.Components;
using System.Globalization;

namespace Netsam.Modules.ManageScheduledServices
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class rh : System.Web.Services.WebService
    {

        [WebMethod]
        public void AddMyAvail(int ProID, string CSV)
        {

            // CSV format : Dated:StartTime:EndTime|Dated:StartTime:EndTime
            ScheduledServiceController oCtrl = new ScheduledServiceController();
            string[] aryCSV = CSV.Split('|');
            foreach (string oCSV in aryCSV)
            {
                string[] oRow = oCSV.Split('_');
                if (oRow[0].Trim() != "")
                {
                    DateTime oDated = DateTime.ParseExact(oRow[0], "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    oCtrl.AddProAvailability(ProID, oDated, oRow[1], oRow[2]);
                }
            }
        }

        [WebMethod]
        public List<ProAvailabilityInfo> ListMyAvail(int ProID)
        {
            ScheduledServiceController oCtrl = new ScheduledServiceController();
            return oCtrl.ListAvailability(ProID);
        }

        [WebMethod]
        public void RemoveAvail(int ID)
        {
           ScheduledServiceController oCtrl = new ScheduledServiceController();
            oCtrl.RemoveAvailability(ID);
        }
    }
}
