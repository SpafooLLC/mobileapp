using DnnSharp.Common;
using DnnSharp.Common.Dnn;
using DnnSharp.Common.Json;
using avt.ActionForm.Core;
using DotNetNuke.Entities.Portals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace avt.ActionForm.RegCore
{
    public partial class Activate : System.Web.UI.Page
    {

        //protected const string ActivationUrl = "https://www.dnnsharp.com/api/license-activation";
        protected const string ActivationUrl = "https://www.dnnsharp.com/DesktopModules/RegCore/Api3/Activate.aspx";
        protected const string UnlockTrialUrl = "https://www.dnnsharp.com/DesktopModules/RegCore/Api3/UnlockTrial.aspx";
        protected const string GetLicenseTypeUrl = "https://www.dnnsharp.com/DesktopModules/RegCore/Api3/GetLicenseType.aspx";
        protected string SaveActivationUrl = App.Info.BaseUrl + "/AdminApi.ashx?Method=SaveActivation";
        protected string ReturnUrl { get { return Request.QueryString["returnurl"] ?? App.RootUrl; } }
        
        protected void Page_Load(object sender, EventArgs e)
        {
            // output hosts
            var portal = PortalControllerEx.GetCurrentPortal(HttpContext.Current);
            var hosts = new List<string>();
            foreach (PortalAliasInfo alias in new PortalAliasController().GetPortalAliasArrayByPortalID(portal.PortalId)) {
         
                var host = alias.HTTPAlias.ToLower();
                if (host.IndexOf('/') != -1)
                    host = host.Substring(0, host.IndexOf('/'));

                if (!hosts.Contains(host))
                    hosts.Add(host);
            }

            // try to get current alias selected
            Page.ClientScript.RegisterClientScriptBlock(GetType(), "init", "var hosts= "  + new JsonSerializer().Serialize(hosts, "*") + "; var currentAlias = '" + portal.PortalAlias.HTTPAlias 
                + "'; var isAdmin = " + UserControllerEx.GetCurrentUser(HttpContext.Current).IsInRole(portal.AdministratorRoleName).ToString().ToLower(), true);

            SaveActivationUrl += "&_alias=" + HttpUtility.UrlEncode(portal.PortalAlias.HTTPAlias);

        }

        /*
         * TODOs:
         * autofill key if downloaded from store
         * autofill user and pass if already logged in
         * move through DNN API
         */

    }
}
