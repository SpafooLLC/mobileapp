using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class ValidateCustomerPaymentProfile
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string customerProfileId, string customerPaymentProfileId)
		{
			Console.WriteLine("Validate customer payment profile sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			validateCustomerPaymentProfileRequest validateCustomerPaymentProfileRequest = new validateCustomerPaymentProfileRequest();
			validateCustomerPaymentProfileRequest.customerProfileId = customerProfileId;
			validateCustomerPaymentProfileRequest.customerPaymentProfileId = customerPaymentProfileId;
			validateCustomerPaymentProfileRequest.validationMode = validationModeEnum.liveMode;
			validateCustomerPaymentProfileController validateCustomerPaymentProfileController = new validateCustomerPaymentProfileController(validateCustomerPaymentProfileRequest);
			validateCustomerPaymentProfileController.Execute(null);
			validateCustomerPaymentProfileResponse apiResponse = validateCustomerPaymentProfileController.GetApiResponse();
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
