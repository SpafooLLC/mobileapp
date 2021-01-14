using AuthorizeNet;
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
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = APICredential.APILoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = APICredential.TransactionKey
			};
			getCustomerProfileRequest getCustomerProfileRequest = new getCustomerProfileRequest();
			getCustomerProfileRequest.customerProfileId = customerProfileId;
			getCustomerProfileController getCustomerProfileController = new getCustomerProfileController(getCustomerProfileRequest);
			getCustomerProfileController.Execute(null);
			return getCustomerProfileController.GetApiResponse();
		}
	}
}
