﻿module ScheduleDetailController {
  class ScheduleDetailController {
    AppointmentID: number;
    ServiceData: any;
    authTxnIDField: any;
    amountField: any;
    messages: any;
    static $inject = [
      "$q",
      "$state",
      "$scope",
      "$location",
      "CustomerHttp",
      "$window",
      "SharedHttp",
    ];
    constructor(
      private $q: ng.IQService,
      private $state: angular.ui.IStateService,
      private $scope: ng.IScope,
      private $location: ng.ILocationService,
      private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
      private $window: ng.IWindowService,
      private SharedHttp: spafoo.httpsharedservice.ISharedHttp
    ) {
      this.AppointmentID = this.$window.localStorage.getItem("AppointmentIDs");
      this.getScheduleDetail(this.AppointmentID);
    }

    getScheduleDetail(AppointmentID: any) {
      var self = this;
      self.CustomerHttp.get("/GetAppointment/" + AppointmentID).then(
        function (response: any) {
          console.log("response", response.GetAppointmentResult);
          self.ServiceData = response.GetAppointmentResult;

          var orderdt = self.SharedHttp.getFormatedDate(
            self.ServiceData.forDateField,
            "weekday dd MMMM yyyy"
          );
          self.ServiceData.orderDateField = orderdt;
          self.ServiceData.atTimeField = self.SharedHttp.getFormatedTime(
            self.ServiceData.atTimeField
          );
          self.ServiceData.DayField = orderdt.split(" ")[1];
          self.ServiceData.MonthField = orderdt.split(" ")[2];
          self.amountField = self.ServiceData.amountField;
          self.authTxnIDField = self.ServiceData.authTxnIDField;
          self.SharedHttp.GetAddressInfo(
            self.ServiceData.appointmentIDField
          ).then(function (e: any) {
            self.ServiceData.addressField = self.SharedHttp.getAddressDetailRcd();
          });
          var serviceName = "";
          $.each(self.ServiceData.servicesField, function (ig, sitem) {
            //   serviceName += sitem.serviceNameField + ",";
            if (parseInt(sitem.qtyField) > 1) {
              serviceName +=
                sitem.serviceNameField + "(" + sitem.qtyField + "),";
            } else {
              serviceName += sitem.serviceNameField + ",";
            }
          });
          self.ServiceData.ServiceList = serviceName.substr(
            0,
            serviceName.lastIndexOf(",")
          );
          self.SharedHttp.GetUserInfo(self.ServiceData.providerIDField).then(
            function (res: any) {
              console.log("response from getUSerIbfo", res);
              debugger;
              var temp = res.profileField.cellField;
            //   self.ServiceData.cellField = res.profileField.cellField;
              self.ServiceData.cellField =
                temp[0] +
                temp[1] +
                temp[2] +
                "-" +
                temp[3] +
                temp[4] +
                temp[5] +
                "-" +
                temp[6] +
                temp[7] +
                temp[8] +
                temp[9];

              self.ServiceData.displayNameField =
                res.firstNameField + " " + res.lastNameField[0] + ".";
              self.SharedHttp.getProfilePics(res.profileField.photoField).then(
                function (imgres) {
                  self.ServiceData.profilePic = imgres;
                }
              );
            }
          );
        },
        function (error) {}
      );
    }

    CancelSchdule() {
      var confirmations = confirm("Are you sure want to cancel ? ");
      if (confirmations) {
        var self = this;
        var PostData = {
          AID: this.AppointmentID,
          TxnID: this.authTxnIDField,
          Amount: this.amountField,
        };
        //  alert(JSON.stringify(PostData));
        self.CustomerHttp.post(PostData, "/RefundCard").then(
          function (response: any) {
            self.messages = JSON.parse(response).messages.message[0].text;
            $("#PDone").modal();
          },
          function (error) {
            //alert(error)
          }
        );
      }
    }

    dismissAndThen() {
      // return false;
      this.$state.go("MySchedule");
    }
  }

  angular
    .module("spafoo.ctrl.ScheduleDetail", [])
    .controller("ScheduleDetail", ScheduleDetailController);
}
