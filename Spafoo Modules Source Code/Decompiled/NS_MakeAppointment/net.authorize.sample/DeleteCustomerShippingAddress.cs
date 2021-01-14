using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class DeleteCustomerShippingAddress
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string customerProfileId, string customerAddressId)
		{
			Console.WriteLine("DeleteCustomerShippingAddress Sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			deleteCustomerShippingAddressRequest apiRequest = new deleteCustomerShippingAddressRequest
			{
				customerProfileId = customerProfileId,
				customerAddressId = customerAddressId
			};
			deleteCustomerShippingAddressController deleteCustomerShippingAddressController = new deleteCustomerShippingAddressController(apiRequest);
			deleteCustomerShippingAddressController.Execute(null);
			deleteCustomerShippingAddressResponse apiResponse = deleteCustomerShippingAddressController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				if (apiResponse != null && apiResponse.messages.message != null)
				{
					Console.WriteLine("Success, ResultCode : " + apiResponse.messages.resultCode.ToString());
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
