import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private apiUrl = 'https://localhost:44395/api';

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/Customer/GetAllCustomers`);
    }
    getById(id: string): Observable<CustomerModel> {
        return this.http.get<CustomerModel>(`${this.apiUrl}/Customer/GetCustomerById/${id}`);
    }
    create(customer: CustomerModel): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/Customer/CreateCustomer`, customer);
    }
    update(customer: CustomerModel): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/Customer/UpdateCustomer?id=${customer.customerId}`, customer);
    }
    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/Customer/DeleteCustomer/${id}`);
    }
}
