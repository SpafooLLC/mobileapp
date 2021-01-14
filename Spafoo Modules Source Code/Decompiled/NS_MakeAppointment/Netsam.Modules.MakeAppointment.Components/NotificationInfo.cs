using System;

namespace Netsam.Modules.MakeAppointment.Components
{
	public class NotificationInfo
	{
		private string _ByName = "";

		private string _ToName = "";

		public int ID
		{
			get;
			set;
		}

		public int ActivityByID
		{
			get;
			set;
		}

		public int ActivityToID
		{
			get;
			set;
		}

		public DateTime Dated
		{
			get;
			set;
		}

		public int PrivacyType
		{
			get;
			set;
		}

		public int NotificationTypeID
		{
			get;
			set;
		}

		public int RelatedEntityID
		{
			get;
			set;
		}

		public string ByName
		{
			get
			{
				return this._ByName;
			}
			set
			{
				string text = this._ByName = value.Split(' ')[0] + " " + value.Split(' ')[1].Substring(0, 1) + ".";
			}
		}

		public string ToName
		{
			get
			{
				return this._ToName;
			}
			set
			{
				string text = this._ToName = value.Split(' ')[0] + " " + value.Split(' ')[1].Substring(0, 1) + ".";
			}
		}

		public string DisplayText
		{
			get;
			set;
		}

		public string TypeName
		{
			get;
			set;
		}
	}
}
