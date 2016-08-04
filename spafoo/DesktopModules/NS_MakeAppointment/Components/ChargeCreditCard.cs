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
         * Login ID: 8Lpkp2ze2Q8a
         * Txn Key : 3r3wM45293L48Sys
         * Scret Key : Simon
         * User Login ID : sachinmcsd12
         * Password : !@34QWer  
         
         */
        public static string APILoginID
        {
            get
            {
                return "8Lpkp2ze2Q8a"; //"";2G2ThG44se -> My ID : 4ffrBT36La
            }
        }
        public static string TransactionKey
        {
            get
            {
                return "3r3wM45293L48Sys";//"";4Ye6RxY9gQ2Kd58F -> My Key: 2JC6bA988aq2s7Vk
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
