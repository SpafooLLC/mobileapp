using System;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using net.authorize.sample;
//using AuthorizeNet.Api.Controllers;
//using AuthorizeNet.Api.Contracts.V1;
//using AuthorizeNet.Api.Controllers.Bases;

namespace Netsam.XAuthorize
{
    public class XAuthorizeCustomerProfile
    {
        public static void Run(string customerProfileId,string customerPaymentProfileId,decimal AmountToCharge)
        {
            createTransactionRequestMerchantAuthentication oMerchant = new createTransactionRequestMerchantAuthentication()
            {
                name = APICredential.APILoginID,
                transactionKey = APICredential.TransactionKey
            };

         //   oRequest.merchantAuthentication oMerchant = new createTransactionRequestMerchantAuthentication();

        }
    }
}
