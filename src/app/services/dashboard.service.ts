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

  searchCategoryVoucherMonthly(form: any) {
    return this.http.get<any>(`${BASE_URL}/category-voucher/monthly`, { params: form});
  }

  searchVoucherMonthly(form: { year: number, month: string }) {
    return this.http.get<any>(`${BASE_URL}/voucher/monthly`, { params: form});
  }

  searchVoucherYearly(year: number) {
    return this.http.get<any>(`${BASE_URL}/voucher/yearly/${year}`);
  }

  searchProfitMonthly(form: { year: number, month: string }) {
    return this.http.get<any>(`${BASE_URL}/profit/monthly`, { params: form});
  }

  searchProfitYearly(year: number) {
    return this.http.get<any>(`${BASE_URL}/profit/yearly/${year}`);
  }

  searchCategoryProfitYearly(year: number) {
    return this.http.get<any>(`${BASE_URL}/category-profit/yearly/${year}`);
  }

  searchCategoryProfitMonthly(form: any) {
    return this.http.get<any>(`${BASE_URL}/category-profit/monthly`, { params: form});
  }
}
