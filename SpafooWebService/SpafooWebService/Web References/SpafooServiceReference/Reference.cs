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

namespace SpafooWebService.SpafooServiceReference {
    using System;
    using System.Web.Services;
    using System.Diagnostics;
    using System.Web.Services.Protocols;
    using System.Xml.Serialization;
    using System.ComponentModel;
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="rhSoap", Namespace="http://tempuri.org/")]
    public partial class rh : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback RegisterUserOperationCompleted;
        
        private System.Threading.SendOrPostCallback ValidateUserOperationCompleted;
        
        private System.Threading.SendOrPostCallback LogoutOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetProfilePicOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public rh() {
            this.Url = global::SpafooWebService.Properties.Settings.Default.SpafooWebService_SpafooServiceReference_rh;
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
        public event RegisterUserCompletedEventHandler RegisterUserCompleted;
        
        /// <remarks/>
        public event ValidateUserCompletedEventHandler ValidateUserCompleted;
        
        /// <remarks/>
        public event LogoutCompletedEventHandler LogoutCompleted;
        
        /// <remarks/>
        public event GetProfilePicCompletedEventHandler GetProfilePicCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/RegisterUser", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string RegisterUser(
                    string UN, 
                    string FN, 
                    string LN, 
                    string EM, 
                    int PID, 
                    string P, 
                    string S, 
                    string C, 
                    string R, 
                    string Z, 
                    string Ph, 
                    string Mo, 
                    string PicFID, 
                    string HN, 
                    string DT, 
                    int IsWeb, 
                    string GDR, 
                    int MID) {
            object[] results = this.Invoke("RegisterUser", new object[] {
                        UN,
                        FN,
                        LN,
                        EM,
                        PID,
                        P,
                        S,
                        C,
                        R,
                        Z,
                        Ph,
                        Mo,
                        PicFID,
                        HN,
                        DT,
                        IsWeb,
                        GDR,
                        MID});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void RegisterUserAsync(
                    string UN, 
                    string FN, 
                    string LN, 
                    string EM, 
                    int PID, 
                    string P, 
                    string S, 
                    string C, 
                    string R, 
                    string Z, 
                    string Ph, 
                    string Mo, 
                    string PicFID, 
                    string HN, 
                    string DT, 
                    int IsWeb, 
                    string GDR, 
                    int MID) {
            this.RegisterUserAsync(UN, FN, LN, EM, PID, P, S, C, R, Z, Ph, Mo, PicFID, HN, DT, IsWeb, GDR, MID, null);
        }
        
        /// <remarks/>
        public void RegisterUserAsync(
                    string UN, 
                    string FN, 
                    string LN, 
                    string EM, 
                    int PID, 
                    string P, 
                    string S, 
                    string C, 
                    string R, 
                    string Z, 
                    string Ph, 
                    string Mo, 
                    string PicFID, 
                    string HN, 
                    string DT, 
                    int IsWeb, 
                    string GDR, 
                    int MID, 
                    object userState) {
            if ((this.RegisterUserOperationCompleted == null)) {
                this.RegisterUserOperationCompleted = new System.Threading.SendOrPostCallback(this.OnRegisterUserOperationCompleted);
            }
            this.InvokeAsync("RegisterUser", new object[] {
                        UN,
                        FN,
                        LN,
                        EM,
                        PID,
                        P,
                        S,
                        C,
                        R,
                        Z,
                        Ph,
                        Mo,
                        PicFID,
                        HN,
                        DT,
                        IsWeb,
                        GDR,
                        MID}, this.RegisterUserOperationCompleted, userState);
        }
        
        private void OnRegisterUserOperationCompleted(object arg) {
            if ((this.RegisterUserCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.RegisterUserCompleted(this, new RegisterUserCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ValidateUser", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string ValidateUser(string U, string P) {
            object[] results = this.Invoke("ValidateUser", new object[] {
                        U,
                        P});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void ValidateUserAsync(string U, string P) {
            this.ValidateUserAsync(U, P, null);
        }
        
        /// <remarks/>
        public void ValidateUserAsync(string U, string P, object userState) {
            if ((this.ValidateUserOperationCompleted == null)) {
                this.ValidateUserOperationCompleted = new System.Threading.SendOrPostCallback(this.OnValidateUserOperationCompleted);
            }
            this.InvokeAsync("ValidateUser", new object[] {
                        U,
                        P}, this.ValidateUserOperationCompleted, userState);
        }
        
        private void OnValidateUserOperationCompleted(object arg) {
            if ((this.ValidateUserCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ValidateUserCompleted(this, new ValidateUserCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/Logout", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string Logout() {
            object[] results = this.Invoke("Logout", new object[0]);
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void LogoutAsync() {
            this.LogoutAsync(null);
        }
        
        /// <remarks/>
        public void LogoutAsync(object userState) {
            if ((this.LogoutOperationCompleted == null)) {
                this.LogoutOperationCompleted = new System.Threading.SendOrPostCallback(this.OnLogoutOperationCompleted);
            }
            this.InvokeAsync("Logout", new object[0], this.LogoutOperationCompleted, userState);
        }
        
        private void OnLogoutOperationCompleted(object arg) {
            if ((this.LogoutCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.LogoutCompleted(this, new LogoutCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/GetProfilePic", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string GetProfilePic(int FID) {
            object[] results = this.Invoke("GetProfilePic", new object[] {
                        FID});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void GetProfilePicAsync(int FID) {
            this.GetProfilePicAsync(FID, null);
        }
        
        /// <remarks/>
        public void GetProfilePicAsync(int FID, object userState) {
            if ((this.GetProfilePicOperationCompleted == null)) {
                this.GetProfilePicOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetProfilePicOperationCompleted);
            }
            this.InvokeAsync("GetProfilePic", new object[] {
                        FID}, this.GetProfilePicOperationCompleted, userState);
        }
        
        private void OnGetProfilePicOperationCompleted(object arg) {
            if ((this.GetProfilePicCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetProfilePicCompleted(this, new GetProfilePicCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
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
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    public delegate void RegisterUserCompletedEventHandler(object sender, RegisterUserCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class RegisterUserCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal RegisterUserCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
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
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    public delegate void ValidateUserCompletedEventHandler(object sender, ValidateUserCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class ValidateUserCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal ValidateUserCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
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
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    public delegate void LogoutCompletedEventHandler(object sender, LogoutCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class LogoutCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal LogoutCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
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
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    public delegate void GetProfilePicCompletedEventHandler(object sender, GetProfilePicCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.8.3761.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetProfilePicCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetProfilePicCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
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