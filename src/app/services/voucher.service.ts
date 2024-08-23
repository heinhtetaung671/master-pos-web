import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

const BASE_URL = `${environment.serverUrl}/voucher`

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  readonly http = inject(HttpClient);

  constructor() { }

  search(search: any) {
    return this.http.get<any>(BASE_URL, { params: search });
  }

  create(form: any) {
    return this.http.post<any>(BASE_URL, form);
  }

  update(id: any, form:any) {
    return this.http.put<any>(`${BASE_URL}/${id}`, form)
  }

  findByDate(date: any) {
    return this.http.get<any>(`${BASE_URL}/find/${date}`);
  }
}
