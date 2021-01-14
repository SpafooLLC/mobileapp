using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System.Net;

namespace net.authorize.sample
{
	public class DeleteCustomerPaymentProfile
	{
		public static ANetApiResponse Run(string customerProfileId, string customerPaymentProfileId)
		{
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = APICredential.APILoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = APICredential.TransactionKey
			};
			deleteCustomerPaymentProfileRequest apiRequest = new deleteCustomerPaymentProfileRequest
			{
				customerProfileId = customerProfileId,
				customerPaymentProfileId = customerPaymentProfileId
			};
			deleteCustomerPaymentProfileController deleteCustomerPaymentProfileController = new deleteCustomerPaymentProfileController(apiRequest);
			deleteCustomerPaymentProfileController.Execute(null);
			return deleteCustomerPaymentProfileController.GetApiResponse();
		}
	}
}
