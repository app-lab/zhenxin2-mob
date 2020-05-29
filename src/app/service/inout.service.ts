import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json;charset=utf-8',
  'token': localStorage.getItem('token')
});

@Injectable({
  providedIn: 'root'
})
export class InoutService {
  excuteUrl = 'http://47.114.39.156:3300/api/web/v1/';
  constructor(private http: HttpClient) { }

  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(this.excuteUrl + url, body, {
      headers,
      responseType: 'json'
    })
  }

  getToken(url: string, body: any): Observable<any> {
    return this.http.get<any>(this.excuteUrl + url + this.buildparams(body), {
      headers,
      responseType: 'json'
    })
  }

  buildparams(data): string {
    if (Object.keys(data).length) {
      let myary: string[] = []
      Object.keys(data).forEach((item) => {
        myary.push(item + '=' + data[item])
      })
      return '?' + myary.join('&')
    } else {
      return ''
    }
  }
}
