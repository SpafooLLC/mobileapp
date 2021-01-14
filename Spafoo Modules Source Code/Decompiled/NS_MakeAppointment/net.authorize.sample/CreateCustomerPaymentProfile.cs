using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Collections.Generic;
using System.Net;

namespace net.authorize.sample
{
	public class CreateCustomerPaymentProfile
	{
		public static createCustomerPaymentProfileResponse Run(string customerProfileId, string CCNumber, string Expiry, string CVV, string name, string adrs, string city, string state, string zip, string phone)
		{
			Console.WriteLine("CreateCustomerPaymentProfile Sample");
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
				cardNumber = CCNumber,
				expirationDate = Expiry,
				cardCode = CVV
			};
			paymentType payment = new paymentType
			{
				Item = item
			};
			List<customerPaymentProfileType> list = new List<customerPaymentProfileType>();
			customerPaymentProfileType customerPaymentProfileType = new customerPaymentProfileType();
			customerPaymentProfileType.payment = payment;
			customerAddressType customerAddressType = customerPaymentProfileType.billTo = new customerAddressType
			{
				firstName = name,
				address = adrs,
				city = city,
				state = state,
				zip = zip,
				phoneNumber = phone
			};
			customerPaymentProfileType.customerType = customerTypeEnum.individual;
			list.Add(customerPaymentProfileType);
			createCustomerPaymentProfileRequest apiRequest = new createCustomerPaymentProfileRequest
			{
				customerProfileId = customerProfileId,
				paymentProfile = customerPaymentProfileType,
				validationMode = validationModeEnum.none
			};
			createCustomerPaymentProfileController createCustomerPaymentProfileController = new createCustomerPaymentProfileController(apiRequest);
			createCustomerPaymentProfileController.Execute(null);
			return createCustomerPaymentProfileController.GetApiResponse();
		}
	}
}
