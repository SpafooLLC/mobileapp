/*
' Copyright (c) 2016 Christoc.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System.Collections.Generic;
//using System.Xml;
using DotNetNuke.Entities.Modules;
using DotNetNuke.Services.Search;
using Netsam.Modules.NS_UserProfile.Data;
namespace Netsam.Modules.NS_UserProfile.Components
{
    public class NS_ProfileController //: IPortable, ISearchable, IUpgradeable
    {
        #region Work Sample Related Methods
            public int AddWorkSample(int UserId, string FilePath)
            {
                return DataProvider.Instance().AddWorkSample(UserId, FilePath);
            }

            public void UpdateWorkSample(int FileID, string FilePath)
            {
                DataProvider.Instance().UpdateWorkSample(FileID, FilePath);
            }

            public void RemoveWorkSample(int UserID, string FilePath)
            {
                DataProvider.Instance().RemoveWorkSample(UserID, FilePath);
            }

            public int GetUnseenCount(int UserID)
            {
                return DataProvider.Instance().GetUnseenCount(UserID);
            }

            public string GetProTagLine(int UserID)
            {
                return DataProvider.Instance().GetProTagLine(UserID);
            }

            public void UpdateProTagLine(int UserID, string TagLine)
            {
                DataProvider.Instance().UpdateProTagLine(UserID, TagLine);
            }
        #endregion
    }
}
