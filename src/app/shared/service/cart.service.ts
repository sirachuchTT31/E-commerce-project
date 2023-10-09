import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigurationService } from './configuration.service';
import { Observable, catchError, map, of } from 'rxjs';
import { HeaderService } from "./header.service";
import { IBaseCollectionResult, IBaseSingleResult } from "../interface/base-result";
import { Injectable } from "@angular/core";
import { url_config_api } from '../service/config.service';
import { Login, Register } from "../interface/auth";
import { TokenStorageService } from "./token.storage.service";
import { Cartdetail } from "../interface/cart";
@Injectable({
    providedIn: "root",
})
export class CartService {

    private baseApi: string = url_config_api.baseApi
    token_rs: any
    constructor(private http: HttpClient, private headers: HeaderService, private token: TokenStorageService) {
        this.token_rs = this.token.tokenStorage
    }
    postCart(list: Cartdetail): Observable<IBaseCollectionResult<any> | undefined> {
        let url = this.baseApi + "api/cart/create"
        let param = list
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': this.token_rs
        });
        let options = { headers: headers };
        //let option = this.headers.BuildRequestHeaders(this.token.tokenStorage)
        return this.http.post(url, param, options).pipe(map((res) => res),
            catchError((err) => {
                return of(err)
            })
        )
    }
}