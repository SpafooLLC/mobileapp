using System;
using System.Text;

namespace Netsam.AuthorizeNet
{
    public interface IUrlEncoderInfo {
        void UrlEncode (StringBuilder sb);
    }
}