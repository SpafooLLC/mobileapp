using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class GetCustomerPaymentProfile
	{
		public static ANetApiResponse Run(string customerProfileId, string customerPaymentProfileId)
		{
			Console.WriteLine("Get Customer Payment Profile sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = APICredential.APILoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = APICredential.TransactionKey
			};
			getCustomerPaymentProfileRequest getCustomerPaymentProfileRequest = new getCustomerPaymentProfileRequest();
			getCustomerPaymentProfileRequest.customerProfileId = customerProfileId;
			getCustomerPaymentProfileRequest.customerPaymentProfileId = customerPaymentProfileId;
			getCustomerPaymentProfileController getCustomerPaymentProfileController = new getCustomerPaymentProfileController(getCustomerPaymentProfileRequest);
			getCustomerPaymentProfileController.Execute(null);
			getCustomerPaymentProfileResponse apiResponse = getCustomerPaymentProfileController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				Console.WriteLine(apiResponse.messages.message[0].text);
				Console.WriteLine("Customer Payment Profile Id: " + apiResponse.paymentProfile.customerPaymentProfileId);
				if (apiResponse.paymentProfile.payment.Item is creditCardMaskedType)
				{
					Console.WriteLine("Customer Payment Profile Last 4: " + (apiResponse.paymentProfile.payment.Item as creditCardMaskedType).cardNumber);
					Console.WriteLine("Customer Payment Profile Expiration Date: " + (apiResponse.paymentProfile.payment.Item as creditCardMaskedType).expirationDate);
					if (apiResponse.paymentProfile.subscriptionIds != null && apiResponse.paymentProfile.subscriptionIds.Length != 0)
					{
						Console.WriteLine("List of subscriptions : ");
						for (int i = 0; i < apiResponse.paymentProfile.subscriptionIds.Length; i++)
						{
							Console.WriteLine(apiResponse.paymentProfile.subscriptionIds[i]);
						}
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
