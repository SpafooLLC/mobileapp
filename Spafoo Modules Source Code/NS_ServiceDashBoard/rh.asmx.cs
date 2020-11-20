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
using System.Web.Script.Services;
using System.Web.Script.Serialization;

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
            List<ServiceInfo> lstService = oCtrl.GetServicesIn(SID);
            return lstService;
        }


        [WebMethod]
        public List<ServiceInfo> GetServicesIn2(int SID,int UID)
        {
            ServiceController oCtrl = new ServiceController();
            List<ServiceInfo> lstService = oCtrl.GetServicesIn2(SID,UID);
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
            else
            {
                ServiceInfo oService = new ServiceInfo();
                oService.ServiceID = -1;
                oService.ServiceName = "";
                oService.ShortDescription = "";
                oService.Price = 0;
                oService.Duration = 60;
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
                {
                    if (cService.ServiceID != oService.ServiceID)
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
            if (lstService.Count < 1)
            {
                ProviderServicesMapping(UID);
                lstService = oCtrl.GetProvideServices(UID);
            }

            return lstService;
        }


        [WebMethod]
        public int AddService(int SID, string SN, string SD, string Image, int PID, decimal Price, int Duration)
        {
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
            oService.Duration = Duration;
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
            int i = 0;
            foreach (string s in aryStr)
            {
                if (i == 0)
                {
                    int UID = int.Parse(s.Split(':')[0].ToString());
                    oCtrl.RemoveServiceForProvider(UID, -1);
                    i++;
                }
                if (s.Trim() != "")
                {
                    int UID = int.Parse(s.Split(':')[0].ToString());
                    int SID = int.Parse(s.Split(':')[1].ToString());
                    oCtrl.AssignToProvider(UID, SID);
                }
            }
        }



        [WebMethod]
        public string UpdateServicePriceRange(string CSV)
        {
            // CSV format : UID:SID|UID:SID
            string[] aryStr = CSV.Split('|'); // get the list of Services to add
            ServiceController oCtrl = new ServiceController();
            int i = 0;
            string retval = string.Empty;
            foreach (string s in aryStr)
            {
                
                if (s.Trim() != "")
                {
                    try
                    {
                        retval += s;

                        int UID = int.Parse(s.Split(':')[0].ToString());
                        retval += "--UID=" + UID;
                        int SID = int.Parse(s.Split(':')[1].ToString());
                        retval += "--SID=" + SID;
                        decimal Minimum = decimal.Parse(s.Split(':')[2].ToString());
                        retval += "--Minimum=" + Minimum;
                        decimal RangeTo = decimal.Parse(s.Split(':')[3].ToString());
                        retval += "--RangeTo=" + RangeTo;

                        new Netsam.Modules.ServiceDashBoard.Data.SqlDataProvider().UpdateServicePriceRange(SID,UID, Minimum, RangeTo);
                        retval += "--no error---";
                    }
                    catch(Exception ex) {
                        retval += ex.Message + ex.StackTrace;
                    }
                }

               
            }

            return "returning" + retval;
        }

        //[WebMethod]
        //public List<DotNetNuke.Entities.Users.UserInfo> ListProvidersByServices(string SIDs)
        //{
        //    ServiceController oCtr = new ServiceController();
        //    List<DotNetNuke.Entities.Users.UserInfo> lstUsers = oCtr.ListProviders(SIDs);
        //    foreach (DotNetNuke.Entities.Users.UserInfo oUser in lstUsers)
        //    {
        //        oUser.VanityUrl = GetLatLang(oUser.Profile.Street + "," + oUser.Profile.City + "," + oUser.Profile.Region + "," + oUser.Profile.Country);
        //    }
        //    return lstUsers;
        //}


        [WebMethod]
        public List<UserInfo2> ListProvidersByServices(string SIDs)
        {
            ServiceController oCtr = new ServiceController();
            List<DotNetNuke.Entities.Users.UserInfo> lstUsers = oCtr.ListProviders(SIDs);
            List<UserInfo2> lstUsers2 = new List<UserInfo2>();
            foreach (DotNetNuke.Entities.Users.UserInfo oUser in lstUsers)
            {
                oUser.VanityUrl = GetLatLang(oUser.Profile.Street + "," + oUser.Profile.City + "," + oUser.Profile.Region + "," + oUser.Profile.Country);
                UserInfo2 userInfo2 = new UserInfo2();
                userInfo2.userInfo = oUser;
                ServiceController oCtrl = new ServiceController();
                List<ServiceInfo> lstService = oCtrl.GetProvideServices(oUser.UserID);
                if (lstService.Count < 1)
                {
                    ProviderServicesMapping(oUser.UserID);
                    lstService = oCtrl.GetProvideServices(oUser.UserID);
                }
                
                userInfo2.services = lstService;

                lstUsers2.Add(userInfo2);


            }
            return lstUsers2;
        }
        private string GetLatLang(string address)
        {
            //var address = "123 something st, somewhere";
            try
            {
                var requestUri = string.Format("https://maps.googleapis.com/maps/api/geocode/xml?address={0}&sensor=false&&key=AIzaSyAaMEqVj82GZtDuCqOrf6OwYnMYR_yE0HY", Uri.EscapeDataString(address));

                var request = WebRequest.Create(requestUri);
                var response = request.GetResponse();
                var xdoc = XDocument.Load(response.GetResponseStream());

                var result = xdoc.Element("GeocodeResponse").Element("result");
                var locationElement = result.Element("geometry").Element("location");
                var lat = locationElement.Element("lat").Value;
                var lng = locationElement.Element("lng").Value;
                return lat + ":" + lng;
            }
            catch (Exception ex)
            {
                return "-1:-1";
            }
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
                oNew.OptionText = "/DesktopModules/NS_MakeAppointment/Images/Site/noimg2.png";
                lstString.Add(oNew);
            }
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
        public DotNetNuke.Entities.Users.UserInfo GetUserInfo(int UID)
        {
            DotNetNuke.Entities.Users.UserInfo oUser = new DotNetNuke.Entities.Users.UserInfo();
            try
            {
                DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
                oUser = oCtrl.GetUser(0, UID);
            }catch(Exception ex)
            {
                oUser.DisplayName = ex.Message;   
            }
            return oUser;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetUserJSON(int UID)
        {
            DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
            DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, UID);
            return new JavaScriptSerializer().Serialize(oUser);
        }
        [WebMethod]
        public string GetUserPic(int UID)
        {
            DotNetNuke.Entities.Users.UserController oCtrl = new DotNetNuke.Entities.Users.UserController();
            DotNetNuke.Entities.Users.UserInfo oUser = oCtrl.GetUser(0, UID);
            string rValue = "";
            if (oUser != null)
            {
                rValue = oUser.Profile.PhotoURL;
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
        [WebMethod]
        public UserReviewInfo GetMyRaReOnApp(int UserID, int AppID)
        {
            UserRatingController oCtrl = new UserRatingController();
            return oCtrl.GetRaReOnApp(UserID, AppID);
        }

        [WebMethod]
        public string GetWithInMile()
        {
            string rVal = DotNetNuke.Entities.Controllers.HostController.Instance.GetString("NS_WithInMile");
            if (rVal.Trim() == "")
            {
                rVal = "30";
            }
            return rVal;
        }

        [WebMethod]
        public void UpdateCouponCount(string Code)
        {
            if (Code.Trim() != "")
            {
                CouponsController oCtrl = new CouponsController();
                oCtrl.UpdateCouponCount(Code);
            }

        }

        [WebMethod]
        public CouponInfo ValidateCoupon(string Code)
        {
            CouponsController oCtrl = new CouponsController();
            return oCtrl.ValidateCoupon(Code);
        }
        [WebMethod]
        public string ValidateCouponJSON(string Code)
        {
            CouponsController oCtrl = new CouponsController();
            return new JavaScriptSerializer().Serialize(oCtrl.ValidateCoupon(Code));
        }
        [WebMethod]
        public CouponInfo GetCoupon(int ID)
        {
            CouponsController oCtrl = new CouponsController();
            return oCtrl.GetCoupon(ID);
        }

        [WebMethod]
        public List<CouponInfo> ListCoupon()
        {
            CouponsController oCtrl = new CouponsController();
            return oCtrl.ListCoupon();
        }

        [WebMethod]
        public void RemoveCoupon(int ID)
        {
            CouponsController oCtrl = new CouponsController();
            oCtrl.RemoveCoupon(ID);
        }

        [WebMethod]
        public int AddCoupon(string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons)
        {
            CouponsController oCtrl = new CouponsController();
            return oCtrl.AddCoupon(Name, Code, Discount, DiscountType, StartsFrom, EndsOn, NoOfCoupons);
        }

        [WebMethod]
        public int UpdateCoupon(int ID, string Name, string Code, int Discount, string DiscountType, DateTime StartsFrom, DateTime EndsOn, int NoOfCoupons)
        {
            CouponsController oCtrl = new CouponsController();
            oCtrl.UpdateCoupon(ID, Name, Code, Discount, DiscountType, StartsFrom, EndsOn, NoOfCoupons);
            return 1;
        }


        //[WebMethod]
        //public List<ServicePriceRange> GetServicePriceRange(int UserID)      
        //{
        //    //[NSR_GetUserResponse] 4618, 20,3
        //    List<ServicePriceRange> servicePriceRanges = new List<ServicePriceRange>();
        //    Netsam.Modules.ServiceDashBoard.Data.SqlDataProvider db = new Netsam.Modules.ServiceDashBoard.Data.SqlDataProvider();
        //    //var dt= db.NSR_GetUserResponse(UserID);
        //    var dt = db.NS_ProviderServicesMapping(UserID); //for getting all Provider Questions
        //    //return dr;
        //    ServicePriceRange spr = new ServicePriceRange();
        //    int rowCounter = 0;
        //    // spr.ServiceName=dr.ro

        //    for(int i=0;i<dt.Rows.Count;i++)
        //    {
        //        if (dt.Rows[i]["QType"].ToString() == "CheckBox")
        //        {
        //            spr.ServiceName = dt.Rows[i]["OptionText"].ToString();
        //            rowCounter++;
        //        }
        //        else if (rowCounter == 1)
        //        {
        //            try
        //            {
        //                spr.Minimum = Convert.ToInt32(dt.Rows[i]["OptionText"].ToString());
        //            }
        //            catch { }
        //            rowCounter++;
        //        }
        //        else if (rowCounter == 2)
        //        {
        //            try
        //            {
        //                spr.RangeTo = Convert.ToInt32(dt.Rows[i]["OptionText"].ToString());
        //            }
        //            catch { }
        //            rowCounter = 0;
        //            servicePriceRanges.Add(spr);
        //            spr = new ServicePriceRange();
        //        }


        //    }

        //     return servicePriceRanges;
        //}


        [WebMethod]
        public int ProviderServicesMapping(int UserID)      
        {
            
            List<ServicePriceRange> servicePriceRanges = new List<ServicePriceRange>();
            Netsam.Modules.ServiceDashBoard.Data.SqlDataProvider db = new Netsam.Modules.ServiceDashBoard.Data.SqlDataProvider();
            var dt = db.NS_ProviderServicesMapping(UserID);           
          

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["QType"].ToString() == "CheckBox")
                {
                    string serviceName = dt.Rows[i]["OptionText"].ToString();

                    var srv = db.GetServiceByName(serviceName.Replace("%u2019","'"));

                    decimal Minimum =0;
                    decimal RangeTo =0;

                    if (srv.Read())
                    {
                        try
                        {
                            Minimum = Convert.ToDecimal(dt.Rows[i + 1]["OptionText"].ToString());
                        }
                        catch { }
                        try
                        {
                            RangeTo = Convert.ToDecimal(dt.Rows[i + 2]["OptionText"].ToString());
                        }
                        catch { }

                        db.AddProviderServiceWithPrice(UserID, Convert.ToInt32(srv["ServiceID"].ToString())
                         ,Minimum,RangeTo);
                    }

                  
                }
               

            }

            return 1;
        }
    }

}
