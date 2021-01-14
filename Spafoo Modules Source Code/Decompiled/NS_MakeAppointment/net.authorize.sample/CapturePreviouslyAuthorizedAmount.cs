using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
	public class CapturePreviouslyAuthorizedAmount
	{
		public static ANetApiResponse Run(decimal TransactionAmount, string TransactionID)
		{
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = APICredential.APILoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = APICredential.TransactionKey
			};
			transactionRequestType transactionRequest = new transactionRequestType
			{
				transactionType = 4.ToString(),
				amount = TransactionAmount,
				refTransId = TransactionID
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
