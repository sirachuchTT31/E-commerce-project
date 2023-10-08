import { HttpClient } from "@angular/common/http";
import { ConfigurationService } from './configuration.service';
import { Observable, catchError, map, of } from 'rxjs';
import { HeaderService } from "./header.service";
import { IBaseCollectionResult } from "../interface/base-result";
import { Injectable } from "@angular/core";
import { url_config_api } from '../service/config.service';
@Injectable({
    providedIn: "root",
})
export class ProductService {
    private baseApi: string = url_config_api.baseApi
    constructor(private http: HttpClient) {
    }
    getallProducts(): Observable<IBaseCollectionResult<any> | undefined> {
        //let baseApi = this.configurationService.configure()

        let url = this.baseApi + "api/product/get_all"
        //let option = this.headerService.BuildRequestHeadersFormDataNoAuth()
        return this.http.get(url).pipe(map((res) => res),
            catchError((err) => {
                return of(err)
            })
        )
    }

    getproductById(id: string): Observable<IBaseCollectionResult<any> | undefined> {
        let url = this.baseApi + "api/product/get_by_id/" + id
        return this.http.get(url).pipe(map((res) => res),
            catchError((err) => {
                return of(err)
            })
        )
    }
}