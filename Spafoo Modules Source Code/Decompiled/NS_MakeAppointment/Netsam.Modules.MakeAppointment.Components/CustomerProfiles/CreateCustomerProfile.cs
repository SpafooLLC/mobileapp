using System;
using System.Collections.Generic;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
    public class CreateCustomerProfile
    {
        public static createCustomerProfileResponse Run(string CCNumber, string Expiry, string CVV, string Email, string name, string adrs, string city, string state, string zip, string phone)
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType()
            {
                name            = APICredential.APILoginID,
                ItemElementName = ItemChoiceType.transactionKey,
                Item            = APICredential.TransactionKey,
            };


            var creditCard = new creditCardType
            {
                cardNumber = CCNumber,
                expirationDate = Expiry,
                cardCode = CVV
            };

            //var bankAccount = new bankAccountType
            //{
            //    accountNumber = "231323342",
            //    routingNumber = "000000224",
            //    accountType = bankAccountTypeEnum.checking,
            //    echeckType = echeckTypeEnum.WEB,
            //    nameOnAccount = "test",
            //    bankName = "Bank Of America"
            //};

            //standard api call to retrieve response
            paymentType cc = new paymentType { Item = creditCard };
            // paymentType echeck = new paymentType {Item = bankAccount};
            var billTo = new customerAddressType
            {
                firstName = name,
                address = adrs,
                city = city,
                state = state,
                zip = zip,
                phoneNumber = phone
            };

            List<customerPaymentProfileType> paymentProfileList = new List<customerPaymentProfileType>();
            customerPaymentProfileType ccPaymentProfile = new customerPaymentProfileType();
            ccPaymentProfile.payment = cc;
            ccPaymentProfile.billTo = billTo;
            ccPaymentProfile.customerType = customerTypeEnum.individual;
            //customerPaymentProfileType echeckPaymentProfile = new customerPaymentProfileType();
            //echeckPaymentProfile.payment = echeck;

            paymentProfileList.Add(ccPaymentProfile);
          //  paymentProfileList.Add(echeckPaymentProfile);

            //List<customerAddressType> addressInfoList = new List<customerAddressType>();
            //customerAddressType homeAddress = new customerAddressType();
            //homeAddress.address = "10900 NE 8th St";
            //homeAddress.city = "Seattle";
            //homeAddress.zip = "98006";


            //customerAddressType officeAddress = new customerAddressType();
            //officeAddress.address = "1200 148th AVE NE";
            //officeAddress.city = "NorthBend";
            //officeAddress.zip = "92101";

            //addressInfoList.Add(homeAddress);
            //addressInfoList.Add(officeAddress);


            customerProfileType customerProfile = new customerProfileType();
            customerProfile.merchantCustomerId = "";
            customerProfile.email = Email;
            customerProfile.paymentProfiles = paymentProfileList.ToArray();
           // customerProfile.shipToList = addressInfoList.ToArray();

            var request = new createCustomerProfileRequest{ profile = customerProfile, validationMode = validationModeEnum.none};

            var controller = new createCustomerProfileController(request);          // instantiate the contoller that will call the service
            controller.Execute();

            createCustomerProfileResponse response = controller.GetApiResponse();   // get the response from the service (errors contained if any)
           
            ////validate
            //if (response != null && response.messages.resultCode == messageTypeEnum.Ok)
            //{
            //    if (response != null && response.messages.message != null)
            //    {
            //        Console.WriteLine("Success, CustomerProfileID : " + response.customerProfileId);
            //        Console.WriteLine("Success, CustomerPaymentProfileID : " + response.customerPaymentProfileIdList[0]);
            //        Console.WriteLine("Success, CustomerShippingProfileID : " + response.customerShippingAddressIdList[0]);
            //    }
            //}
            //else if(response != null )
            //{
            //    Console.WriteLine("Error: " + response.messages.message[0].code + "  " + response.messages.message[0].text);
            //}

            return response;
        }
    }
}
