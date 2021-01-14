using System.Xml.Serialization;
namespace Netsam.XAuthorize
{
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("xsd", "4.0.30319.33440")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd", IsNullable = false)]
    public partial class createTransactionRequest
    {
        private string refIdField;

        private createTransactionRequestMerchantAuthentication[] merchantAuthenticationField;

        private createTransactionRequestTransactionRequest[] transactionRequestField;

        /// <remarks/>
        public string refId
        {
            get
            {
                return this.refIdField;
            }
            set
            {
                this.refIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("merchantAuthentication")]
        public createTransactionRequestMerchantAuthentication[] merchantAuthentication
        {
            get
            {
                return this.merchantAuthenticationField;
            }
            set
            {
                this.merchantAuthenticationField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("transactionRequest")]
        public createTransactionRequestTransactionRequest[] transactionRequest
        {
            get
            {
                return this.transactionRequestField;
            }
            set
            {
                this.transactionRequestField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("xsd", "4.0.30319.33440")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd")]
    public partial class createTransactionRequestMerchantAuthentication
    {

        private string nameField;

        private string transactionKeyField;

        /// <remarks/>
        public string name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public string transactionKey
        {
            get
            {
                return this.transactionKeyField;
            }
            set
            {
                this.transactionKeyField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("xsd", "4.0.30319.33440")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd")]
    public partial class createTransactionRequestTransactionRequest
    {

        private string transactionTypeField;

        private string amountField;

        private string customerIPField;

        private createTransactionRequestTransactionRequestProfile[] profileField;

        /// <remarks/>
        public string transactionType
        {
            get
            {
                return this.transactionTypeField;
            }
            set
            {
                this.transactionTypeField = value;
            }
        }

        /// <remarks/>
        public string amount
        {
            get
            {
                return this.amountField;
            }
            set
            {
                this.amountField = value;
            }
        }

        /// <remarks/>
        public string customerIP
        {
            get
            {
                return this.customerIPField;
            }
            set
            {
                this.customerIPField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("profile")]
        public createTransactionRequestTransactionRequestProfile[] profile
        {
            get
            {
                return this.profileField;
            }
            set
            {
                this.profileField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("xsd", "4.0.30319.33440")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd")]
    public partial class createTransactionRequestTransactionRequestProfile
    {

        private string customerProfileIdField;

        private createTransactionRequestTransactionRequestProfilePaymentProfile[] paymentProfileField;

        /// <remarks/>
        public string customerProfileId
        {
            get
            {
                return this.customerProfileIdField;
            }
            set
            {
                this.customerProfileIdField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("paymentProfile")]
        public createTransactionRequestTransactionRequestProfilePaymentProfile[] paymentProfile
        {
            get
            {
                return this.paymentProfileField;
            }
            set
            {
                this.paymentProfileField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("xsd", "4.0.30319.33440")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd")]
    public partial class createTransactionRequestTransactionRequestProfilePaymentProfile
    {

        private string paymentProfileIdField;

        /// <remarks/>
        public string paymentProfileId
        {
            get
            {
                return this.paymentProfileIdField;
            }
            set
            {
                this.paymentProfileIdField = value;
            }
        }
    }

    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("xsd", "4.0.30319.33440")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "AnetApi/xml/v1/schema/AnetApiSchema.xsd", IsNullable = false)]
    public partial class NewDataSet
    {

        private createTransactionRequest[] itemsField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("createTransactionRequest")]
        public createTransactionRequest[] Items
        {
            get
            {
                return this.itemsField;
            }
            set
            {
                this.itemsField = value;
            }
        }
    }
}