using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class CreateCustomerShippingAddress
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string customerProfileId)
		{
			Console.WriteLine("CreateCustomerShippingAddress Sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			customerAddressType customerAddressType = new customerAddressType();
			customerAddressType.firstName = "Chris";
			customerAddressType.lastName = "brown";
			customerAddressType.address = "1200 148th AVE NE";
			customerAddressType.city = "NorthBend";
			customerAddressType.zip = "92101";
			createCustomerShippingAddressRequest apiRequest = new createCustomerShippingAddressRequest
			{
				customerProfileId = customerProfileId,
				address = customerAddressType
			};
			createCustomerShippingAddressController createCustomerShippingAddressController = new createCustomerShippingAddressController(apiRequest);
			createCustomerShippingAddressController.Execute(null);
			createCustomerShippingAddressResponse apiResponse = createCustomerShippingAddressController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				if (apiResponse != null && apiResponse.messages.message != null)
				{
					Console.WriteLine("Success, customerAddressId : " + apiResponse.customerAddressId);
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
