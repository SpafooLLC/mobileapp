﻿using System;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers.Bases;

namespace net.authorize.sample
{
    public class CapturePreviouslyAuthorizedAmount
    {
        /// <summary>
        /// Capture a Transaction Previously Submitted Via CaptureOnly
        /// </summary>
        /// <param name="ApiLoginID">Your ApiLoginID</param>
        /// <param name="ApiTransactionKey">Your ApiTransactionKey</param>
        /// <param name="TransactionAmount">The amount submitted with CaptureOnly</param>
        /// <param name="TransactionID">The TransactionID of the previous CaptureOnly operation</param>
        public static ANetApiResponse Run(decimal TransactionAmount, string TransactionID)
        {
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.SANDBOX;

            // define the merchant information (authentication / transaction id)
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType()
            {
                name = APICredential.APILoginID,
                ItemElementName = ItemChoiceType.transactionKey,
                Item = APICredential.TransactionKey
            };


            var transactionRequest = new transactionRequestType
            {
                transactionType = transactionTypeEnum.priorAuthCaptureTransaction.ToString(),    // capture prior only
                amount      = TransactionAmount,
                refTransId  = TransactionID
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
