using DotNetNuke.Common.Utilities;
using Netsam.Modules.MakeAppointment.Data;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class PaymentProfileController
	{
		public void AddUserPaymentProfile(UserPaymentProfile oProfile)
		{
			DataProvider.Instance().AddUserPaymentProfile(oProfile.UserID, oProfile.CustomerProfileID);
		}

		public void DeleteUserPaymentProfile(UserPaymentProfile oProfile)
		{
			DataProvider.Instance().DeleteUserPaymentProfile(oProfile.UserID, oProfile.CustomerProfileID);
		}

		public UserPaymentProfile GetPaymentProfile(int UserID)
		{
			return CBO.FillObject<UserPaymentProfile>(DataProvider.Instance().GetPaymentProfile(UserID));
		}
	}
}
