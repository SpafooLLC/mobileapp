using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DotNetNuke.Services.Scheduling;
using Netsam.Modules.MakeAppointment.Components;
namespace Netsam.Modules.NS_MakeAppointment
{
    public class Notif_Scheduler : SchedulerClient
    {
        public Notif_Scheduler(ScheduleHistoryItem oItem)
            : base()
        {
            this.ScheduleHistoryItem = oItem;
        }
        public override void DoWork()
        {
            try
            {
                //Perform required items for logging
                this.Progressing();
                List<AppointmentInfo> lstAppsIn2Hrs = new List<AppointmentInfo>();
                List<AppointmentInfo> lstAppsIn24Hrs = new List<AppointmentInfo>();
                NotificationController oCtrl = new NotificationController();
                lstAppsIn2Hrs = oCtrl.GetOrdersWithIn(2);
                lstAppsIn2Hrs = oCtrl.GetOrdersWithIn(24);
                foreach (AppointmentInfo oApp in lstAppsIn24Hrs)
                {
                   
                    oCtrl.AddNotification(oApp.ClientID, oApp.ProviderID, 4, 0, oApp.AppointmentID);
                    oCtrl.UpdateNotificationStatus(oApp.AppointmentID);
                }
                foreach (AppointmentInfo oApp in lstAppsIn2Hrs)
                {
                    oCtrl.AddNotification(oApp.ClientID, oApp.ProviderID, 6, 0, oApp.AppointmentID);
                    oCtrl.UpdateNotificationStatus(oApp.AppointmentID);
                }
                

                //Your code goes here
                //To log note
                this.ScheduleHistoryItem.AddLogNote(lstAppsIn24Hrs.Count.ToString() + " Appointment(s) processed for 24hrs Notification.<br/>" + lstAppsIn2Hrs.Count.ToString() + " Appointment(s) processed for 2hrs notification");

                //Show success
                this.ScheduleHistoryItem.Succeeded = true;
            }
            catch (Exception ex)
            {
                this.ScheduleHistoryItem.Succeeded = false;
                this.ScheduleHistoryItem.AddLogNote("Appointment Exception = " + ex.ToString());
                this.Errored(ref ex);
                DotNetNuke.Services.Exceptions.Exceptions.LogException(ex);
            }
        }
    }
}
