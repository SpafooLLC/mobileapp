using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
	public class AuthorizeCreditCard
	{
		public static ANetApiResponse Run(string CCNumber, string Expiry, string CardCode, decimal amount)
		{
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = APICredential.APILoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = APICredential.TransactionKey
			};
			creditCardType item = new creditCardType
			{
				cardNumber = CCNumber,
				expirationDate = Expiry,
				cardCode = CardCode
			};
			paymentType payment = new paymentType
			{
				Item = item
			};
			transactionRequestType transactionRequest = new transactionRequestType
			{
				transactionType = 0.ToString(),
				amount = amount,
				payment = payment
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
