using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ExcelLibrary.SpreadSheet;
using Netsam.Modules.NS_PriceList.Components;
using System.Text.RegularExpressions;
using System.IO;
using System.Net;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using OfficeOpenXml.Style;
namespace Netsam.Modules.NS_PriceList
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class rh : System.Web.Services.WebService
    {
        private static ExcelWorksheet CreateSheet(ExcelPackage p, string sheetName)
        {
            p.Workbook.Worksheets.Add(sheetName);
            ExcelWorksheet ws = p.Workbook.Worksheets[1];
            ws.Name = sheetName; //Setting Sheet's name
            ws.Cells.Style.Font.Size = 11; //Default font size for whole sheet
            ws.Cells.Style.Font.Name = "Calibri"; //Default Font name for whole sheet

            return ws;
        }

        [WebMethod]
        public List<StatRPTInfo> ReportByService(string F,string T)
        {
            List<StatRPTInfo> lstReport= new List<StatRPTInfo>();
            StatRPTController oCtrl =  new StatRPTController();
            lstReport=oCtrl.ListStatsRPTByService(F,T);
            return lstReport;
        }
        [WebMethod]
        public List<StatRPTInfo> ReportByProvider(string F, string T)
        {
            List<StatRPTInfo> lstReport = new List<StatRPTInfo>();
            StatRPTController oCtrl = new StatRPTController();
            lstReport = oCtrl.ListStatsRPTByProvider(F, T);
            return lstReport;
        }
        
        [WebMethod]
        public string GetExcel_old(string F, string T)
        {
            List<StatRPTInfo> lstReport = new List<StatRPTInfo>();
            StatRPTController oCtrl = new StatRPTController();
            lstReport = oCtrl.ListStatsRPTByProNSrvc(F, T);
            Workbook workbook = new Workbook();
            Worksheet worksheet = new Worksheet("Sales Report");
            
            int row = 0;

            // Add Column Header
                worksheet.Cells[row, 0] = (new Cell("Provider Name"));// Provider Name 
                worksheet.Cells[row, 1] = new Cell("Date"); // Date
                worksheet.Cells[row, 2] = new Cell("Service"); // ServiceName
                worksheet.Cells[row, 3] = new Cell("Amount");// Amount
            // Add Data Rows
                row = 1;
                foreach (StatRPTInfo oInfo in lstReport)
                {
                    worksheet.Cells[row, 0] = (new Cell(oInfo.Name));// Provider Name 
                    worksheet.Cells[row, 1] = new Cell(oInfo.ForDate.ToString()); // Date
                    worksheet.Cells[row, 2] = new Cell(oInfo.ServiceName); // ServiceName
                    worksheet.Cells[row, 3] = new Cell(oInfo.Paid.ToString("0.00"));// Amount
                    row++;
                }
            //create new xls file 
            string _FileName="SalesReport_" + F.Replace("/", "") + "_" + T.Replace("/", "") + ".xls";
                string TargetFolder = HttpContext.Current.Server.MapPath("~/desktopmodules/NS_PriceList");
                string file = TargetFolder + "/"+_FileName;
                workbook.Worksheets.Add(worksheet); 
                workbook.Save(file);
                return _FileName;
        }

        [WebMethod]
        public string GetExcel(string F, string T)
        {
            List<StatRPTInfo> lstReport = new List<StatRPTInfo>();
            StatRPTController oCtrl = new StatRPTController();
            lstReport = oCtrl.ListStatsRPTByProNSrvc(F, T);

            using (ExcelPackage p = new ExcelPackage())
            {
                //set the workbook properties and add a default sheet in it
                    SetWorkbookProperties(p);
                //Create a sheet
                    ExcelWorksheet ws = CreateSheet(p, "Sales Report");
                    int row = 1;

                // Add Column Header
                    ws.Cells[row, 1].Value = "Provider Name";// Provider Name 
                    ws.Cells[row, 2].Value = "Date"; // Date
                    ws.Cells[row, 3].Value = "Service"; // ServiceName
                    ws.Cells[row, 4].Value = "Amount";// Amount
                    ws.Cells[row, 1, 1, 4].Style.Font.Bold = true;
                // Add Data Rows
                    row = 2;
                    foreach (StatRPTInfo oInfo in lstReport)
                    {
                        ws.Cells[row, 1].Value=oInfo.Name;// Provider Name 
                        ws.Cells[row, 2].Value = oInfo.ForDate.ToString(); // Date
                        ws.Cells[row, 3].Value = oInfo.ServiceName; // ServiceName
                        ws.Cells[row, 4].Value = oInfo.Paid.ToString("0.00");// Amount
                        ws.Cells[row, 4, row, 4].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                        row++;
                    }
                //create new xls file 
                    string _FileName = "SalesReport_" + F.Replace("/", "") + "_" + T.Replace("/", "") + ".xlsx";
                    string TargetFolder = HttpContext.Current.Server.MapPath("~/desktopmodules/NS_PriceList");
                    string file = TargetFolder + "/" + _FileName;
                //Generate A File with Random name
                    Byte[] bin = p.GetAsByteArray();
                    File.WriteAllBytes(file, bin);
                    return _FileName;
            }
        }

        private static void SetWorkbookProperties(ExcelPackage p)
        {
            //Here setting some document properties
            p.Workbook.Properties.Author = "Spafoo";
            p.Workbook.Properties.Title = "Spafoo";
        }
    }
}
