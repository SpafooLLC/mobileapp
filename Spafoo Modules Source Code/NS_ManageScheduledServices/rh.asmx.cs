using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using Netsam.Modules.ManageScheduledServices.Components;
using System.Globalization;
using System.Web.Script.Serialization;

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

            // CSV format : Dated_StartTime_EndTime|Dated_StartTime_EndTime
            ScheduledServiceController oCtrl = new ScheduledServiceController();
            oCtrl.ClearAvailability(ProID);
            string[] aryCSV = CSV.Split('|');
            foreach (string oCSV in aryCSV)
            {
                string[] oRow = oCSV.Split('_');
                if (oRow[0].Trim() != "")
                {
                    DateTime oDated = DateTime.ParseExact(oRow[0], "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    oCtrl.AddProAvailability(ProID, oDated, oRow[1], oRow[2]);
                }
            }
        }
        [WebMethod]
        public void AddMyAvailEx(int ProID, string CSV)
        {

            // CSV format : Dated_StartTime_EndTime|Dated_StartTime_EndTime
            ScheduledServiceController oCtrl = new ScheduledServiceController();
            // oCtrl.ClearAvailability(ProID);
            string[] aryCSV = CSV.Split('|');
            foreach (string oCSV in aryCSV)
            {
                string[] oRow = oCSV.Split('_');
                if (oRow[0].Trim() != "")
                {
                    DateTime oDated = DateTime.ParseExact(oRow[0], "MM/dd/yyyy", CultureInfo.InvariantCulture);
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
        public string ListMyAvailJSON(int ProID)
        {
            ScheduledServiceController oCtrl = new ScheduledServiceController();
            //List<ProAvailabilityInfo>
            List<ProAvailabilityInfo> lstReturn = oCtrl.ListAvailability(ProID);
            return new JavaScriptSerializer().Serialize(lstReturn);
        }

        [WebMethod]
        public void RemoveAvail(int ID)
        {
           ScheduledServiceController oCtrl = new ScheduledServiceController();
            oCtrl.RemoveAvailability(ID);
        }
    }
}
