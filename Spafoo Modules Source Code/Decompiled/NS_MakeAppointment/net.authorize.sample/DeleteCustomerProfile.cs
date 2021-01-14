using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class DeleteCustomerProfile
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string customerProfileId)
		{
			Console.WriteLine("DeleteCustomerProfile Sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			deleteCustomerProfileRequest apiRequest = new deleteCustomerProfileRequest
			{
				customerProfileId = customerProfileId
			};
			deleteCustomerProfileController deleteCustomerProfileController = new deleteCustomerProfileController(apiRequest);
			deleteCustomerProfileController.Execute(null);
			deleteCustomerProfileResponse apiResponse = deleteCustomerProfileController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				if (apiResponse != null && apiResponse.messages.message != null)
				{
					Console.WriteLine("Success, ResultCode : " + apiResponse.messages.resultCode.ToString());
				}
			}
			else if (apiResponse != null && apiResponse.messages.message != null)
			{
				Console.WriteLine("Error: " + apiResponse.messages.message[0].code + "  " + apiResponse.messages.message[0].text);
			}
			return apiResponse;
		}
	}
}
