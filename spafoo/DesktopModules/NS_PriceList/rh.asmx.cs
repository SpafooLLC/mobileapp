using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Netsam.Modules.NS_PriceList.Components;
namespace Netsam.Modules.NS_PriceList
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class rh : System.Web.Services.WebService
    {

        [WebMethod]
        public List<StatRPTInfo> ReportByService(string F,string T)
        {
            List<StatRPTInfo> lstReport= new List<StatRPTInfo>();
            StatRPTController oCtrl =  new StatRPTController();
            lstReport=oCtrl.ListStatsRPTByService(F,T);
            return lstReport;
        }
        [WebMethod]
        public List<StatRPTInfo> ReportByProvider(string F, string T)
        {
            List<StatRPTInfo> lstReport = new List<StatRPTInfo>();
            StatRPTController oCtrl = new StatRPTController();
            lstReport = oCtrl.ListStatsRPTByProvider(F, T);
            return lstReport;
        }
    }
}
