module ServicesController {
    
    class ServicesController {
        ServiceData: {};
        pdata: number = 0;
        PreviousID: string;
        static $inject = ['$q', '$state', '$ionicPopup', '$ionicLoading', '$scope', '$location', 'CustomerHttp', '$window', 'toaster'];
      constructor(
            private $q: ng.IQService,
            private $state: angular.ui.IStateService,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private CustomerHttp: spafoo.httpservice.ICustomerScreenHttp,
            private $window: ng.IWindowService,
            private toaster: ngtoaster.IToasterService)
        {
          this.getServiceList(-1);
        // this.PreviousID = "-1";
        }
        
      getServiceList(ParentServiceID: any) {           
          var self = this;         
          //alert(ParentServiceID);
          self.CustomerHttp.get('/GetServiceList/' + ParentServiceID).then(function (response: any) {            
              self.ServiceData = response.GetServiceListResult;
             // alert(JSON.stringify(response.GetServiceListResult));
              if (response.GetServiceListResult.length === 0)
              {
                 // alert("getServiceList : " + self.pdata + " " + self.PreviousID);
                  self.$window.localStorage.setItem('ServiceIDs', self.PreviousID);
                  self.$state.go("ProviderList");
              }
              self.PreviousID = response.GetServiceListResult[0].parentIDField;          
              self.pdata = response.GetServiceListResult[0].parentIDField;
              self.$ionicLoading.hide();             
          }, function (error) {
              if (error === null) {
                  self.$ionicLoading.hide();
              } else {
                  console.log(error);
                  self.$ionicLoading.hide();
              }
              });
          self.PreviousID = ParentServiceID;  
      }


 getParentData(ParentServiceID: any) {           
          var self = this;         
        //  alert("getParentData : " + self.pdata);
          self.CustomerHttp.get('/GetSpecificServiceRecord/' + self.pdata).then(function (response: any) {       
                           //   alert(JSON.stringify(response.GetSpecificServiceRecordResult[0].parentIDField));
              self.getServiceList(response.GetSpecificServiceRecordResult[0].parentIDField);
              self.$ionicLoading.hide();
          }, function (error) {
              if (error === null) {
                  self.$ionicLoading.hide();
              } else {
                  console.log(error);
                  self.$ionicLoading.hide();
              }
              });
          self.PreviousID = ParentServiceID;  
      }

    }


    angular.module('spafoo.ctrl.Services',[]).controller('Services',ServicesController);

}