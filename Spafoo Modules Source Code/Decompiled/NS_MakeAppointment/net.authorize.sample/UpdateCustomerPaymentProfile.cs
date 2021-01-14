using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class UpdateCustomerPaymentProfile
	{
		public static ANetApiResponse Run(string customerProfileId, string customerPaymentProfileId)
		{
			Console.WriteLine("Update Customer payment profile sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = APICredential.APILoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = APICredential.TransactionKey
			};
			creditCardType item = new creditCardType
			{
				cardNumber = "4111111111111111",
				expirationDate = "0718"
			};
			paymentType payment = new paymentType
			{
				Item = item
			};
			customerPaymentProfileExType paymentProfile = new customerPaymentProfileExType
			{
				billTo = new customerAddressType
				{
					firstName = "John",
					lastName = "Doe",
					address = "123 Main St.",
					city = "Bellevue",
					state = "WA",
					zip = "98004",
					country = "USA",
					phoneNumber = "000-000-000"
				},
				payment = payment,
				customerPaymentProfileId = customerPaymentProfileId
			};
			updateCustomerPaymentProfileRequest updateCustomerPaymentProfileRequest = new updateCustomerPaymentProfileRequest();
			updateCustomerPaymentProfileRequest.customerProfileId = customerProfileId;
			updateCustomerPaymentProfileRequest.paymentProfile = paymentProfile;
			updateCustomerPaymentProfileRequest.validationMode = validationModeEnum.liveMode;
			updateCustomerPaymentProfileController updateCustomerPaymentProfileController = new updateCustomerPaymentProfileController(updateCustomerPaymentProfileRequest);
			updateCustomerPaymentProfileController.Execute(null);
			updateCustomerPaymentProfileResponse apiResponse = updateCustomerPaymentProfileController.GetApiResponse();
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
