import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
export class HeaderService {
    BuildRequestHeaders(token: any) {
        let httpHeader = null;
        httpHeader = new HttpHeaders({
            'token': token
        })
    }
    BuildRequestHeadersFormDataNoAuth() {
        let httpHeader = null;

        httpHeader = new HttpHeaders({
            "Platform": 'web',
            'Accept-Language': "en-US",
            'Accept': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "If-Modified-Since": "Mon, 26 Jul 1997 05:00:00 GMT",
            "Content-Type": "multipart/form-data",
            // "browser": this.deviceInfo.browser,
            // "browser_version": this.deviceInfo.browser_version,
            // "device": this.deviceInfo.device,
            // "deviceType": this.deviceInfo.deviceType,
            // "orientation": this.deviceInfo.orientation,
            // "os": this.deviceInfo.os,
            // "os_version": this.deviceInfo.os_version,
            // "userAgent": this.deviceInfo.userAgent,
            // "Language":this.curent_lang
        });

        return httpHeader;
    }
}