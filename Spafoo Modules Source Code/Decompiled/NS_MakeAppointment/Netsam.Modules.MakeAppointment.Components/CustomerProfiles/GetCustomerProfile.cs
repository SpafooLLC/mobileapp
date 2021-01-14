using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
    public class GetCustomerProfile
    {
        public static ANetApiResponse Run(string customerProfileId)
        {
            // Console.WriteLine("Get Customer Profile sample");
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
            // define the merchant information (authentication / transaction id)
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType()
            {
                name = APICredential.APILoginID,
                ItemElementName = ItemChoiceType.transactionKey,
                Item = APICredential.TransactionKey,
            };

            var request = new getCustomerProfileRequest();
            request.customerProfileId = customerProfileId;

            // instantiate the controller that will call the service
            var controller = new getCustomerProfileController(request);
            controller.Execute();

            // get the response from the service (errors contained if any)
            var response = controller.GetApiResponse();

            //if (response != null && response.messages.resultCode == messageTypeEnum.Ok)
            //{
            //    Console.WriteLine(response.messages.message[0].text);
            //    Console.WriteLine("Customer Profile Id: " + response.profile.customerProfileId);

            //    if (response.subscriptionIds != null && response.subscriptionIds.Length > 0)
            //    {
            //        Console.WriteLine("List of subscriptions : ");
            //        for (int i = 0; i < response.subscriptionIds.Length; i++)
            //            Console.WriteLine(response.subscriptionIds[i]);
            //    }

            //}
            //else if(response != null)
            //{
            //    Console.WriteLine("Error: " + response.messages.message[0].code + "  " +
            //                      response.messages.message[0].text);
            //}

            return response;
        }
    }
}
