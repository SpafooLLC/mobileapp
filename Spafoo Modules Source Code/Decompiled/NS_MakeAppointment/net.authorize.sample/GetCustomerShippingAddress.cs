using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class GetCustomerShippingAddress
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string customerProfileId, string customerAddressId)
		{
			Console.WriteLine("Get Customer Shipping Address sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			getCustomerShippingAddressRequest getCustomerShippingAddressRequest = new getCustomerShippingAddressRequest();
			getCustomerShippingAddressRequest.customerProfileId = customerProfileId;
			getCustomerShippingAddressRequest.customerAddressId = customerAddressId;
			getCustomerShippingAddressController getCustomerShippingAddressController = new getCustomerShippingAddressController(getCustomerShippingAddressRequest);
			getCustomerShippingAddressController.Execute(null);
			getCustomerShippingAddressResponse apiResponse = getCustomerShippingAddressController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				Console.WriteLine(apiResponse.messages.message[0].text);
				if (apiResponse.subscriptionIds != null && apiResponse.subscriptionIds.Length != 0)
				{
					Console.WriteLine("List of subscriptions : ");
					for (int i = 0; i < apiResponse.subscriptionIds.Length; i++)
					{
						Console.WriteLine(apiResponse.subscriptionIds[i]);
					}
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
