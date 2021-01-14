using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class UpdateCustomerShippingAddress
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey, string customerProfileID, string customerAddressId)
		{
			Console.WriteLine("Update customer shipping address sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			creditCardType item = new creditCardType
			{
				cardNumber = "4111111111111111",
				expirationDate = "0718"
			};
			paymentType paymentType = new paymentType
			{
				Item = item
			};
			customerAddressExType address = new customerAddressExType
			{
				firstName = "Newfirstname",
				lastName = "Doe",
				address = "123 Main St.",
				city = "Bellevue",
				state = "WA",
				zip = "98004",
				country = "USA",
				phoneNumber = "000-000-000",
				customerAddressId = customerAddressId
			};
			updateCustomerShippingAddressRequest updateCustomerShippingAddressRequest = new updateCustomerShippingAddressRequest();
			updateCustomerShippingAddressRequest.customerProfileId = customerProfileID;
			updateCustomerShippingAddressRequest.address = address;
			updateCustomerShippingAddressController updateCustomerShippingAddressController = new updateCustomerShippingAddressController(updateCustomerShippingAddressRequest);
			updateCustomerShippingAddressController.Execute(null);
			updateCustomerShippingAddressResponse apiResponse = updateCustomerShippingAddressController.GetApiResponse();
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
