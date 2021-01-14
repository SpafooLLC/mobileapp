using DotNetNuke.Common.Utilities;
using Netsam.Modules.MakeAppointment.Data;
using System.Collections.Generic;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class RatingController
	{
		public int AddRating(int RatingByID, int RatingToID, decimal RatingValue, int RatingTypeID, int AppID)
		{
			return DataProvider.Instance().AddRating(RatingByID, RatingToID, RatingValue, RatingTypeID, AppID);
		}

		public List<RatingInfo> ListRatingType(int RatingFilterID)
		{
			return CBO.FillCollection<RatingInfo>(DataProvider.Instance().ListRating(RatingFilterID));
		}

		public int AddUserReview(int ByUserID, int ToUserID, string ILike, string IDLike, string Comments, int DisplayNameAs, int AppID)
		{
			return DataProvider.Instance().AddUserReview(ByUserID, ToUserID, ILike, IDLike, Comments, DisplayNameAs, AppID);
		}
	}
}
