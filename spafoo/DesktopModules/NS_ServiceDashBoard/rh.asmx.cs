using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using Netsam.Modules.ServiceDashBoard.Components;
using DotNetNuke.Services.FileSystem;
using DotNetNuke.Common.Utilities;
using System.IO;
using System.Net;
using System.Xml.Linq;

namespace Netsam.Modules.ServiceDashBoard
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class rh : System.Web.Services.WebService
    {

        [WebMethod]
        public List<ServiceInfo> GetServicesIn(int SID)
        {
            ServiceController oCtrl = new ServiceController();
            List<ServiceInfo> lstService= oCtrl.GetServicesIn(SID);
            return lstService;
        }

        [WebMethod]
        public List<ServiceInfo> GetService(int SID)
        {
            ServiceController oCtrl = new ServiceController();
            List<ServiceInfo> lstService = new List<ServiceInfo>();
            if (SID != -1)
            {
                ServiceInfo oService = oCtrl.GetService(SID);
                lstService.Add(oService);
            }
            else { 
                ServiceInfo oService = new ServiceInfo();
                oService.ServiceID = -1;
                oService.ServiceName = "";
                oService.ShortDescription = "";
                oService.Price = 0;
                oService.Tax = 0;
                oService.Image = "";
                oService.ParentID = -1;
                lstService.Add(oService);
            }
            return lstService;
        }

        [WebMethod]
        public List<ServiceInfo> ListRootBottomService()
        {
            List<ServiceInfo> lstServices = new List<ServiceInfo>();
            ServiceController oCtrl = new ServiceController();
            List<ServiceInfo> lstTemp = oCtrl.GetRootServices();
            foreach (ServiceInfo oService in lstTemp)
            {
                lstServices.Add(oService);
                List<ServiceInfo> lstChilds = oCtrl.GetBottomServicesIn(oService.ServiceID);
                foreach (ServiceInfo cService in lstChilds)
                {if (cService.ServiceID!=oService.ServiceID)
                    lstServices.Add(cService);
                }
            }
            return lstServices;
        }

        [WebMethod]
        public List<ServiceInfo> GetProviderServices(int UID)
        {
            ServiceController oCtrl = new ServiceController();
            List<ServiceInfo> lstService = oCtrl.GetProvideServices(UID);
            return lstService;
        }


        [WebMethod]
        public int AddService(int SID,string SN, string SD, string Image, int PID, decimal Price, decimal Tax) {
            /* 
             int SID - Service ID,
             * int STID - Service TypeID, 
             * string SN - Service Name,
             * string SD - Short Description , 
             * string Image, 
             * int PID - Parent ID , 
             * decimal Price, 
             * decimal Tax
             */
            Image = Image.Replace('~', '_');
            ServiceInfo oService = new ServiceInfo();
            oService.ServiceID = SID;
            oService.Tax = Tax;
            oService.ShortDescription = SD;
            oService.ServiceTypeID = -1;// STID;
            oService.ServiceName = SN;
            oService.Price = Price;
            oService.ParentID = PID;
            oService.Image = Image;
            ServiceController oCtrl = new ServiceController();
            return oCtrl.AddService(oService);
        }

        [WebMethod]
        public void RemoveService(int SID)
        {
            ServiceController oCtrl = new ServiceController();
            oCtrl.RemoveService(SID);
        }
        [WebMethod]
        public void AssignService(string CSV)
        {
            // CSV format : UID:SID|UID:SID
            string[] aryStr = CSV.Split('|'); // get the list of Services to add
            ServiceController oCtrl = new ServiceController();
            foreach (string s in aryStr)
            {
                if (s.Trim() != "")
                {
                    int UID = int.Parse(s.Split(':')[0].ToString());
                    int SID = int.Parse(s.Split(':')[1].ToString());
                    oCtrl.AssignToProvider(UID, SID);
                }
            }
        }
        [WebMethod]
        public List<DotNetNuke.Entities.Users.UserInfo> ListProvidersByServices(int SID) {
            ServiceController oCtr = new ServiceController();
            List<DotNetNuke.Entities.Users.UserInfo> lstUsers= oCtr.ListProviders(SID);
            foreach(DotNetNuke.Entities.Users.UserInfo oUser in lstUsers){
                oUser.DisplayName = GetLatLang(oUser.Profile.Street + "," + oUser.Profile.City + "," + oUser.Profile.Region + "," + oUser.Profile.Country);
            }
            return lstUsers;
        }
        private string GetLatLang(string address)
        {
//var address = "123 something st, somewhere";
            var requestUri = string.Format("http://maps.googleapis.com/maps/api/geocode/xml?address={0}&sensor=false", Uri.EscapeDataString(address));
            
            var request = WebRequest.Create(requestUri);
            var response = request.GetResponse();
            var xdoc =XDocument.Load(response.GetResponseStream());

            var result = xdoc.Element("GeocodeResponse").Element("result");
            var locationElement = result.Element("geometry").Element("location");
            var lat = locationElement.Element("lat").Value;
            var lng = locationElement.Element("lng").Value;
            return lat + ":" + lng;
        }
        [WebMethod]
        public List<WorkSample> GetWorkSamples(int PID)
        {
            ServiceController oCtrl = new ServiceController();
            List<WorkSample> lstString = oCtrl.GetWorkSamples(PID);
            // /DesktopModules/NS_MakeAppointment/Images/Site/noimg.png
                int Counter = (4 - lstString.Count);
                if (Counter < 1) { Counter = 1; }
                for (int i = 0; i < Counter; i++)
                {
                    WorkSample oNew = new WorkSample();
                    oNew.OptionText = "/DesktopModules/NS_MakeAppointment/Images/Site/noimg.png";
                    lstString.Add(oNew);
                }
            //WorkSample oSample= new WorkSample();
            //oSample.OptionText="/Images/NS_Registration/hkpcigalg2xoeoosax13bbyw/homegroup_pwd.png";
            //lstString.Add(oSample);
            //WorkSample oSample2 = new WorkSample();
            //oSample2.OptionText = "/Images/NS_Registration/hkpcigalg2xoeoosax13bbyw/Admin_Panel.png";
            //lstString.Add(oSample2);
            //WorkSample oSample33 = new WorkSample();
            //oSample33.OptionText = "/Images/NS_Registration/hkpcigalg2xoeoosax13bbyw/User_View.png";

            //lstString.Add(oSample33);
            //lstString.Add("/Images/NS_Registration/hkpcigalg2xoeoosax13bbyw/homegroup_pwd.png");
            //lstString.Add("/Images/NS_Registration/hkpcigalg2xoeoosax13bbyw/User_View.png");
            //lstString.Add("/Images/NS_Registration/hkpcigalg2xoeoosax13bbyw/Admin_Panel.png");
            return lstString;
        }

        [WebMethod]
        public DotNetNuke.Entities.Users.UserInfo GetUser(int UID)
        {
            DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
            DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, UID);
            return oUser;
        }
        [WebMethod]
        public string GetUserPic(int UID)
        {
            DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
            DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, UID);
            string rValue = "";
            if (oUser!=null){
                rValue=oUser.Profile.PhotoURL;
            }
            return rValue;
        }
        
        [WebMethod]
        public UserRatingInfo GetMyRating(int UserID)
        {
            UserRatingController oCtrl = new UserRatingController();
            return oCtrl.GetMyRating(UserID);
        }

        [WebMethod]
        public List<UserReviewInfo> GetMyReview(int UserID)
        {
            UserRatingController oCtrl = new UserRatingController();
            return oCtrl.GetMyReview(UserID);
        }
    }
}
