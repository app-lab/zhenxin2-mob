import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

// const headers = new HttpHeaders({
//     'Content-Type': 'application/json;charset=utf-8',
//     token: localStorage.getItem('token'),
// })

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    baseUrl = 'http://47.114.39.156:3301/api/web/v1/'
    constructor(private http: HttpClient) {}

    post(url: string, body: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + url, body, {
            responseType: 'json',
        })
    }

    getToken(url: string, body: any): Observable<any> {
        return this.http.get<any>(this.baseUrl + url + this.buildparams(body), this.createOptions())
    }

    getTokenTwo(url: string, body: any): Observable<any> {
        return this.http.get<any>(this.baseUrl + url + body, this.createOptions())
    }

    buildparams(data): string {
        if (Object.keys(data).length) {
            let myary: string[] = []
            Object.keys(data).forEach(item => {
                myary.push(item + '=' + data[item])
            })
            return '?' + myary.join('&')
        } else {
            return ''
        }
    }

    private createOptions() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json;charset=utf-8',
            token: localStorage.getItem('token'),
        })

        let options = {
            headers: headers,
        }
        return options
    }
}
