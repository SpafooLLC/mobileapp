using System;
using SpafooWebService.Model;
using System.Transactions;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using SpafooWebService.MakeAppointment;
using Newtonsoft.Json.Linq;
using SpafooWebService.Registration;
using SpafooWebService.ManageScheduled;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SpafooWebService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "SpaServices" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select SpaServices.svc or SpaServices.svc.cs at the Solution Explorer and start debugging.
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class SpaServices : ISpaServices
    {
        #region ["Constructor and private Variables"]
        private SpafooServiceReference.rh _objSpafoo;
        private UserProfile.rh _obhjuser;
        private Registration.rh _objRegistration;

        public SpaServices()
        {
            _objSpafoo = new SpafooServiceReference.rh();
            _obhjuser = new UserProfile.rh();
            _objRegistration = new Registration.rh();
        }
        #endregion

        #region ["Register User"]
        /// <summary>
        /// Return Rules 
        /// 0 means unsuccessfull and string is the reason behind
        /// 1 means success
        /// 97 is User ID
        /// </summary>
        /// <param name="UserRegister">Pass user Data for registeration like Username, FirstName, LastName, EmailAddress, PortalID, Password, Street, City, State, ZipCode, PhoneNo, Mobile No</param>
        /// <returns></returns>
        public ReturnValues RegisterUser(RegisterUser UserRegister)
        {
            //using (TransactionScope trans = new TransactionScope())
            //{
            try
            {
                var RegisterData = _objSpafoo.RegisterUser(UserRegister.Username, UserRegister.FirstName, UserRegister.LastName, UserRegister.EmailAddress, UserRegister.PortalID, UserRegister.Password, UserRegister.Street, UserRegister.City, UserRegister.State, UserRegister.Zipcode, UserRegister.PhoneNo, UserRegister.MobileNo, UserRegister.picFID, UserRegister.HardwareName, UserRegister.DeviceToken, 0, "Male",446);
                string[] StrArr = RegisterData.Split(':');
                LoginUser _UserLogin = new Model.LoginUser { Username = UserRegister.Username, Password = UserRegister.Password, DeviceToken = UserRegister.DeviceToken, HardwareName = UserRegister.HardwareName };
                var retUser = LoginUser(_UserLogin);

                ReturnValues ReturnObj = new ReturnValues
                {

                    Usertype = retUser.Usertype,
                    //  Usertype = "C",
                    Source = int.Parse(StrArr[0].ToString()) > 0 ? StrArr[1].ToString() : StrArr[0].ToString(),
                    Failure = retUser.Success.ToString() == "false" ? "Login Failed. Please remember that passwords are case sensitive" : "",
                    CustomerID = int.Parse(StrArr[0].ToString()) > 0 ? StrArr[1].ToString() : StrArr[0].ToString(),
                    Success = int.Parse(StrArr[0].ToString()) > 0 ? "Customer Registration Successfull" : StrArr[1].ToString(),
                };


                return ReturnObj;
            }
            catch (Exception ex)
            {
                //  trans.Dispose();
                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //   trans.Dispose();
            }
            // }
        }
        #endregion

        #region ["Create Credit Card Information"]      
        public ReturnValues CreateCustomerProfile(CreditCardInfo info)
        {
            try
            {
                MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                var userInfo = GetUserInfo(info.UID.ToString());
                var ProfileJSON = _objSpafoo.GetCustomerProfileJSON(info.UID);
                CustomerPaymentProfileresult RegisterData = new CustomerPaymentProfileresult();
                string CPPID = string.Empty;
                string CPID = string.Empty;
                if (ProfileJSON != "null")
                {
                    string ProfileID = JObject.Parse(ProfileJSON)["profile"]["customerProfileId"].ToString();
                    var RerData = _objSpafoo.CreateCustomerPaymentProfileJSON(ProfileID, info.Name, info.CCNumber, info.Expiry, info.CVV, info.Address, info.City, info.State, info.Zip, info.Phone);
                    RegisterData = JsonConvert.DeserializeObject<CustomerPaymentProfileresult>(RerData);
                    if ((RegisterData.messages.message[0].code == "E00039") || (RegisterData.messages.message[0].code == "I00001"))
                    {
                        CPPID = RegisterData.customerPaymentProfileId;
                    }
                }
                else
                {
                    var userdata = GetUserInfo(info.UID.ToString());
                    info.Email = userdata.Email;
                    info.Name = userdata.FirstName + " " + userdata.LastName;
                    var ReData = _objSpafoo.CreateCustomerProfileJSON(info.UID, info.Name, info.CCNumber, info.Expiry, info.CVV, info.Email, info.Address, info.City, info.State, info.Zip, info.Phone);
                    RegisterData = JsonConvert.DeserializeObject<CustomerPaymentProfileresult>(ReData);
                    if ((RegisterData.messages.message[0].code == "E00039"))
                    {
                        CPID = RegisterData.messages.message[0].text.Split(' ')[5];
                        CPPID = RegisterData.messages.message[0].text.Split(' ')[8];
                    }
                    else if ((RegisterData.messages.message[0].code == "I00001"))
                    {
                        CPPID = RegisterData.messages.message[0].text.Split(' ')[1];
                        CPID = RegisterData.customerPaymentProfileId;
                    }




                }
                ReturnValues ReturnObj = new ReturnValues
                {
                    ProfileID = CPID,
                    CustomerID = CPPID,
                    Source = RegisterData.messages.message[0].code,
                    Success = RegisterData.messages.message[0].text,
                };
                return ReturnObj;
            }
            catch (Exception ex)
            {
                //   trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //trans.Dispose();
            }
            //  }
        }

   public ReturnValues CreateCustomerRegistrationProfile(CreditCardInfo info)
        {
            try
            {
                MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
             //   var userInfo = GetUserInfo(info.UID.ToString());
             //   var ProfileJSON = _objSpafoo.GetCustomerProfileJSON(info.UID);
                CustomerPaymentProfileresult RegisterData = new CustomerPaymentProfileresult();
                string CPPID = string.Empty;
                string CPID = string.Empty;
                //if (ProfileJSON != "null")
                //{
                //    string ProfileID = JObject.Parse(ProfileJSON)["profile"]["customerProfileId"].ToString();
                //    var RerData = _objSpafoo.CreateCustomerPaymentProfileJSON(ProfileID, info.Name, info.CCNumber, info.Expiry, info.CVV, info.Address, info.City, info.State, info.Zip, info.Phone);
                //    RegisterData = JsonConvert.DeserializeObject<CustomerPaymentProfileresult>(RerData);
                //    if ((RegisterData.messages.message[0].code == "E00039") || (RegisterData.messages.message[0].code == "I00001"))
                //    {
                //        CPPID = RegisterData.customerPaymentProfileId;
                //    }
                //}
                //else
                //{
                    var userdata = GetUserInfo(info.UID.ToString());
                    info.Email = userdata.Email;
                    info.Name = userdata.FirstName + " " + userdata.LastName;
                    var ReData = _objSpafoo.CreateCustomerProfileJSON(info.UID, info.Name, info.CCNumber, info.Expiry, info.CVV, info.Email, info.Address, info.City, info.State, info.Zip, info.Phone);
                    RegisterData = JsonConvert.DeserializeObject<CustomerPaymentProfileresult>(ReData);
                    if ((RegisterData.messages.message[0].code == "E00039"))
                    {
                        CPID = RegisterData.messages.message[0].text.Split(' ')[5];
                        CPPID = RegisterData.messages.message[0].text.Split(' ')[8];
                    }
                    else if ((RegisterData.messages.message[0].code == "I00001"))
                    {
                        CPPID = RegisterData.messages.message[0].text.Split(' ')[1];
                        CPID = RegisterData.customerPaymentProfileId;
                    }




               // }
                ReturnValues ReturnObj = new ReturnValues
                {
                    ProfileID = CPID,
                    CustomerID = CPPID,
                    Source = RegisterData.messages.message[0].code,
                    Success = RegisterData.messages.message[0].text,
                };
                return ReturnObj;
            }
            catch (Exception ex)
            {
                //   trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //trans.Dispose();
            }
            //  }
        }

        public string DeleteCustomerPayProfile(string PID, string PPID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var RegisterData = _objSpafoo.DeleteCustomerPayProfileJSON(PID, PPID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #endregion

        #region ["Login User"]
        /// <summary>
        /// Return Rules when true : means the user is validated , it will be logged in to the system that time,
        /// When false : there must be something wrong either username or password
        /// </summary>
        /// <param name="UserLogin"></param>
        /// <returns></returns>
        public ReturnValues LoginUser(LoginUser UserLogin)
        {
            //using (TransactionScope trans = new TransactionScope())
            //{
            try
            {
                var getUserType1221 = WebCallMethod.WRequestobj(1, "ValidateUser", "{\"U\": \"" + UserLogin.Username + "\",\"P\": \"" + UserLogin.Password + "\"}");

                var RegisterData = _objSpafoo.ValidateUser(UserLogin.Username, UserLogin.Password);
                string getUserType = "C";

                if (!RegisterData.ToString().Equals("false"))
                {
                    string UIDs = (!RegisterData.ToString().Equals(null) && !RegisterData.ToString().Equals(string.Empty)) ? RegisterData : "0";
                    var getUserType1 = WebCallMethod.WRequestobj(4, "GetUserType", "{\"UID\": \"" + UIDs + "\"}");
                    getUserType = _obhjuser.GetUserType(UIDs);
                    // get the list of hardwares for the user
                    var getuserHardware = GetUserHardware(UIDs);
                    // if any hardware found 
                    if (getuserHardware != null && getuserHardware.Length > 0)
                    {
                        // iterate through each hardware 
                        foreach (var UH in getuserHardware)
                        {
                            // checking if current logged in device is in the list or not  && UH.DeviceToken.Equals(UserLogin.DeviceToken)
                            if (UH.DeviceToken.Trim() != "" && UH.UserID == int.Parse(UIDs))
                            {// if device found then why are we updating? and DeviceToken will be empty too , in what case ?
                             // did you remember when discuss if suppose user wants to login from other's mobile for that case we did this
                             /// no , if user logs from other mobile then it needs to add new record instead of updating, isnt ?

                                var getUserType121 = WebCallMethod.WRequestobj(5, "UpdateUserHardware", "{\"UserID\": \"" + UIDs + "\",\"HardwareName\": \"" + UserLogin.HardwareName + "\",\"DeviceToken\": \"" + UserLogin.DeviceToken + "\",\"IsWebVersion\": \"false\"}");

                                int updateHarwareInfo = _objRegistration.UpdateUserHardware(int.Parse(UIDs), UserLogin.HardwareName, UserLogin.DeviceToken, false);
                                break;
                            }
                            else if (UH.DeviceToken.Trim() == "")
                            {
                                var getUserType11 = WebCallMethod.WRequestobj(5, "AddUserHardware", "{\"UserID\": \"" + UIDs + "\",\"HardwareName\": \"" + UserLogin.HardwareName + "\",\"DeviceToken\": \"" + UserLogin.DeviceToken + "\",\"IsWebVersion\": \"false\"}");

                                // int AddHarwareInfo = _objRegistration.AddUserHardware(int.Parse(UIDs), UserLogin.HardwareName, UserLogin.DeviceToken, false);
                                break;
                            }
                        }
                    }
                    else if (UserLogin.DeviceToken != null)
                    {
                        var getUserType121 = WebCallMethod.WRequestobj(5, "AddUserHardware", "{\"UserID\": \"" + UIDs + "\",\"HardwareName\": \"" + UserLogin.HardwareName + "\",\"DeviceToken\": \"" + UserLogin.DeviceToken + "\",\"IsWebVersion\": \"false\"}");

                        //  int AddHarwareInfo = _objRegistration.AddUserHardware(int.Parse(UIDs), UserLogin.HardwareName, UserLogin.DeviceToken, false);
                    }
                }
                ReturnValues ReturnObj = new ReturnValues
                {
                    Usertype = getUserType,
                    //  Usertype = "C",
                    Source = RegisterData.ToString(),
                    Failure = RegisterData.ToString() == "false" ? "Login Failed. Please remember that passwords are case sensitive" : "",
                    Success = RegisterData.ToString() != "false" ? "" : "Successfully Logged in",
                };

                return ReturnObj;
            }
            catch (Exception ex)
            {
                //  trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //  trans.Dispose();
            }
            //  }

        }

        public ReturnValues UpdateUser(updateUsers obj)
        {
            //using (TransactionScope trans = new TransactionScope())
            //{
            try
            {
                var getUserType = _obhjuser.UpdateUser(obj.UserID, (obj.FN != null ? obj.FN : ""), (obj.LN != null ? obj.LN : ""), (obj.E != null ? obj.E : ""), (obj.p != null ? obj.p : ""),
                    (obj.Mo != null ? obj.Mo : ""), (obj.Str != null ? obj.Str : ""), (obj.City != null ? obj.City : ""), (obj.Region != null ? obj.Region : ""),
                   (obj.PC != null ? obj.PC : ""), (obj.DN != null ? obj.DN : ""), (obj.Bio != null ? obj.Bio : ""), (obj.TagLine != null ? obj.TagLine : ""),
                    (obj.Gender != null ? obj.Gender : ""), (obj.TOE != null ? obj.TOE : ""), (obj.Lic != null ? obj.Lic : ""), (obj.SSN != null ? obj.SSN : ""), (obj.EIN != null ? obj.EIN : ""), (obj.uPOS != null ? obj.uPOS : ""));
                ReturnValues ReturnObj = new ReturnValues
                {
                    Success = getUserType,
                };
                return ReturnObj;
            }
            catch (Exception ex)
            {
                //  trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //trans.Dispose();
            }
            //  }

        }

        #endregion

        #region ["Log Out User"]
        /// <summary>
        /// Return rules
        /// 1 : when successfully logged out 
        ///2 : when something went wrong
        /// </summary>
        /// <returns></returns>
        public ReturnValues LogOutUser()
        {
            //using (TransactionScope trans = new TransactionScope())
            //{
            try
            {
                var RegisterData = _objSpafoo.Logout();
                ReturnValues ReturnObj = new ReturnValues
                {
                    Status = (int.Parse(RegisterData.ToString()) == 1 ? true : false),
                    Failure = !(int.Parse(RegisterData.ToString()) == 1) ? "User Not Logged Out, something went wrong " : "",
                    Success = !(int.Parse(RegisterData.ToString()) == 1) ? "" : "Successfully Logged Out",
                };

                return ReturnObj;
            }
            catch (Exception ex)
            {
                //  trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //      trans.Dispose();
            }
            //   }

        }
        #endregion

        #region ["Get User Information"]
        public ServiceDashBoard.UserInfo GetUserInfo(string userID)
        {
            try
            {
                int uID = 0;
                uID = !string.IsNullOrEmpty(userID) ? int.Parse(userID) : 0;
                ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                var ds = WebCallMethod.WRequestobj(3, "GetUser", "{\"UID\": \"" + uID + "\"}");
                ServiceDashBoard.UserInfo RegisterData = _objSpafoo.GetUser(uID);
                return RegisterData;
            }
            catch (Exception ex)
            {


                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {


            }
        }
        public string GetUserJSON(string userID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    int uID = 0;
                    uID = !string.IsNullOrEmpty(userID) ? int.Parse(userID) : 0;
                    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    var RegisterData = _objSpafoo.GetUserJSON(uID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public string GetCustomerProfile(string userID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    int uID = 0;
                    uID = !string.IsNullOrEmpty(userID) ? int.Parse(userID) : 0;
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var RegisterData = _objSpafoo.GetCustomerProfileJSON(uID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public string GetProfilePic(string fileId)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    int uID = 0;
                    uID = !string.IsNullOrEmpty(fileId) ? int.Parse(fileId) : 0;
                    var RegisterData = _objSpafoo.GetProfilePic(uID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #endregion

        #region ["Get Services Information"]
        public ServiceDashBoard.ServiceInfo[] GetSpecificServiceRecord(string ServiceID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    int sID = 0;
                    sID = !string.IsNullOrEmpty(ServiceID) ? int.Parse(ServiceID) : 0;
                    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    ServiceDashBoard.ServiceInfo[] RegisterData = _objSpafoo.GetService(sID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ServiceDashBoard.ServiceInfo[] GetServiceList(string ParentID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    int sID = 0;
                    sID = !string.IsNullOrEmpty(ParentID) ? int.Parse(ParentID) : 0;
                    //    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    var getdatas = WebCallMethod.WRequestobj(3, "GetServicesIn", "{\"SID\": \"" + sID + "\"}");
                    var RegisterData = JsonConvert.DeserializeObject<ServiceDashBoard.ServiceInfo[]>(getdatas);
                    //ServiceDashBoard.ServiceInfo[] RegisterData = _objSpafoo.GetServicesIn(sID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ServiceDashBoard.ServiceInfo[] ListRootBottomService()
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    ServiceDashBoard.ServiceInfo[] RegisterData = _objSpafoo.ListRootBottomService();
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ServiceDashBoard.UserInfo2[] ListProvidersByServices_p(clsService obj)
        {
            try
            {
                //int sid = int.Parse(ServiceID);
                ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                var RegisterData = _objSpafoo.ListProvidersByServices(obj.ServiceID);

                return RegisterData;
            }
            catch (Exception ex)
            {
                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
        }


        public ServiceDashBoard.UserInfo2[] ListProvidersByServices(string ServiceID)
        {

            try
            {
                int sid = int.Parse(ServiceID);
                ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                var RegisterData = _objSpafoo.ListProvidersByServices(ServiceID);
                return RegisterData;
            }
            catch (Exception ex)
            {
                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }


        }

        public ReturnValues GetProTagLine(string UserID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    UserProfile.rh _objSpafoo = new UserProfile.rh();
                    int UID = int.Parse(UserID);
                    var RegisterData = _objSpafoo.GetProTagLine(UID);
                    ReturnValues ReturnObj = new ReturnValues
                    {
                        Success = RegisterData
                    };

                    return ReturnObj;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ReturnValues GetMyRating(string UserID) {
            using (TransactionScope trans = new TransactionScope()) {
                try {
                    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    int UID = int.Parse(UserID);
                    var RegisterData = _objSpafoo.GetMyRating(UID);
                    ReturnValues ReturnObj = new ReturnValues {
                        Success = (RegisterData != null ? RegisterData.Rating.ToString() + ":" + RegisterData.ByPeople.ToString() : "0:0")
                    };

                    return ReturnObj;
                }
                catch (Exception ex) {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally {
                    trans.Dispose();
                }
            }
        } 
        public ServiceDashBoard.ServiceInfo[] GetProviderServices(string UserID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    // int uid = int.Parse(UserID);
                    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    var getdatas = WebCallMethod.WRequestobj(3, "GetProviderServices", "{\"UID\": \"" + UserID + "\"}");
                    var RegisterData = JsonConvert.DeserializeObject<ServiceDashBoard.ServiceInfo[]>(getdatas);
                    //  var RegisterData = _objSpafoo.GetProviderServices(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ServiceDashBoard.WorkSample[] GetWorkSamples(string UserID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    int uid = int.Parse(UserID);
                    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    var RegisterData = _objSpafoo.GetWorkSamples(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ServiceDashBoard.UserReviewInfo[] GetMyReview(string UserID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    int uid = int.Parse(UserID);
                    ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    var RegisterData = _objSpafoo.GetMyReview(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        #endregion

        #region ["User Notificaiton"]

        public string GetServiceFrmNotification(string AppointmentID)
        {
            var AppointmentData = GetAppointment(AppointmentID);
            string serviceid = string.Empty;
            for (int i = 0; i < AppointmentData.Services.Length; i++)
            {
                serviceid += AppointmentData.Services[i].ServiceID + ":";

            }
            return serviceid.Substring(0, serviceid.LastIndexOf(":"));
        }

        public MakeAppointment.NotificationInfo[] GetMyNotification(string userID)
        {
            //using (TransactionScope trans = new TransactionScope())
            //{
            try
            {
                int uID = 0;
                uID = !string.IsNullOrEmpty(userID) ? int.Parse(userID) : 0;
                MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                NotificationInfo[] RegisterData = null;

                var getdatas = WebCallMethod.WRequestobj(2, "GetMyNotification", "{\"MyID\": \"" + userID + "\"}");
                RegisterData = JsonConvert.DeserializeObject<MakeAppointment.NotificationInfo[]>(getdatas);
                //  RegisterData = _objSpafoo.GetMyNotification(uID);
                return RegisterData;
            }
            catch (Exception ex)
            {
                //  trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //   trans.Dispose();
            }
            //  }
        }


        #endregion

        #region["Change Password"]
        public ReturnValues ChangePasswordUser(ChangePassword obj)
        {
            //using (TransactionScope trans = new TransactionScope())
            //{
            try
            {
                UserProfile.rh _objSpafoo = new UserProfile.rh();
                var RegisterData = _objSpafoo.ChangePassword(obj.UserID, obj.CurrentPassword, obj.NewPassword, obj.ConfirmNewPassword);

                ReturnValues ReturnObj = new ReturnValues
                {
                    Success = RegisterData
                };

                return ReturnObj;
            }
            catch (Exception ex)
            {
                //   trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //   trans.Dispose();
            }
            //  }
        }
        #endregion

        #region["Notification"]
        public ReturnValues RemoveUserNotification(string userID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(userID);
                    _objSpafoo.RemoveUserNotification(uid);
                    ReturnValues ReturnObj = new ReturnValues
                    {
                        Success = "Successfully Removed",
                    };

                    return ReturnObj;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues RemoveNotification(string NotificationID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(NotificationID);
                    _objSpafoo.RemoveNotification(uid);
                    ReturnValues ReturnObj = new ReturnValues
                    {
                        Success = "Successfully Removed",
                    };

                    return ReturnObj;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        #endregion

        #region["Make or Schedule an Appointment"]
        public int GetWithInMile()
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    var getdatas = WebCallMethod.WRequestobj(3, "GetWithInMile", "");
                    var RegisterData = JsonConvert.DeserializeObject<int>(getdatas);

                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public int MakeAppointment(ScheduleAppointment obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    //MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();

                    //var RegisterData = _objSpafoo.MakeAppointment(obj.ClientID, obj.ProviderID, obj.AddressID, obj.ForDate, obj.AtTime, obj.EndTime, obj.CSVSRVC, obj.PayTxnID, obj.CCNumber, obj.Expriry, obj.Comment, obj.oAuthTxn, obj.EditAppID);
                    var getdatas = WebCallMethod.WRequestobj(2, "MakeAppointment", JsonConvert.SerializeObject(obj));
                    var RegisterData = JsonConvert.DeserializeObject<int>(getdatas);

                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public int MakeAppointment1(string addressID, string atTime, string cCNumber, string cSVSRVC, string clientID, string comment, string editAppID, string endTime, string expriry, string forDate, string payTxnID, string PayProfileID, string ProviderID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    ScheduleAppointment obj = new Model.ScheduleAppointment
                    {
                        AddressID = int.Parse(addressID),
                        AtTime = atTime,
                        CCNumber = cCNumber,
                        CSVSRVC = cSVSRVC,
                        ClientID = int.Parse(clientID.ToString()),
                        Comment = comment,
                        EditAppID = int.Parse(editAppID),
                        EndTime = endTime,
                        Expriry = expriry,
                        ForDate = forDate,
                        PayTxnID = payTxnID,
                        PayProfileID = PayProfileID,
                        ProviderID = int.Parse(ProviderID),AnyProviderIDs= int.Parse(ProviderID),
                        Discount=0


                    };
                    //MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();

                    //var RegisterData = _objSpafoo.MakeAppointment(obj.ClientID, obj.ProviderID, obj.AddressID, obj.ForDate, obj.AtTime, obj.EndTime, obj.CSVSRVC, obj.PayTxnID, obj.CCNumber, obj.Expriry, obj.Comment, obj.oAuthTxn, obj.EditAppID);
                    var getdatas = WebCallMethod.WRequestobj(2, "MakeAppointment", JsonConvert.SerializeObject(obj));
                    var RegisterData = JsonConvert.DeserializeObject<int>(getdatas);

                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public int AddAddress(AddAddress obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    // MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var getdatas = WebCallMethod.WRequestobj(2, "AddAddress", "{\"street\": \"" + obj.street + "\",\"city\": \"" + obj.city + "\",\"state\": \"" + obj.state + "\",\"zip\": \"" + obj.zip + "\"}");
                    var RegisterData = JsonConvert.DeserializeObject<int>(getdatas);
                    //var RegisterData = _objSpafoo.AddAddress(obj.street, obj.city, obj.state, obj.zip);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public AppointmentInfo[] ListAppointmentByClient(string UserID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(UserID);
                    var RegisterData = _objSpafoo.ListAppointmentByClient(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public AppointmentInfo GetAppointment(string AppointMentID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(AppointMentID);
                    //   var getdatas = WebCallMethod.WRequestobj(2, "GetAppointment", "{\"ID\": \"" + AppointMentID + "\"}");

                    //    var RegisterData = JsonConvert.DeserializeObject<AppointmentInfo>(getdatas);

                    var RegisterData = _objSpafoo.GetAppointment(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ClientLocation GetAppLocation(string AppointMentID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(AppointMentID);
                    var getdatas = WebCallMethod.WRequestobj(2, "GetAppLocation", "{\"AppID\": \"" + AppointMentID + "\"}");

                    var RegisterData = JsonConvert.DeserializeObject<ClientLocation>(getdatas);


                    //   var RegisterData = _objSpafoo.GetAppLocation(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    // trans.Dispose();
                }
            }
        }
        public AppointmentPhotoInfo[] GetAppointmentPhotos(string AppointMentID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(AppointMentID);
                    var RegisterData = _objSpafoo.GetAppointmentPhotos(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public string RefundCard(RefundCancelCard obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var RegisterData = _objSpafoo.RefundCardJSON(obj.AID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        #endregion

        #region["Make Paymebnt AuthCard"]
        public MakeAppointment.ANetApiResponse AuthCard(CreditCardInfo obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var RegisterData = _objSpafoo.AuthCard(obj.CCNumber, obj.Expiry, obj.CVV, obj.Amount);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public string AuthCardJSON(CreditCardInfo obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    return _objSpafoo.AuthCardJSON(obj.CCNumber, obj.Expiry, obj.CVV, obj.Amount);

                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ReturnValues AuthCardJSON1(CreditCardInfo obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    ReturnValues objretur = new ReturnValues();
                    var AuthCrad = _objSpafoo.AuthCardJSON(obj.CCNumber, obj.Expiry, obj.CVV, obj.Amount);
                    var RegisterData = JsonConvert.DeserializeObject<Model.ANetApiResponse>(AuthCrad);
                    if (RegisterData.transactionResponse.responseCode == "1")
                    {
                        objretur = CreateCustomerProfile(obj);
                        objretur.Usertype = RegisterData.transactionResponse.responseCode;
                    }
                    return objretur;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public MakeAppointment.ServiceInfo[] GetServicesIn(string ServiceID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    var ChargePrevious = WebCallMethod.WRequestobj(3, "GetServicesIn", "{\"SID\": \"" + ServiceID + "\"}");
                    var objChargePrevious = JsonConvert.DeserializeObject<MakeAppointment.ServiceInfo[]>(ChargePrevious);
                    //ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    //return _objSpafoo.GetServicesIn(ServiceID);
                    return objChargePrevious;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }


        public string AuthProfileJSON(string PID, string PPID, string amount)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    return _objSpafoo.AuthProfileJSON(PID, PPID, decimal.Parse(amount));

                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        #endregion

        #region ["List Rating"]
        public RatingInfo[] ListRating(string RatingTypeID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int rate = int.Parse(RatingTypeID);
                    var RegisterData = _objSpafoo.ListRating(rate);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues AddRating(Rating obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();

                    _objSpafoo.AddRating(obj.RatingByID, obj.RatingToID, obj.RatingCSV, obj.ReviewCSV, obj.AppID);
                    ReturnValues ReturnObj = new ReturnValues
                    {
                        Success = "Successfull Done",
                    };

                    return ReturnObj;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues AddNotification(AddNotifications obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();

                    _objSpafoo.AddNotification(obj.ByID, obj.ToID, obj.NotTypeID, obj.RelatedEntityID);
                    ReturnValues ReturnObj = new ReturnValues
                    {
                        Success = "Successfull Done",
                    };

                    return ReturnObj;
                }
                catch (Exception ex)
                {
                    trans.Dispose();

                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #endregion

        public QuestionInfo GetQuestion(string QID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    Registration.rh _objSpafoo = new Registration.rh();
                    var RegisterData = _objSpafoo.GetQuestion(QID);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #region ["Provider My Schedule"]

        public AppointmentInfo[] ListAppointmentByProvider(string UserID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(UserID);
                    var RegisterData = _objSpafoo.ListAppointmentByProvider(uid);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues UpdateAppSeenStatus(string AppointmentID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int uid = int.Parse(AppointmentID);
                    _objSpafoo.UpdateAppSeenStatus(uid);
                    ReturnValues objreturn = new ReturnValues { Success = "Update Successfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ReturnValues RemoveAppointmentPhoto(string AppointmentID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    int Appid = int.Parse(AppointmentID);
                    _objSpafoo.RemoveAppointmentPhoto(Appid);
                    ReturnValues objreturn = new ReturnValues { Success = "Removed Successfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public string ChargePreviousAuth(RefundCancelCard obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var objreturn = _objSpafoo.ChargePreviousAuthJSON(obj.TxnID, obj.Amount);
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ReturnValues UpdateAppointment(UpdateAppointments obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var getUserType121 = WebCallMethod.WRequest(2, "UpdateAppointment", "{\"ID\": \"" + obj.ID + "\",\"Comment\": \"" + obj.Comment + "\",\"PaymentTxnID\": \"" + obj.PaymentTxnID + "\", }");

                    _objSpafoo.UpdateAppointment(obj.ID, obj.Comment, obj.PaymentTxnID);
                    ReturnValues objreturn = new ReturnValues { Success = "Update Successfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ReturnValues AppointmentCompleted(AppointmentComplete obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    //MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var ChargePrevious = WebCallMethod.WRequestobj(2, "ChargeProfileJSON", "{\"PID\": \"" + obj.PID + "\",\"PPID\": \"" + obj.PPID + "\",\"amount\": \"" + obj.Amount + "\"}");
                    //          var  ChargePrevious = WebCallMethod.WRequestobj(2, "ChargePreviousAuthJSON", "{\"Txn\": \"" + obj.authTxnID + "\",\"amount\": \"" + obj.Amount + "\"}");
                    var objChargePrevious = JsonConvert.DeserializeObject<Model.ANetApiResponse>(ChargePrevious);

                    ReturnValues objreturn = null;
                    if (objChargePrevious.messages.message[0].code == "I00001")
                    {

                        var getUserType121 = WebCallMethod.WRequestobj(2, "UpdateAppointment", "{\"ID\": \"" + obj.ID + "\",\"C\": \"" + obj.Comment + "\",\"PaymentTxnID\": \"" + objChargePrevious.transactionResponse.transId + "\" }");
                        AddNotification(new AddNotifications { ByID = obj.UserID, NotTypeID = 8, RelatedEntityID = obj.ID, ToID = obj.clientId });

                        objreturn = new ReturnValues { Success = "Update Successfully" };
                    }
                    else
                    {
                        objreturn = new ReturnValues { Success = "Not Update Successfully" };
                    }
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }


        public ReturnValues RemoveMySample(RemoveMySamples obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    UserProfile.rh _objSpafoo = new UserProfile.rh();

                    _objSpafoo.RemoveMySample(obj.UserID, obj.FilePath);
                    ReturnValues objreturn = new ReturnValues { Success = "Removed Successfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ReturnValues HideApp4Me(string AID, string UserType)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    _objSpafoo.HideApp4Me(int.Parse(AID), UserType);
                    ReturnValues objreturn = new ReturnValues { Success = "Removed Successfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }



        #endregion

        #region["My Availability"]
        public string ListMyAvail(string AppointmentID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    ManageScheduled.rh _objSpafoo = new ManageScheduled.rh();
                    int AppId = int.Parse(AppointmentID);
                    var RegisterData = _objSpafoo.ListMyAvailJSON(AppId);
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues AddMyAvail(AddMyAvails obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    ManageScheduled.rh _objSpafoo = new ManageScheduled.rh();

                    _objSpafoo.AddMyAvail(obj.ProID, obj.CSV);
                    ReturnValues objreturn = new Model.ReturnValues { Success = "Added Succesfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues RemoveAvail(string PID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    ManageScheduled.rh _objSpafoo = new ManageScheduled.rh();
                    int pids = int.Parse(PID);
                    _objSpafoo.RemoveAvail(pids);
                    ReturnValues objreturn = new Model.ReturnValues { Success = "Removed Succesfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public int UpdateAppBasicInfo(SetSoonest o)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var objreturn = _objSpafoo.UpdateAppBasicInfo(o.AppID, o.ClientID, o.ProviderID, o.AddressID, o.ForDate, o.AtTime, o.EndTime, o.Comment);
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public ReturnValues UpdateAppStatus(string AppID, string Status)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    _objSpafoo.UpdateAppStatus(int.Parse(AppID), int.Parse(Status));
                    ReturnValues objreturn = new Model.ReturnValues { Success = "Updated Succesfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues ProviderDenyASAP(string AppID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    _objSpafoo.ProviderDenyASAP(int.Parse(AppID));
                    ReturnValues objreturn = new Model.ReturnValues { Success = "Updated Succesfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public ReturnValues RemoveApp(string AppID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    _objSpafoo.RemoveApp(int.Parse(AppID));
                    ReturnValues objreturn = new Model.ReturnValues { Success = "Removed Succesfully" };
                    return objreturn;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #endregion


        #region["Schedule Appointment"]
        public bool GetProviderSlotFree(string AppID, string ProID, string StartDateTime, string EndDateTime)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    bool RegisterData = false;
                    int apID = int.Parse((AppID == null || AppID == string.Empty) ? AppID = "0" : AppID);
                    if (apID > 0)
                    {
                        var getdatas = WebCallMethod.WRequestobj(2, "IsProviderSlotFreeEM", "{\"ProID\": \"" + ProID + "\",\"StartDateTime\": \"" + StartDateTime + "\",\"EndDateTime\": \"" + EndDateTime + "\",\"AppID\": \"" + AppID + "\"}");
                        RegisterData = JsonConvert.DeserializeObject<bool>(getdatas.ToLower());

                    }
                    else
                    {
                        var getdatas = WebCallMethod.WRequestobj(2, "IsProviderSlotFree", "{\"ProID\": " + ProID + ",\"StartDateTime\": \"" + DateTime.Parse(StartDateTime) + "\",\"EndDateTime\": \"" + DateTime.Parse(EndDateTime) + "\"}");
                        RegisterData = bool.Parse(getdatas.ToLower());
                    }
                    return RegisterData;

                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public bool IsProviderSlotFree(IsProviderSlotFrees obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    //   MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();

                    var getdatas = WebCallMethod.WRequestobj(2, "IsProviderSlotFree", "{\"ProID\": " + obj.ProID + ",\"StartDateTime\": \"" + DateTime.Parse(obj.StartDateTime) + "\",\"EndDateTime\": \"" + DateTime.Parse(obj.EndDateTime) + "\"}");
                    bool RegisterData = bool.Parse(getdatas);

                    return RegisterData;
                    // return _objSpafoo.IsProviderSlotFree(obj.ProID, obj.StartDateTime, obj.StartDateTime);
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public bool IsProviderSlotFreeEM(IsProviderSlotFrees obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    var getdatas = WebCallMethod.WRequestobj(2, "IsProviderSlotFreeEM", "{\"ProID\": \"" + obj.ProID + "\",\"StartDateTime\": \"" + obj.StartDateTime + "\",\"EndDateTime\": \"" + obj.EndDateTime + "\",\"AppID\": \"" + obj.AppID + "\"}");
                    var RegisterData = JsonConvert.DeserializeObject<bool>(getdatas);

                    return RegisterData; // _objSpafoo.IsProviderSlotFreeEM(obj.ProID, obj.StartDateTime, obj.StartDateTime, obj.AppID);
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public AppointmentInfo[] GetProOccupiedSlots(IsProviderSlotFrees obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    return _objSpafoo.GetProOccupiedSlots(obj.ProID, obj.StartDateTime, obj.EndDateTime);
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }


        public bool CanSetAvailability(IsProviderSlotFrees obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    return _objSpafoo.CanSetAvailability(obj.ProID, obj.StartDateTime, obj.EndDateTime);
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        public bool DidIRated(string ByUserID, string AppID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    MakeAppointment.rh _objSpafoo = new MakeAppointment.rh();
                    return _objSpafoo.DidIRated(int.Parse(ByUserID), int.Parse(AppID));
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #endregion

        public void SendNotification(IoSData obj)
        {
            new NotificationService().SendToiOS(obj.Devicetoken, obj.Messages);
        }

        #region["User's Hardware Info"]
        public NS_UserHardware[] GetUserHardware(string userID)
        {
            //using (TransactionScope trans = new TransactionScope())
            //{
            try
            {
                NS_UserHardware[] RegisterData = null;
                var getUserType121 = WebCallMethod.WRequestobj(5, "GetUserHardware", "{\"UserID\": \"" + userID + "\"}");

                RegisterData = _objRegistration.GetUserHardware(int.Parse(userID));
                return RegisterData;
            }
            catch (Exception ex)
            {
                //   trans.Dispose();

                ReturnValues objex = new ReturnValues
                {
                    Failure = ex.Message,
                    Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                };
                throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
            }
            finally
            {
                //  trans.Dispose();
            }
            // }
        }
        public NS_UserHardware[] ListUserHardware()
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    Registration.rh _objSpafoo = new Registration.rh();
                    var RegisterData = _objSpafoo.ListUserHardware();
                    return RegisterData;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        #endregion

        #region["Validate or Update Coupon"]
        public ServiceDashBoard.CouponInfo ValidateCoupon(string Code)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {

                    var ChargePrevious = WebCallMethod.WRequestobj(3, "ValidateCoupon", "{\"Code\": \"" + Code + "\"}");
                    var objChargePrevious = JsonConvert.DeserializeObject<ServiceDashBoard.CouponInfo>(ChargePrevious);
                    //ServiceDashBoard.rh _objSpafoo = new ServiceDashBoard.rh();
                    //return _objSpafoo.ValidateCoupon(Code);
                    return objChargePrevious;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public void UpdateCouponCount(string Code)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {

                    var ChargePrevious = WebCallMethod.WRequestobj(3, "UpdateCouponCount", "{\"Code\": \"" + Code + "\"}");

                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #endregion

      public string GetHTML(string ModID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {

                    var ChargePrevious = WebCallMethod.WRequestobj(2, "GetHTML", "{\"ModID\": \"" + ModID + "\"}");                   
                  //  var objChargePrevious = JsonConvert.DeserializeObject<string>(ChargePrevious);
                  
                    return ChargePrevious;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        #region["Forgot Password"]
        public string RequestVCode(string UserEmailID)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    //Registration.rh l = new Registration.rh();
                    //l.RequestVCode
                    var ChargePrevious = WebCallMethod.WRequestobj(5, "RequestVCode", "{\"UserEmailID\": \"" + UserEmailID + "\"}");
                    return ChargePrevious;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }

        public string VerifyCode(string UserEmailID, string Code)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    //Registration.rh l = new Registration.rh();
                    //l.VerifyCode
                    var ChargePrevious = WebCallMethod.WRequestobj(5, "VerifyCode", "{\"UserEmailID\": \"" + UserEmailID + "\",\"Code\": \"" + Code + "\"}");
                    return ChargePrevious;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }


        public string ChangePwd(ChangePassword obj)
        {
            using (TransactionScope trans = new TransactionScope())
            {
                try
                {
                    //Registration.rh l = new Registration.rh();
                    //l.ChangePwd
                    var ChargePrevious = WebCallMethod.WRequestobj(5, "ChangePwd", JsonConvert.SerializeObject(obj));
                    return ChargePrevious;
                }
                catch (Exception ex)
                {
                    trans.Dispose();
                    ReturnValues objex = new ReturnValues
                    {
                        Failure = ex.Message,
                        Source = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.AbsoluteUri,
                    };
                    throw new WebFaultException<ReturnValues>(objex, System.Net.HttpStatusCode.InternalServerError);
                }
                finally
                {
                    trans.Dispose();
                }
            }
        }
        #endregion





    }
}
