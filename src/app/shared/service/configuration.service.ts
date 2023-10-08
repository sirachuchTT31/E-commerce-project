import { Injectable, Inject } from '@angular/core';
//import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http'
import { ISubscription } from '../interface/shared.interface';
@Injectable()
export class ConfigurationService {
    private appSetting!: ISubscription
    constructor() {
    }
    // public async configure() {
    //     return await 'http://localhost:5000/'
    // }
    public configure(): Promise<ISubscription> {
        return new Promise((resolve) => {
            this.appSetting = {
                baseApi: 'http://localhost:5000/'
            }
            return resolve(this.appSetting)
        });

    }
    get Config(): ISubscription {
        return this.appSetting;
    }
}