using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class UpdateCustomerProfile
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string customerProfileId)
		{
			Console.WriteLine("Update customer profile sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			customerProfileExType profile = new customerProfileExType
			{
				merchantCustomerId = "custId123",
				description = "some description",
				email = "newaddress@example.com",
				customerProfileId = customerProfileId
			};
			updateCustomerProfileRequest updateCustomerProfileRequest = new updateCustomerProfileRequest();
			updateCustomerProfileRequest.profile = profile;
			updateCustomerProfileController updateCustomerProfileController = new updateCustomerProfileController(updateCustomerProfileRequest);
			updateCustomerProfileController.Execute(null);
			updateCustomerProfileResponse apiResponse = updateCustomerProfileController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				Console.WriteLine(apiResponse.messages.message[0].text);
			}
			else if (apiResponse != null)
			{
				Console.WriteLine("Error: " + apiResponse.messages.message[0].code + "  " + apiResponse.messages.message[0].text);
			}
			return apiResponse;
		}
	}
}
