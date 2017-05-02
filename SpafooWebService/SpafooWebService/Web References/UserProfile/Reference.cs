﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

// 
// This source code was auto-generated by Microsoft.VSDesigner, Version 4.0.30319.42000.
// 
#pragma warning disable 1591

namespace SpafooWebService.UserProfile {
    using System;
    using System.Web.Services;
    using System.Diagnostics;
    using System.Web.Services.Protocols;
    using System.Xml.Serialization;
    using System.ComponentModel;
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="rhSoap", Namespace="http://tempuri.org/")]
    public partial class rh : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback UpdateUserOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetProTagLineOperationCompleted;
        
        private System.Threading.SendOrPostCallback RemoveMySampleOperationCompleted;
        
        private System.Threading.SendOrPostCallback ChangePasswordOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetRegionsOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetUserTypeOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public rh() {
            this.Url = global::SpafooWebService.Properties.Settings.Default.SpafooWebService_UserProfile_rh;
            if ((this.IsLocalFileSystemWebService(this.Url) == true)) {
                this.UseDefaultCredentials = true;
                this.useDefaultCredentialsSetExplicitly = false;
            }
            else {
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        public new string Url {
            get {
                return base.Url;
            }
            set {
                if ((((this.IsLocalFileSystemWebService(base.Url) == true) 
                            && (this.useDefaultCredentialsSetExplicitly == false)) 
                            && (this.IsLocalFileSystemWebService(value) == false))) {
                    base.UseDefaultCredentials = false;
                }
                base.Url = value;
            }
        }
        
        public new bool UseDefaultCredentials {
            get {
                return base.UseDefaultCredentials;
            }
            set {
                base.UseDefaultCredentials = value;
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        /// <remarks/>
        public event UpdateUserCompletedEventHandler UpdateUserCompleted;
        
        /// <remarks/>
        public event GetProTagLineCompletedEventHandler GetProTagLineCompleted;
        
        /// <remarks/>
        public event RemoveMySampleCompletedEventHandler RemoveMySampleCompleted;
        
        /// <remarks/>
        public event ChangePasswordCompletedEventHandler ChangePasswordCompleted;
        
        /// <remarks/>
        public event GetRegionsCompletedEventHandler GetRegionsCompleted;
        
        /// <remarks/>
        public event GetUserTypeCompletedEventHandler GetUserTypeCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/UpdateUser", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string UpdateUser(
                    int UserID, 
                    string FN, 
                    string LN, 
                    string E, 
                    string P, 
                    string Mo, 
                    string Str, 
                    string City, 
                    string Region, 
                    string PC, 
                    string DN, 
                    string Bio, 
                    string TagLine, 
                    string Gender, 
                    string TOE, 
                    string Lic, 
                    string SSN, 
                    string EIN, 
                    string uPOS) {
            object[] results = this.Invoke("UpdateUser", new object[] {
                        UserID,
                        FN,
                        LN,
                        E,
                        P,
                        Mo,
                        Str,
                        City,
                        Region,
                        PC,
                        DN,
                        Bio,
                        TagLine,
                        Gender,
                        TOE,
                        Lic,
                        SSN,
                        EIN,
                        uPOS});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void UpdateUserAsync(
                    int UserID, 
                    string FN, 
                    string LN, 
                    string E, 
                    string P, 
                    string Mo, 
                    string Str, 
                    string City, 
                    string Region, 
                    string PC, 
                    string DN, 
                    string Bio, 
                    string TagLine, 
                    string Gender, 
                    string TOE, 
                    string Lic, 
                    string SSN, 
                    string EIN, 
                    string uPOS) {
            this.UpdateUserAsync(UserID, FN, LN, E, P, Mo, Str, City, Region, PC, DN, Bio, TagLine, Gender, TOE, Lic, SSN, EIN, uPOS, null);
        }
        
        /// <remarks/>
        public void UpdateUserAsync(
                    int UserID, 
                    string FN, 
                    string LN, 
                    string E, 
                    string P, 
                    string Mo, 
                    string Str, 
                    string City, 
                    string Region, 
                    string PC, 
                    string DN, 
                    string Bio, 
                    string TagLine, 
                    string Gender, 
                    string TOE, 
                    string Lic, 
                    string SSN, 
                    string EIN, 
                    string uPOS, 
                    object userState) {
            if ((this.UpdateUserOperationCompleted == null)) {
                this.UpdateUserOperationCompleted = new System.Threading.SendOrPostCallback(this.OnUpdateUserOperationCompleted);
            }
            this.InvokeAsync("UpdateUser", new object[] {
                        UserID,
                        FN,
                        LN,
                        E,
                        P,
                        Mo,
                        Str,
                        City,
                        Region,
                        PC,
                        DN,
                        Bio,
                        TagLine,
                        Gender,
                        TOE,
                        Lic,
                        SSN,
                        EIN,
                        uPOS}, this.UpdateUserOperationCompleted, userState);
        }
        
        private void OnUpdateUserOperationCompleted(object arg) {
            if ((this.UpdateUserCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.UpdateUserCompleted(this, new UpdateUserCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetProTagLine", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string GetProTagLine(int UID) {
            object[] results = this.Invoke("GetProTagLine", new object[] {
                        UID});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void GetProTagLineAsync(int UID) {
            this.GetProTagLineAsync(UID, null);
        }
        
        /// <remarks/>
        public void GetProTagLineAsync(int UID, object userState) {
            if ((this.GetProTagLineOperationCompleted == null)) {
                this.GetProTagLineOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetProTagLineOperationCompleted);
            }
            this.InvokeAsync("GetProTagLine", new object[] {
                        UID}, this.GetProTagLineOperationCompleted, userState);
        }
        
        private void OnGetProTagLineOperationCompleted(object arg) {
            if ((this.GetProTagLineCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetProTagLineCompleted(this, new GetProTagLineCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/RemoveMySample", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public void RemoveMySample(int UserID, string FilePath) {
            this.Invoke("RemoveMySample", new object[] {
                        UserID,
                        FilePath});
        }
        
        /// <remarks/>
        public void RemoveMySampleAsync(int UserID, string FilePath) {
            this.RemoveMySampleAsync(UserID, FilePath, null);
        }
        
        /// <remarks/>
        public void RemoveMySampleAsync(int UserID, string FilePath, object userState) {
            if ((this.RemoveMySampleOperationCompleted == null)) {
                this.RemoveMySampleOperationCompleted = new System.Threading.SendOrPostCallback(this.OnRemoveMySampleOperationCompleted);
            }
            this.InvokeAsync("RemoveMySample", new object[] {
                        UserID,
                        FilePath}, this.RemoveMySampleOperationCompleted, userState);
        }
        
        private void OnRemoveMySampleOperationCompleted(object arg) {
            if ((this.RemoveMySampleCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.RemoveMySampleCompleted(this, new System.ComponentModel.AsyncCompletedEventArgs(invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ChangePassword", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string ChangePassword(int UserId, string CP, string NP, string CNP) {
            object[] results = this.Invoke("ChangePassword", new object[] {
                        UserId,
                        CP,
                        NP,
                        CNP});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void ChangePasswordAsync(int UserId, string CP, string NP, string CNP) {
            this.ChangePasswordAsync(UserId, CP, NP, CNP, null);
        }
        
        /// <remarks/>
        public void ChangePasswordAsync(int UserId, string CP, string NP, string CNP, object userState) {
            if ((this.ChangePasswordOperationCompleted == null)) {
                this.ChangePasswordOperationCompleted = new System.Threading.SendOrPostCallback(this.OnChangePasswordOperationCompleted);
            }
            this.InvokeAsync("ChangePassword", new object[] {
                        UserId,
                        CP,
                        NP,
                        CNP}, this.ChangePasswordOperationCompleted, userState);
        }
        
        private void OnChangePasswordOperationCompleted(object arg) {
            if ((this.ChangePasswordCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ChangePasswordCompleted(this, new ChangePasswordCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetRegions", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public ListEntryInfo[] GetRegions() {
            object[] results = this.Invoke("GetRegions", new object[0]);
            return ((ListEntryInfo[])(results[0]));
        }
        
        /// <remarks/>
        public void GetRegionsAsync() {
            this.GetRegionsAsync(null);
        }
        
        /// <remarks/>
        public void GetRegionsAsync(object userState) {
            if ((this.GetRegionsOperationCompleted == null)) {
                this.GetRegionsOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetRegionsOperationCompleted);
            }
            this.InvokeAsync("GetRegions", new object[0], this.GetRegionsOperationCompleted, userState);
        }
        
        private void OnGetRegionsOperationCompleted(object arg) {
            if ((this.GetRegionsCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetRegionsCompleted(this, new GetRegionsCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetUserType", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string GetUserType(string UID) {
            object[] results = this.Invoke("GetUserType", new object[] {
                        UID});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void GetUserTypeAsync(string UID) {
            this.GetUserTypeAsync(UID, null);
        }
        
        /// <remarks/>
        public void GetUserTypeAsync(string UID, object userState) {
            if ((this.GetUserTypeOperationCompleted == null)) {
                this.GetUserTypeOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetUserTypeOperationCompleted);
            }
            this.InvokeAsync("GetUserType", new object[] {
                        UID}, this.GetUserTypeOperationCompleted, userState);
        }
        
        private void OnGetUserTypeOperationCompleted(object arg) {
            if ((this.GetUserTypeCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetUserTypeCompleted(this, new GetUserTypeCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        public new void CancelAsync(object userState) {
            base.CancelAsync(userState);
        }
        
        private bool IsLocalFileSystemWebService(string url) {
            if (((url == null) 
                        || (url == string.Empty))) {
                return false;
            }
            System.Uri wsUri = new System.Uri(url);
            if (((wsUri.Port >= 1024) 
                        && (string.Compare(wsUri.Host, "localHost", System.StringComparison.OrdinalIgnoreCase) == 0))) {
                return true;
            }
            return false;
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.6.1064.2")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/")]
    public partial class ListEntryInfo {
        
        private int entryIDField;
        
        private int portalIDField;
        
        private string listNameField;
        
        private string valueField;
        
        private string textField;
        
        private string descriptionField;
        
        private int parentIDField;
        
        private string parentField;
        
        private int levelField;
        
        private int sortOrderField;
        
        private int definitionIDField;
        
        private bool hasChildrenField;
        
        private string parentKeyField;
        
        private bool systemListField;
        
        /// <remarks/>
        public int EntryID {
            get {
                return this.entryIDField;
            }
            set {
                this.entryIDField = value;
            }
        }
        
        /// <remarks/>
        public int PortalID {
            get {
                return this.portalIDField;
            }
            set {
                this.portalIDField = value;
            }
        }
        
        /// <remarks/>
        public string ListName {
            get {
                return this.listNameField;
            }
            set {
                this.listNameField = value;
            }
        }
        
        /// <remarks/>
        public string Value {
            get {
                return this.valueField;
            }
            set {
                this.valueField = value;
            }
        }
        
        /// <remarks/>
        public string Text {
            get {
                return this.textField;
            }
            set {
                this.textField = value;
            }
        }
        
        /// <remarks/>
        public string Description {
            get {
                return this.descriptionField;
            }
            set {
                this.descriptionField = value;
            }
        }
        
        /// <remarks/>
        public int ParentID {
            get {
                return this.parentIDField;
            }
            set {
                this.parentIDField = value;
            }
        }
        
        /// <remarks/>
        public string Parent {
            get {
                return this.parentField;
            }
            set {
                this.parentField = value;
            }
        }
        
        /// <remarks/>
        public int Level {
            get {
                return this.levelField;
            }
            set {
                this.levelField = value;
            }
        }
        
        /// <remarks/>
        public int SortOrder {
            get {
                return this.sortOrderField;
            }
            set {
                this.sortOrderField = value;
            }
        }
        
        /// <remarks/>
        public int DefinitionID {
            get {
                return this.definitionIDField;
            }
            set {
                this.definitionIDField = value;
            }
        }
        
        /// <remarks/>
        public bool HasChildren {
            get {
                return this.hasChildrenField;
            }
            set {
                this.hasChildrenField = value;
            }
        }
        
        /// <remarks/>
        public string ParentKey {
            get {
                return this.parentKeyField;
            }
            set {
                this.parentKeyField = value;
            }
        }
        
        /// <remarks/>
        public bool SystemList {
            get {
                return this.systemListField;
            }
            set {
                this.systemListField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void UpdateUserCompletedEventHandler(object sender, UpdateUserCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class UpdateUserCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal UpdateUserCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void GetProTagLineCompletedEventHandler(object sender, GetProTagLineCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetProTagLineCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetProTagLineCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void RemoveMySampleCompletedEventHandler(object sender, System.ComponentModel.AsyncCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void ChangePasswordCompletedEventHandler(object sender, ChangePasswordCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class ChangePasswordCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal ChangePasswordCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void GetRegionsCompletedEventHandler(object sender, GetRegionsCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetRegionsCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetRegionsCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public ListEntryInfo[] Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((ListEntryInfo[])(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void GetUserTypeCompletedEventHandler(object sender, GetUserTypeCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetUserTypeCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetUserTypeCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591