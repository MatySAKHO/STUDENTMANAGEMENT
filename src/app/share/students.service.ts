import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:3000/students";

  constructor(private _http: HttpClient) { }

  // Create with POST
  postStudent(data: any) {
    return this._http.post<any>(this.baseUrl, data)
      .pipe(map((res: any) => res));
  }

  // Read with GET
  getStudents() {
    return this._http.get<any>(this.baseUrl)
      .pipe(map((res: any) => res));
  }

  // Update with PUT
  updateStudent(data: any, id: number) {
    return this._http.put<any>(`${this.baseUrl}/${id}`, data)
      .pipe(map((res: any) => res));
  }

  // Delete with DELETE
  deleteStudent(id: number) {
    return this._http.delete<any>(`${this.baseUrl}/${id}`)
      .pipe(map((res: any) => res));
  }
}

