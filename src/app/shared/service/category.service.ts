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
export class CategoryService {
    private baseApi: string = url_config_api.baseApi
    constructor(private http: HttpClient) {
    }
    getCategoryById(categoryId: string): Observable<IBaseCollectionResult<any> | undefined> {
        let url = this.baseApi + "api/category/get_by_id/" + categoryId
        return this.http.get(url).pipe(map((res) => res),
            catchError((err) => {
                return of(err)
            })
        )
    }
}