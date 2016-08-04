/*
' Copyright (c) 2016 Christoc.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System.Collections.Generic;
//using System.Xml;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;
using System;

namespace Netsam.Modules.ServiceDashBoard.Components
{

    /// -----------------------------------------------------------------------------
    /// <summary>
    /// The Controller class for ServiceInfo
    /// 
    /// The FeatureController class is defined as the BusinessController in the manifest file (.dnn)
    /// DotNetNuke will poll this class to find out which Interfaces the class implements. 
    /// 
    /// The IPortable interface is used to import/export content from a DNN module
    /// 
    /// The ISearchable interface is used by DNN to index the content of a module
    /// 
    /// The IUpgradeable interface allows module developers to execute code during the upgrade 
    /// process for a module.
    /// 
    /// Below you will find stubbed out implementations of each, uncomment and populate with your own data
    /// </summary>
    /// -----------------------------------------------------------------------------

    //uncomment the interfaces to add the support.
    public class ServiceInfo
    {
        #region public properties
        /// <summary>
        /// (Auto)
        /// </summary>
        public int ServiceID { get; set; }
        public string ServiceName { get; set; }
        public string ShortDescription { get; set; }
        public string Image { get; set; }
        public int ParentID { get; set; }

        public decimal Price { get; set; }
        public decimal Tax { get; set; }

        public int ServiceTypeID { get; set; }
        
        public List<ServiceInfo> Children
        {
            get
            {
                ServiceController oCtrl = new ServiceController();
                return oCtrl.GetServicesIn(this.ServiceID);
            }
        }

        #endregion
    }

    public class Appointment
    {
        #region public properties
       
        /// <summary>
        /// (Auto)
        /// </summary>
        public int AppointmentID { get; set; }

        /// <summary>
        /// DNN UserID of Client
        /// </summary>
        public int ClientID { get; set; }
        public int ServiceID { get; set; }
        public DateTime ForDate { get; set; }
        public DateTime AtTime { get; set; }

        /// <summary>
        /// 0 - Pending, 1 - Completed
        /// </summary>
        public int Status { get; set; }
        
        /// <summary>
        /// 0 - Pending, 1 - Saw
        /// </summary>
        public int SeenStatus { get; set; }

        /// <summary>
        /// DNN UserID of Provider
        /// </summary>
        public int ProviderID { get; set; }

        public decimal Price { get; set; }
        public decimal Tax { get; set; }

        #endregion
    }

    public class jqTreeData
    {
        public string label { get; set; }
        public int id { get; set; }
        public bool load_on_demand { get; set; }
    }
}
