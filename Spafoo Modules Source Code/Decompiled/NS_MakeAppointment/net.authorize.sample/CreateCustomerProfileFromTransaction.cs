using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class CreateCustomerProfileFromTransaction
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string transactionId)
		{
			Console.WriteLine("CreateCustomerProfileFromTransaction Sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			customerProfileBaseType customer = new customerProfileBaseType
			{
				merchantCustomerId = "123212",
				email = "hello@castleblack.com",
				description = "This is a sample customer profile"
			};
			createCustomerProfileFromTransactionRequest apiRequest = new createCustomerProfileFromTransactionRequest
			{
				transId = transactionId,
				customer = customer
			};
			createCustomerProfileFromTransactionController createCustomerProfileFromTransactionController = new createCustomerProfileFromTransactionController(apiRequest);
			createCustomerProfileFromTransactionController.Execute(null);
			createCustomerProfileResponse apiResponse = createCustomerProfileFromTransactionController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				if (apiResponse != null && apiResponse.messages.message != null)
				{
					Console.WriteLine("Success, CustomerProfileID : " + apiResponse.customerProfileId);
					Console.WriteLine("Success, CustomerPaymentProfileID : " + apiResponse.customerPaymentProfileIdList[0]);
					Console.WriteLine("Success, CustomerShippingProfileID : " + apiResponse.customerShippingAddressIdList[0]);
				}
			}
			else if (apiResponse != null)
			{
				Console.WriteLine("Error: " + apiResponse.messages.message[0].code + "  " + apiResponse.messages.message[0].text);
			}
			return apiResponse;
		}
	}
}
