using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
	public class ChargeCustomerProfile
	{
		public static ANetApiResponse Run(string customerProfileId, string customerPaymentProfileId, decimal AmountToCharge)
		{
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = APICredential.APILoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = APICredential.TransactionKey
			};
			customerProfilePaymentType customerProfilePaymentType = new customerProfilePaymentType();
			customerProfilePaymentType.customerProfileId = customerProfileId;
			customerProfilePaymentType.paymentProfile = new paymentProfile
			{
				paymentProfileId = customerPaymentProfileId
			};
			transactionRequestType transactionRequest = new transactionRequestType
			{
				transactionType = 1.ToString(),
				amount = AmountToCharge,
				profile = customerProfilePaymentType
			};
			createTransactionRequest apiRequest = new createTransactionRequest
			{
				transactionRequest = transactionRequest
			};
			createTransactionController createTransactionController = new createTransactionController(apiRequest);
			createTransactionController.Execute(null);
			return createTransactionController.GetApiResponse();
		}
	}
}
