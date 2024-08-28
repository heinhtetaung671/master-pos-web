import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

const BASE_URL = `${environment.serverUrl}/dashboard`

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly http = inject(HttpClient);

  constructor() { }

  searchCategoryVoucherYearly(year: number) {
    return this.http.get<any>(`${BASE_URL}/category-voucher/yearly/${year}`);
  }

  searchCategoryVoucherMonthly(year: number, month: string) {
    return this.http.get<any>(`${BASE_URL}/category-voucher/monthly`, { params: { year: year, month: month }});
  }

  searchVoucherMonthly(form: { year: number, month: string }) {
    return this.http.get<any>(`${BASE_URL}/voucher/monthly`, { params: form});
  }
}
