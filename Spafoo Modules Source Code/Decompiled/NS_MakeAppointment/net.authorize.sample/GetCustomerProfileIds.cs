using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class GetCustomerProfileIds
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey)
		{
			Console.WriteLine("Get Customer Profile Id sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			getCustomerProfileIdsRequest apiRequest = new getCustomerProfileIdsRequest();
			getCustomerProfileIdsController getCustomerProfileIdsController = new getCustomerProfileIdsController(apiRequest);
			getCustomerProfileIdsController.Execute(null);
			getCustomerProfileIdsResponse apiResponse = getCustomerProfileIdsController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				Console.WriteLine(apiResponse.messages.message[0].text);
				Console.WriteLine("Customer Profile Ids: ");
				string[] ids = apiResponse.ids;
				foreach (string value in ids)
				{
					Console.WriteLine(value);
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
