using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers.Bases;

namespace net.authorize.sample
{
    
    internal static class APICredential
    {
        /*
         * Sachin Login ID: 8Lpkp2ze2Q8a
         * Sachin Txn Key : 362xA2hKq7G5km25
         * Scret Key : Simon
         * User Login ID : sachinmcsd12
         * Password : 12#$qwER  
         * GOOGLE API KEY : AIzaSyD_-DPwlKoz4lL6R-JGPIjjfSrcHoBh_n8 [ for spafoo project name ]
         * pawan key : AIzaSyCWPsHgg9LxtW336S0grd6PjYHFdi_fycI
         * Matt Login ID: 2G2ThG44se (for spafoo only)
         * Matt Txn Key : 39fc4U3T4Y3ks2hM (for spafoo only)
         */
        public static string APILoginID
        {
            get
            {
                return "2G2ThG44se"; //"";Live Login ID: 2G2ThG44se -> My ID : 4ffrBT36La
            }
        }
        public static string TransactionKey
        {
            get
            {
                return "39fc4U3T4Y3ks2hM";//"";39fc4U3T4Y3ks2hM -> My Key: 2JC6bA988aq2s7Vk
            }
        }
    }
    public class ChargeCreditCard
    {
        public static ANetApiResponse Run(string CCNumber,string Expiry,string CardCode, decimal amount)
        {
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;

            // define the merchant information (authentication / transaction id)
            ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType()
            {
                name = APICredential.APILoginID,
                ItemElementName = ItemChoiceType.transactionKey,
                Item = APICredential.TransactionKey,
            };

            var creditCard = new creditCardType
            {
                cardNumber = CCNumber,
                expirationDate = Expiry,
                cardCode = CardCode
            };

            //var billingAddress = new customerAddressType
            //{
            //    firstName = "John",
            //    lastName = "Doe",
            //    address = "123 My St",
            //    city = "OurTown",
            //    zip = "98004"
            //};

            //standard api call to retrieve response
            var paymentType = new paymentType { Item = creditCard };

            // Add line Items
            //var lineItems = new lineItemType[2];
            //lineItems[0] = new lineItemType { itemId = "1", name = "t-shirt", quantity = 2, unitPrice = new Decimal(15.00) };
            //lineItems[1] = new lineItemType { itemId = "2", name = "snowboard", quantity = 1, unitPrice = new Decimal(450.00) };

            var transactionRequest = new transactionRequestType
            {
                transactionType = transactionTypeEnum.authCaptureTransaction.ToString(),    // charge the card

                amount = amount,
                payment = paymentType
               // billTo = billingAddress,
            //    lineItems = lineItems
            };
            
            var request = new createTransactionRequest { transactionRequest = transactionRequest };
            
            // instantiate the contoller that will call the service
            var controller = new createTransactionController(request);
            controller.Execute();
            
            // get the response from the service (errors contained if any)
            var response = controller.GetApiResponse();
            return response;
        }

    }
}
