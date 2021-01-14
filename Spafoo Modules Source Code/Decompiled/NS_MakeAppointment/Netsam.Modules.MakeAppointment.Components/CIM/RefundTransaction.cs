using System;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
    public class RefundTransaction
    {
        public static ANetApiResponse Run(string CCNumber,string Expiry, decimal TransactionAmount, string TransactionID)
        {
            System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;

            // define the merchant information (authentication / transaction id)
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType()
            {
                name = APICredential.APILoginID,
                ItemElementName = ItemChoiceType.transactionKey,
                Item = APICredential.TransactionKey
            };

            var creditCard = new creditCardType
            {
                cardNumber = CCNumber,
                expirationDate = Expiry
            };

            //standard api call to retrieve response
            var paymentType = new paymentType { Item = creditCard };

            var transactionRequest = new transactionRequestType
            {
                transactionType = transactionTypeEnum.refundTransaction.ToString(),    // refund type
                payment         = paymentType,
                amount          = TransactionAmount,
                refTransId      = TransactionID
            };

            var request = new createTransactionRequest { transactionRequest = transactionRequest };

            // instantiate the contoller that will call the service
            var controller = new createTransactionController(request);
            controller.Execute();

            // get the response from the service (errors contained if any)
            var response = controller.GetApiResponse();

            //validate
            //if (response != null && response.messages.resultCode == messageTypeEnum.Ok)
            //{
            //    if (response.transactionResponse != null)
            //    {
            //        Console.WriteLine("Success, Auth Code : " + response.transactionResponse.authCode);
            //    }
            //}
            //else if(response != null)
            //{
            //    Console.WriteLine("Error: " + response.messages.message[0].code + "  " + response.messages.message[0].text);
            //    if (response.transactionResponse != null)
            //    {
            //        Console.WriteLine("Transaction Error : " + response.transactionResponse.errors[0].errorCode + " " + response.transactionResponse.errors[0].errorText);
            //    }
            //}

            return response;
        }
    }
}
