using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class GetHostedProfilePage
	{
		public static ANetApiResponse Run(string ApiLoginId, string ApiTransactionKey, string customerProfileId)
		{
			Console.WriteLine("Get Hosted Profile Page sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginId,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			settingType[] array = new settingType[1]
			{
				new settingType()
			};
			array[0] = new settingType();
			array[0].settingName = 8.ToString();
			array[0].settingValue = "https://returnurl.com/return/";
			getHostedProfilePageRequest getHostedProfilePageRequest = new getHostedProfilePageRequest();
			getHostedProfilePageRequest.customerProfileId = customerProfileId;
			getHostedProfilePageRequest.hostedProfileSettings = array;
			getHostedProfilePageController getHostedProfilePageController = new getHostedProfilePageController(getHostedProfilePageRequest);
			getHostedProfilePageController.Execute(null);
			getHostedProfilePageResponse apiResponse = getHostedProfilePageController.GetApiResponse();
			if (apiResponse != null && apiResponse.messages.resultCode == messageTypeEnum.Ok)
			{
				Console.WriteLine(apiResponse.messages.message[0].code);
				Console.WriteLine(apiResponse.messages.message[0].text);
				Console.WriteLine("Token: " + apiResponse.token.ToString());
			}
			else if (apiResponse != null)
			{
				Console.WriteLine("Error: " + apiResponse.messages.message[0].code + "  " + apiResponse.messages.message[0].text);
			}
			return apiResponse;
		}
	}
}
