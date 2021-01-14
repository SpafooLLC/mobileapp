using DotNetNuke.Common.Utilities;
using DotNetNuke.ComponentModel;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using DotNetNuke.Framework;
using DotNetNuke.Security.Roles;
using DotNetNuke.Services.Mail;
using Netsam.Modules.MakeAppointment.Data;
using Netsam.Modules.NS_Registration.Components;
using DotNetNuke.Entities.Controllers;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class NotificationController
	{
        private string SendMail2User(UserInfo user, string Body)
        {
            var portalSettings = PortalController.Instance.GetCurrentPortalSettings();
            string _HostEmail = HostController.Instance.GetString("HostEmail").ToLower();
            DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail, user.Email, "Appointment Requested", Body);
            //DotNetNuke.Services.Mail.Mail.SendEmail(_HostEmail, "sachinmcsd@gmail.com", "Appointment Requested", Body);
            return "";
        }

        public int AddNotification(int ByID, int ToID, int NotTypeID, int Privacy, int RelatedEntityID)
		{
			//IL_000b: Unknown result type (might be due to invalid IL or missing references)
			//IL_0010: Unknown result type (might be due to invalid IL or missing references)
			//IL_0011: Unknown result type (might be due to invalid IL or missing references)
			//IL_0032: Unknown result type (might be due to invalid IL or missing references)
			//IL_0037: Unknown result type (might be due to invalid IL or missing references)
			//IL_003c: Unknown result type (might be due to invalid IL or missing references)
			//IL_003f: Invalid comparison between Unknown and O
			//IL_004d: Unknown result type (might be due to invalid IL or missing references)
			//IL_0060: Unknown result type (might be due to invalid IL or missing references)
			//IL_00ae: Unknown result type (might be due to invalid IL or missing references)
			//IL_00c0: Unknown result type (might be due to invalid IL or missing references)
			//IL_0106: Unknown result type (might be due to invalid IL or missing references)
			//IL_010b: Unknown result type (might be due to invalid IL or missing references)
			//IL_0112: Unknown result type (might be due to invalid IL or missing references)
			//IL_0136: Unknown result type (might be due to invalid IL or missing references)
			int num = -99;
			try
			{
				NotificationService notificationService = new NotificationService();
				UserHardwareController val = new UserHardwareController();
				List<NS_UserHardware> userHardware = val.GetUserHardware(ToID);
				num = 1;
				string text = "";
				foreach (NS_UserHardware item in userHardware)
				{
					num = 2;
					if ((object)item != null)
					{
						num = 3;
						if (!item.IsWebVersion)
						{
							num = 4;
							if (item.DeviceToken.Trim() != "")
							{
								num = 5;
								text = "";
								text = this.GetUserMessage(NotTypeID, RelatedEntityID);
								num = 6;
								if (text.Trim() != "")
								{
									num = 7;
									num = notificationService.SendAndroidNotification(item.DeviceToken, text);
									num = 8;
									notificationService.SendToiOS(item.DeviceToken, text);
								}
							}
						}
					}
				}
				if (NotTypeID == 10 || NotTypeID == 4)
				{
					UserInfo userById = UserController.GetUserById(0, ToID);
					text = "Hi " + userById.FirstName + ",<br/><br/>" + text;
					text += "<br /><br />Thank you,<br /><img src='https://www.spafoo.com/images/Spafoo-Email-Logo.png'>";
					this.SendMail2User(userById, text);
				}
			}
			catch (Exception e)
			{
				StackTrace stackTrace = new StackTrace(e, true);
				StackFrame frame = stackTrace.GetFrame(0);
				return frame.GetFileLineNumber();
			}
			DataProvider.Instance().AddNotification(ByID, ToID, NotTypeID, Privacy, RelatedEntityID);
			return num;
		}

		private string GetUserMessage(int NotificationTypeID, int RelatedEntityID)
		{
			//IL_0016: Unknown result type (might be due to invalid IL or missing references)
			//IL_001b: Unknown result type (might be due to invalid IL or missing references)
			string result = "1";
			try
			{
				AppointmentController appointmentController = new AppointmentController();
				AppointmentInfo appointment = appointmentController.GetAppointment(RelatedEntityID);
				UserController val = new UserController();
				if (appointment != null)
				{
					string text = appointment.ClientInfo.FirstName + " " + appointment.ClientInfo.LastName.Substring(0, 1) + ".";
					string text2 = "";
					if (appointment.ProviderID != -1)
					{
						text2 = appointment.ProviderInfo.FirstName + " " + appointment.ProviderInfo.LastName.Substring(0, 1) + ".";
					}
					result = "2";
					if (NotificationTypeID == 4)
					{
						result = text + " has requested an appointment! Please login and go to My Appointments to respond.";
					}
					if (NotificationTypeID == 5)
					{
						result = "You have appointment with " + text + " on " + appointment.ForDate + " at " + appointment.AtTime;
					}
					if (NotificationTypeID == 6)
					{
						result = "You have appointment with " + text + " on " + appointment.ForDate + " at " + appointment.AtTime;
					}
					if (NotificationTypeID == 7)
					{
						result = text2 + " has arrived for your appointment!";
					}
					if (NotificationTypeID == 8)
					{
						result = "Thank you for choosing SpaFoo!";
					}
					if (NotificationTypeID == 9)
					{
						result = text + " has cancelled the appointment";
					}
					if (NotificationTypeID == 10)
					{
						result = text + " has requested an ASAP appointment with you! Please login and go to My Appointments to respond.";
					}
					if (NotificationTypeID == 11)
					{
						result = text2 + " has accepted your ASAP appointment. Please review the time set for your appointment and accept or deny it to finalize.";
					}
					if (NotificationTypeID == 12)
					{
						result = text + " has accepted the time of your ASAP appointment.";
					}
					if (NotificationTypeID == 13)
					{
						result = text + " did NOT accept the time of your ASAP appointment.";
					}
					if (NotificationTypeID == 14)
					{
						result = "";
					}
					if (NotificationTypeID == 15)
					{
						result = "Your appointment has been accepted by " + text2 + ". For more information, please check 'My Schedule' section.";
					}
					if (NotificationTypeID == 16)
					{
						result = "Your ASAP appointment has been requested with " + text2;
					}
					if (NotificationTypeID == 18)
					{
						result = "Your appointment is not accepted by " + text2;
					}
					if (NotificationTypeID == 19)
					{
						result = "Your ASAP request is not accepted by " + text2;
					}
				}
			}
			catch (Exception ex)
			{
				result = ex.StackTrace.ToString();
			}
			return result;
		}

		public void RemoveNotification(int ID)
		{
			DataProvider.Instance().RemoveNotification(ID);
		}

		public void RemoveNotificationByUser(int UID)
		{
			DataProvider.Instance().RemoveNotificationByUser(UID);
		}

		public List<NotificationInfo> GetMyNotifications(int MyUserID)
		{
			return CBO.FillCollection<NotificationInfo>(DataProvider.Instance().GetMyNotifications(MyUserID));
		}

		public List<NotificationInfo> GetAdminNotification(int Page, int RecsPerPage)
		{
			return CBO.FillCollection<NotificationInfo>(DataProvider.Instance().GetAdminNotifications(Page, RecsPerPage));
		}

		public List<AppointmentInfo> GetOrdersWithIn(int Hrs)
		{
			return CBO.FillCollection<AppointmentInfo>(DataProvider.Instance().GetOrderWithIn(Hrs));
		}

		public void UpdateNotificationStatus(int AppID)
		{
			DataProvider.Instance().UpdateNotificationStatus(AppID);
		}

		public string SendNotification(int UserID, int RoleID, string Message)
		{
			//IL_004f: Unknown result type (might be due to invalid IL or missing references)
			//IL_0054: Unknown result type (might be due to invalid IL or missing references)
			//IL_0056: Unknown result type (might be due to invalid IL or missing references)
			//IL_005a: Unknown result type (might be due to invalid IL or missing references)
			//IL_005f: Unknown result type (might be due to invalid IL or missing references)
			//IL_0061: Unknown result type (might be due to invalid IL or missing references)
			//IL_0064: Invalid comparison between Unknown and O
			//IL_0070: Unknown result type (might be due to invalid IL or missing references)
			//IL_0073: Unknown result type (might be due to invalid IL or missing references)
			//IL_0094: Unknown result type (might be due to invalid IL or missing references)
			//IL_0099: Unknown result type (might be due to invalid IL or missing references)
			//IL_009c: Unknown result type (might be due to invalid IL or missing references)
			//IL_009f: Invalid comparison between Unknown and O
			//IL_00a9: Unknown result type (might be due to invalid IL or missing references)
			string result = "0";
			try
			{
				if (UserID != -1)
				{
					result = this.SendNotificationToUser(UserID, Message);
					result = ((!(result == "0")) ? "Message send successfully" : "Device not found, cannot send message");
				}
				if (RoleID != -1)
				{
					RoleController val = new RoleController();
					RoleInfo roleById = val.GetRoleById(0, RoleID);
					if ((object)roleById != null)
					{
						List<UserInfo> list = new List<UserInfo>(val.GetUsersByRole(0, roleById.RoleName));
						foreach (UserInfo item in list)
						{
							if ((object)item != null)
							{
								result = this.SendNotificationToUser(item.UserID, Message);
							}
						}
						result = ((list.Count <= 0) ? "User(s) not found in this role, cannot send message." : "Message send successfully.");
					}
				}
			}
			catch (Exception e)
			{
				StackTrace stackTrace = new StackTrace(e, true);
				StackFrame frame = stackTrace.GetFrame(0);
				return frame.GetFileLineNumber().ToString();
			}
			return result;
		}

		private string SendNotificationToUser(int UserID, string Message)
		{
			//IL_000d: Unknown result type (might be due to invalid IL or missing references)
			//IL_0012: Unknown result type (might be due to invalid IL or missing references)
			//IL_0022: Unknown result type (might be due to invalid IL or missing references)
			//IL_003c: Unknown result type (might be due to invalid IL or missing references)
			//IL_0041: Unknown result type (might be due to invalid IL or missing references)
			//IL_0044: Unknown result type (might be due to invalid IL or missing references)
			//IL_0047: Invalid comparison between Unknown and O
			//IL_0050: Unknown result type (might be due to invalid IL or missing references)
			//IL_0061: Unknown result type (might be due to invalid IL or missing references)
			//IL_0096: Unknown result type (might be due to invalid IL or missing references)
			//IL_00a5: Unknown result type (might be due to invalid IL or missing references)
			string result = "0";
			NotificationService notificationService = new NotificationService();
			UserHardwareController val = new UserHardwareController();
			if (UserID != -1)
			{
				List<NS_UserHardware> userHardware = val.GetUserHardware(UserID);
				foreach (NS_UserHardware item in userHardware)
				{
					if ((object)item != null && !item.IsWebVersion && item.DeviceToken.Trim() != "" && Message.Trim() != "")
					{
						notificationService.SendAndroidNotification(item.DeviceToken, Message);
						notificationService.SendToiOS(item.DeviceToken, Message);
						result = "1";
					}
				}
			}
			return result;
		}
	}
}
