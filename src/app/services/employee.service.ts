import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}

// EmployeeService:
// EmployeeService handles HTTP requests to fetch, delete, or save employee information.
// Manages all CRUD operations related to employee data.
// Methods (from what we see in the component):
// addEmployee(data): Adds a new employee 
// updateEmployee(id, data): To update details of an existing employee
// getEmployeeList(): Fetches the list of employees from the backend.
// deleteEmployee(id): Deletes a specific employee based on their ID.
