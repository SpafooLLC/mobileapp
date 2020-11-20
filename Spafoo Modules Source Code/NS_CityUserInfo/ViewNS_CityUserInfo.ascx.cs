using DotNetNuke.Entities.Modules;
using DotNetNuke.Entities.Modules.Actions;
using DotNetNuke.Entities.Users;
using DotNetNuke.Security;
using DotNetNuke.Security.Roles;
using DotNetNuke.Services.Exceptions;
using DotNetNuke.Services.Localization;
using System;
using System.Collections;
using System.IO;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace NS.Modules.NS_CityUserInfo
{
	public partial class ViewNS_CityUserInfo : PortalModuleBase//, IActionable
	{
		private string _UserSecurityRole = "";
		public string ConfirmationNotice
		{
			get
			{
				string result = "";
				ModuleController moduleController = new ModuleController();
				Hashtable moduleSettings = moduleController.GetModuleSettings(base.ModuleId);
				if (moduleSettings["NS_City_ConfirmationNotice"] != null)
				{
					result = moduleSettings["NS_City_ConfirmationNotice"].ToString();
				}
				return result;
			}
		}
		//public ModuleActionCollection ModuleActions
		//{
		//	get
		//	{
		//		return new ModuleActionCollection
		//		{

		//			{
		//				base.GetNextActionID(),
		//				Localization.GetString("AddContent.Action", base.LocalResourceFile),
		//				"AddContent.Action",
		//				"",
		//				"add.gif",
		//				base.EditUrl(),
		//				false,
		//				SecurityAccessLevel.Edit,
		//				true,
		//				false
		//			}
		//		};
		//	}
		//}
		protected void Page_Load(object sender, EventArgs e)
		{
			try
			{
				this.NS_City_SuperPanel.Visible = base.IsEditable;
				if (!base.IsPostBack)
				{
					ModuleController moduleController = new ModuleController();
					Hashtable moduleSettings = moduleController.GetModuleSettings(base.ModuleId);
					if (moduleSettings != null)
					{
						if (moduleSettings["NS_City_SubmitEmail"] != null)
						{
							this.txtSubmitFormEmail.Text = moduleSettings["NS_City_SubmitEmail"].ToString();
						}
						if (moduleSettings["NS_City_Intro"] != null)
						{
							this.NS_City_lblIntro.Text = (this.txtIntroduction.Text = moduleSettings["NS_City_Intro"].ToString());
						}
						if (moduleSettings["NS_City_ConfirmationNotice"] != null)
						{
							this.NS_City_ShowConfirmationMessage.Text = (this.txtConfirmationNotice.Text = moduleSettings["NS_City_ConfirmationNotice"].ToString());
						}
						if (moduleSettings["NS_City_PIDescription"] != null)
						{
							this.lblPIDescription.Text = (this.NS_City_PIDescription.Text = moduleSettings["NS_City_PIDescription"].ToString());
						}
						if (moduleSettings["NS_City_SBDescription"] != null)
						{
							this.lblSBDescription.Text = (this.NS_City_SBDescription.Text = moduleSettings["NS_City_SBDescription"].ToString());
						}
						if (moduleSettings["NS_City_SODescription"] != null)
						{
							this.lblSODescription.Text = (this.NS_City_SODescription.Text = moduleSettings["NS_City_SODescription"].ToString());
						}
						if (moduleSettings["NS_City_RDDescription"] != null)
						{
							this.lblRDDescription.Text = (this.NS_City_RDDescription.Text = moduleSettings["NS_City_RDDescription"].ToString());
						}
						if (moduleSettings["NS_City_AdminEmailContent"] != null)
						{
							this.NS_City_AdminEmail.Text = moduleSettings["NS_City_AdminEmailContent"].ToString();
						}
						RoleController roleController = new RoleController();
						this.ddlUserRole.DataSource = roleController.GetPortalRoles(base.PortalId);
						this.ddlUserRole.DataTextField = "RoleName";
						this.ddlUserRole.DataValueField = "RoleID";
						this.ddlUserRole.DataBind();
						if (moduleSettings["NS_City_CSRRole"] != null)
						{
							try
							{
								this.ddlUserRole.ClearSelection();
								this.ddlUserRole.Items.FindByText(moduleSettings["NS_City_CSRRole"].ToString()).Selected = true;
								this._UserSecurityRole = moduleSettings["NS_City_CSRRole"].ToString();
							}
							catch (Exception ex)
							{
							}
						}
					}
					if (this._UserSecurityRole != "")
					{
						if (UserController.GetCurrentUserInfo().IsInRole(this._UserSecurityRole))
						{
							this.pnlManageApplication.Visible = true;
							this.pnlMainUserView.Visible = false;
							this.BindFormGrid();
						}
						else
						{
							this.pnlMainUserView.Visible = true;
							this.pnlManageApplication.Visible = false;
						}
					}
				}
			}
			catch (Exception exc)
			{
				Exceptions.ProcessModuleLoadException(this, exc);
			}
			this.RegisterScript();
		}
		protected string StateText(string val)
		{
			string result;
			if (val.ToLower() == "s")
			{
				result = "State ID";
			}
			else
			{
				result = "Driver's License";
			}
			return result;
		}
		protected string BoolText(string val)
		{
			string result;
			if (val.ToLower() == "true")
			{
				result = "Yes";
			}
			else
			{
				result = "No";
			}
			return result;
		}
		protected string GetUrl(string val)
		{
			string result;
			if (val != "")
			{
				result = "http://" + base.Request.Url.Host + "/DesktopModules/NS_CityUserInfo/UserUploads/" + val;
			}
			else
			{
				result = "";
			}
			return result;
		}
		protected string CheckDisplay(string val)
		{
			string result;
			if (val.ToLower() == "true")
			{
				result = "block";
			}
			else
			{
				result = "none";
			}
			return result;
		}
		private void BindFormGrid()
		{
			NS_CityUserInfoController nS_CityUserInfoController = new NS_CityUserInfoController();
			this.gvApplications.DataSource = nS_CityUserInfoController.GetUsersForm(1, 10);
			this.gvApplications.DataBind();
		}
		private void RegisterScript()
		{
			ClientScriptManager clientScript = this.Page.ClientScript;
			if (!clientScript.IsClientScriptIncludeRegistered("jquery.Uploadify"))
			{
				this.Page.ClientScript.RegisterClientScriptInclude("jquery.Uploadify", "/DesktopModules/NS_CityUserInfo/Scripts/Uplodify/jquery.uploadify-3.1.min.js");
			}
		}
		protected void btnSaveSettings_Click(object sender, EventArgs e)
		{
			ModuleController moduleController = new ModuleController();
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_SubmitEmail", this.txtSubmitFormEmail.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_Intro", this.txtIntroduction.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_ConfirmationNotice", this.txtConfirmationNotice.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_PIDescription", this.NS_City_PIDescription.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_SBDescription", this.NS_City_SBDescription.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_SODescription", this.NS_City_SODescription.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_RDDescription", this.NS_City_RDDescription.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_AdminEmailContent", this.NS_City_AdminEmail.Text.Trim());
			moduleController.UpdateModuleSetting(base.ModuleId, "NS_City_CSRRole", this.ddlUserRole.SelectedItem.Text);
			this.NS_City_lblIntro.Text = this.txtIntroduction.Text.Trim();
			this.lblSODescription.Text = this.NS_City_SODescription.Text.Trim();
			this.lblSBDescription.Text = this.NS_City_SBDescription.Text.Trim();
			this.lblPIDescription.Text = this.NS_City_PIDescription.Text.Trim();
			this.lblRDDescription.Text = this.NS_City_RDDescription.Text.Trim();
		}
		protected void gvApplications_RowCommand(object sender, GridViewCommandEventArgs e)
		{
			if (e.CommandName.ToLower() == "remove")
			{
				int formID = int.Parse(e.CommandArgument.ToString());
				NS_CityUserInfoController nS_CityUserInfoController = new NS_CityUserInfoController();
				nS_CityUserInfoController.DeleteUserForm(formID);
				this.BindFormGrid();
			}
		}

        //protected void btnNS_City_SSNDocument_Click(object sender, EventArgs e)
        //{
        //    string str = DateTime.Now.ToString("ddMMyyhhmmss") + "_";
        //    //HttpPostedFile httpPostedFile = context.Request.Files["Filedata"];
        //    string text = "/DesktopModules/NS_CityUserInfo/UserUploads";
        //    text = Server.MapPath(text);
        //    string text2 = str + NS_City_SSNDocument.PostedFile.FileName;
        //    if (!Directory.Exists(text))
        //    {
        //        Directory.CreateDirectory(text);
        //    }
        //    NS_City_SSNDocument.PostedFile.SaveAs(text + "\\" + text2);
        // //   lblNS_City_SSNDocument.Text = text2;
        //    //context.Response.Write(text2);
        //    //context.Response.StatusCode = 200;
        //}

       

        protected void btnNS_City_StateIDDocument_Click(object sender, EventArgs e)
        {
            string str = DateTime.Now.ToString("ddMMyyhhmmss") + "_";
            //HttpPostedFile httpPostedFile = context.Request.Files["Filedata"];
            string text = "/DesktopModules/NS_CityUserInfo/UserUploads";
            text = Server.MapPath(text);
            string text2 = str + NS_City_StateIDDocument.PostedFile.FileName;
            if (!Directory.Exists(text))
            {
                Directory.CreateDirectory(text);
            }
            NS_City_StateIDDocument.PostedFile.SaveAs(text + "\\" + text2);
         //   lblNS_City_StateIDDocument.Text = text2;
        }

     

        protected void btnNS_City_POADocument_Click(object sender, EventArgs e)
        {
            string str = DateTime.Now.ToString("ddMMyyhhmmss") + "_";
            //HttpPostedFile httpPostedFile = context.Request.Files["Filedata"];
            string text = "/DesktopModules/NS_CityUserInfo/UserUploads";
            text = Server.MapPath(text);
            string text2 = str + NS_City_POADocument.PostedFile.FileName;
            if (!Directory.Exists(text))
            {
                Directory.CreateDirectory(text);
            }
            NS_City_POADocument.PostedFile.SaveAs(text + "\\" + text2);
           // lblNS_City_POADocument.Text = text2;
        }

        //protected void btnNS_City_LicenseDocument_Click(object sender, EventArgs e)
        //{
        //    string str = DateTime.Now.ToString("ddMMyyhhmmss") + "_";
        //    //HttpPostedFile httpPostedFile = context.Request.Files["Filedata"];
        //    string text = "/DesktopModules/NS_CityUserInfo/UserUploads";
        //    text = Server.MapPath(text);
        //    string text2 = str + NS_City_LicenseDocument.PostedFile.FileName;
        //    if (!Directory.Exists(text))
        //    {
        //        Directory.CreateDirectory(text);
        //    }
        //    NS_City_LicenseDocument.PostedFile.SaveAs(text + "\\" + text2);
        // //   lblNS_City_LicenseDocument.Text = text2;
        //}
    }
}
