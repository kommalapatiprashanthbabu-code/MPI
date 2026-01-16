import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Visitor } from '../interfaces/visitors.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private baseUrl = 'http://localhost:8080/api/visitors';

  constructor(private http: HttpClient) {}

getVisitors() {
  return this.http.get<Visitor[]>('http://localhost:8080/api/visitors');
}

 deleteVisitor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(this.baseUrl, visitor);
  }

  updateVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.put<Visitor>(`${this.baseUrl}/${visitor.registrationId}`, visitor);
  }
}
