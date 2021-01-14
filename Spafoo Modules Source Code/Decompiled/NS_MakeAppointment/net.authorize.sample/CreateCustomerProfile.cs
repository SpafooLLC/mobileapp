using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System.Collections.Generic;
using System.Net;

namespace net.authorize.sample
{
	public class CreateCustomerProfile
	{
		public static createCustomerProfileResponse Run(string CCNumber, string Expiry, string CVV, string Email, string name, string adrs, string city, string state, string zip, string phone)
		{
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = Environment.PRODUCTION;
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
			customerAddressType billTo = new customerAddressType
			{
				firstName = name,
				address = adrs,
				city = city,
				state = state,
				zip = zip,
				phoneNumber = phone
			};
			List<customerPaymentProfileType> list = new List<customerPaymentProfileType>();
			customerPaymentProfileType customerPaymentProfileType = new customerPaymentProfileType();
			customerPaymentProfileType.payment = payment;
			customerPaymentProfileType.billTo = billTo;
			customerPaymentProfileType.customerType = customerTypeEnum.individual;
			list.Add(customerPaymentProfileType);
			customerProfileType customerProfileType = new customerProfileType();
			customerProfileType.merchantCustomerId = "";
			customerProfileType.email = Email;
			customerProfileType.paymentProfiles = list.ToArray();
			createCustomerProfileRequest apiRequest = new createCustomerProfileRequest
			{
				profile = customerProfileType,
				validationMode = validationModeEnum.none
			};
			createCustomerProfileController createCustomerProfileController = new createCustomerProfileController(apiRequest);
			createCustomerProfileController.Execute(null);
			return createCustomerProfileController.GetApiResponse();
		}
	}
}
