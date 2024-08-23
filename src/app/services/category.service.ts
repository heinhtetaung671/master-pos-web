import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

const BASE_URL = `${environment.serverUrl}/category`

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http = inject(HttpClient)

  constructor() { }

  search(search: any) {
    return this.http.get(BASE_URL, { params: search});
  }

  create(form: any) {
    return this.http.post(BASE_URL, form);
  }

  update(id: any, form: any) {
    return this.http.put(`${BASE_URL}/${id}`, form);
  }

  loadDataForSelect() {
    return this.http.get(`${BASE_URL}/load-data-for-select`);
  }

}
