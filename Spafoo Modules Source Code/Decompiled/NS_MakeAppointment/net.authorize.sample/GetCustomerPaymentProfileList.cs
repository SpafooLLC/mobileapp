using AuthorizeNet;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Net;

namespace net.authorize.sample
{
	public class GetCustomerPaymentProfileList
	{
		public static ANetApiResponse Run(string ApiLoginID, string ApiTransactionKey)
		{
			//IL_0042: Unknown result type (might be due to invalid IL or missing references)
			//IL_0047: Unknown result type (might be due to invalid IL or missing references)
			//IL_0048: Unknown result type (might be due to invalid IL or missing references)
			//IL_004a: Unknown result type (might be due to invalid IL or missing references)
			//IL_004f: Unknown result type (might be due to invalid IL or missing references)
			//IL_005a: Unknown result type (might be due to invalid IL or missing references)
			//IL_0065: Unknown result type (might be due to invalid IL or missing references)
			//IL_0072: Unknown result type (might be due to invalid IL or missing references)
			//IL_007e: Unknown result type (might be due to invalid IL or missing references)
			//IL_007f: Unknown result type (might be due to invalid IL or missing references)
			//IL_0084: Unknown result type (might be due to invalid IL or missing references)
			//IL_0085: Unknown result type (might be due to invalid IL or missing references)
			//IL_0087: Expected O, but got Unknown
			//IL_008d: Unknown result type (might be due to invalid IL or missing references)
			//IL_008e: Expected O, but got Unknown
			//IL_008e: Unknown result type (might be due to invalid IL or missing references)
			//IL_0093: Unknown result type (might be due to invalid IL or missing references)
			//IL_0094: Unknown result type (might be due to invalid IL or missing references)
			//IL_0097: Unknown result type (might be due to invalid IL or missing references)
			//IL_0098: Expected O, but got Unknown
			//IL_00ad: Unknown result type (might be due to invalid IL or missing references)
			//IL_00ae: Expected O, but got Unknown
			//IL_00ca: Unknown result type (might be due to invalid IL or missing references)
			//IL_00f1: Unknown result type (might be due to invalid IL or missing references)
			//IL_010e: Unknown result type (might be due to invalid IL or missing references)
			//IL_0124: Unknown result type (might be due to invalid IL or missing references)
			//IL_0126: Invalid comparison between Unknown and O
			//IL_012f: Unknown result type (might be due to invalid IL or missing references)
			//IL_0130: Expected O, but got Unknown
			//IL_014a: Unknown result type (might be due to invalid IL or missing references)
			//IL_014b: Expected O, but got Unknown
			//IL_0161: Unknown result type (might be due to invalid IL or missing references)
			//IL_0162: Expected O, but got Unknown
			//IL_0183: Unknown result type (might be due to invalid IL or missing references)
			//IL_0184: Expected O, but got Unknown
			//IL_01a3: Unknown result type (might be due to invalid IL or missing references)
			//IL_01a4: Expected O, but got Unknown
			//IL_01c7: Unknown result type (might be due to invalid IL or missing references)
			//IL_01c8: Expected O, but got Unknown
			Console.WriteLine("Get Customer Payment Profile List sample");
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.PRODUCTION;
			ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType
			{
				name = ApiLoginID,
				ItemElementName = ItemChoiceType.transactionKey,
				Item = ApiTransactionKey
			};
			var val = new getCustomerPaymentProfileListRequest();
			val.searchType = 0;
			val.month = "2020-12";
			val.paging = new Paging();
			val.paging.limit = 50;
			val.paging.offset = 1;
			getCustomerPaymentProfileListController val2 = new getCustomerPaymentProfileListController(val);
			((ApiOperationBase<getCustomerPaymentProfileListRequest, getCustomerPaymentProfileListResponse>)val2).Execute((AuthorizeNet.Environment)null);
			getCustomerPaymentProfileListResponse apiResponse = ((ApiOperationBase<getCustomerPaymentProfileListRequest, getCustomerPaymentProfileListResponse>)val2).GetApiResponse();
			if ((int)apiResponse != 0 && ((ANetApiResponse)apiResponse).messages.resultCode == messageTypeEnum.Ok)
			{
				Console.WriteLine(((ANetApiResponse)apiResponse).messages.message[0].text);
				Console.WriteLine("Number of payment profiles : " + apiResponse.totalNumInResultSet);
				Console.WriteLine("List of Payment profiles : ");
				for (int i = 0; i < apiResponse.paymentProfiles.Length; i++)
				{
					Console.WriteLine(apiResponse.paymentProfiles[i].customerPaymentProfileId);
				}
			}
			else if ((object)apiResponse != null)
			{
				if (((ANetApiResponse)apiResponse).messages.message.Length != 0)
				{
					Console.WriteLine("Error: " + ((ANetApiResponse)apiResponse).messages.message[0].code + "  " + ((ANetApiResponse)apiResponse).messages.message[0].text);
				}
			}
			else if (((ApiOperationBase<getCustomerPaymentProfileListRequest, getCustomerPaymentProfileListResponse>)val2).GetErrorResponse().messages.message.Length != 0)
			{
				Console.WriteLine("Null response received : " + ((ApiOperationBase<getCustomerPaymentProfileListRequest, getCustomerPaymentProfileListResponse>)val2).GetErrorResponse().messages.message[0].text);
			}
			return (ANetApiResponse)apiResponse;
		}
	}
}
