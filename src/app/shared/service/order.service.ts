import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigurationService } from './configuration.service';
import { Observable, catchError, map, of } from 'rxjs';
import { HeaderService } from "./header.service";
import { IBaseCollectionResult, IBaseSingleResult } from "../interface/base-result";
import { Injectable } from "@angular/core";
import { url_config_api } from '../service/config.service';
import { Login, Register } from "../interface/auth";
import { TokenStorageService } from "./token.storage.service";
@Injectable({
    providedIn: "root",
})
export class OrderService {
    token_rs: any
    private baseApi: string = url_config_api.baseApi
    constructor(private http: HttpClient, private token: TokenStorageService) {
        this.token_rs = this.token.tokenStorage
    }

    getOrderById(id: string): Observable<IBaseCollectionResult<any> | undefined> {
        let url = this.baseApi + "api/order/get_all_order_by_user_id/" + id
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': this.token_rs
        });
        let options = { headers: headers };
        return this.http.get(url, options).pipe(map((res) => res),
            catchError((err) => {
                return of(err)
            })
        )
    }
}
