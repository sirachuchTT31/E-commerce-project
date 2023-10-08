import { HttpClient } from "@angular/common/http";
import { ConfigurationService } from './configuration.service';
import { Observable, catchError, map, of } from 'rxjs';
import { HeaderService } from "./header.service";
import { IBaseCollectionResult, IBaseSingleResult } from "../interface/base-result";
import { Injectable } from "@angular/core";
import { url_config_api } from '../service/config.service';
import { Login, Register } from "../interface/auth";
@Injectable({
    providedIn: "root",
})
export class AuthService {
    private baseApi: string = url_config_api.baseApi
    constructor(private http: HttpClient) {
    }
    postLogin(list: Login): Observable<IBaseCollectionResult<any> | undefined> {
        let url = this.baseApi + "api/login"
        let param = list
        //let option = this.headerService.BuildRequestHeadersFormDataNoAuth()
        return this.http.post(url, param).pipe(map((res) => res),
            catchError((err) => {
                return of(err)
            })
        )
    }
    postRegister(list: Register): Observable<IBaseSingleResult<any> | undefined> {
        let url = this.baseApi + "api/register"
        let param = list
        return this.http.post(url, param).pipe(map((res) => res),
            catchError((err) => {
                return of(err)
            })
        )
    }
}