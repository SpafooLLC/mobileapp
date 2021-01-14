using System;
using System.Collections.Generic;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
    public class DeleteCustomerPaymentProfile
    {
        public static ANetApiResponse Run( string customerProfileId,string customerPaymentProfileId)
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType()
            {
                name = APICredential.APILoginID,
                ItemElementName = ItemChoiceType.transactionKey,
                Item = APICredential.TransactionKey,
            };

            //please update the subscriptionId according to your sandbox credentials
            var request = new deleteCustomerPaymentProfileRequest
            {
                customerProfileId = customerProfileId,
                customerPaymentProfileId = customerPaymentProfileId
            };

            //Prepare Request
            var controller = new deleteCustomerPaymentProfileController(request);
            controller.Execute();

            //Send Request to EndPoint
            deleteCustomerPaymentProfileResponse response = controller.GetApiResponse();
            //if (response != null && response.messages.resultCode == messageTypeEnum.Ok)
            //{
            //    if (response != null && response.messages.message != null)
            //    {
            //        Console.WriteLine("Success, ResultCode : " + response.messages.resultCode.ToString());
            //    }
            //}
            //else if(response != null)
            //{
            //    Console.WriteLine("Error: " + response.messages.message[0].code + "  " + response.messages.message[0].text);
            //}

            return response;
        }
    }
}
