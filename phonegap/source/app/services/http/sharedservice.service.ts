module ez.httpsharedservice {

    export interface ISharedHttp {
        timeZone: string;
        deviceName: string;
        customerId: string;
        userType: string;
        uuid: string;
        getuserType(): any;
        setuserType(value: any): any;
        getUuid(): any;
        setUuid(value: any): any;
        getCustomerId(): any;
        setCustomerId(value: any): any;
        getDeviceName(): any;
        setDeviceName(value: any): any;
        setTimeZone(value: any): any;
        getTimeZone(): any;
    }
    export class SharedHttp implements ISharedHttp {
        timeZone: string;
        deviceName: string;
        customerId: string;
        userType: string;
        uuid: string;
        getuserType(): any {
            return this.userType;
        }
        setuserType(value: any): any {
            this.userType = value;
        }
        getUuid(): any {
            return this.uuid;
        }
        setUuid(value: any): any {
            this.uuid = value;
        }
        getCustomerId(): any {
            return this.customerId;
        }
        setCustomerId(value: any): any {
            this.customerId = value;
        }
        getDeviceName(): any {
            return this.deviceName;
        }
        setDeviceName(value: any): any {
            this.deviceName = value;
        }
        getTimeZone(): any {
            return this.timeZone;
        }
        setTimeZone(value: any): any {
            this.timeZone = value;
        }
    }
    angular
        .module('ez.httpsharedservice', [])
        .service('SharedHttp', SharedHttp);
}