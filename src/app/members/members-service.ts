import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PageResponse, Visitor } from '../interfaces/visitors.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private baseUrl = 'http://localhost:8080/api/users?page=0&size=500';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService // inject toastr
  ) {}

  /** Get all visitors */
  getVisitors(): Observable<PageResponse<Visitor>> {
    return this.http.get<PageResponse<Visitor>>(this.baseUrl)
      .pipe(catchError(err => this.handleError(err)));
  }

  /** Get attended visitors */
  getAttendedVisitors(): Observable<PageResponse<Visitor>> {
    return this.http.get<PageResponse<Visitor>>(
      'http://localhost:8080/api/users-attendance/list?page=0&size=500'
    ).pipe(catchError(err => this.handleError(err)));
  }

  /** Delete a visitor */
deleteVisitor(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
    tap(res => {
      if (res?.message) {
        this.toastr.success(res.message, 'Success');
      }
    }),
    catchError(err => this.handleError(err))
  );
}


  /** Add visitor */
addVisitor(visitor: any): Observable<any> {
  return this.http.post<any>('http://localhost:8080/api/users/create', visitor).pipe(
    tap(res => {
      if (res?.message) {
        this.toastr.success(res.message, 'Success');
      }
    }),
    catchError(err => this.handleError(err))
  );
}


  /** Update visitor */
updateVisitor(visitor: any): Observable<any> {
  return this.http.patch<any>('http://localhost:8080/api/users/update-user', visitor).pipe(
    tap(res => {
      if (res?.message) {
        this.toastr.success(res.message, 'Success');
      }
    }),
    catchError(err => this.handleError(err))
  );
}


  /** Get visitor by registrationId */
  getVisitorById(registrationId: string): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.baseUrl.replace('?page=0&size=500','')}/${registrationId}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  /** Approve visitor */
approveVisitor(req: any): Observable<any> {
  return this.http.get<any>('http://localhost:8080/api/users/attendance/'+ req).pipe(
    tap((res:any) => {
      if (res?.message) {
        this.toastr.success('Attendance Marked Successfully', 'Success');
      }
    }),
    catchError(err => this.handleError(err))
  );
}


  /** Centralized error handler + Toastr */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occurred';

    if (error.error?.message) {
      message = error.error.message; // backend message
    } else if (error.status === 404) {
      message = 'Resource not found';
    } else if (error.status === 400) {
      message = 'Bad request';
    } else if (error.status === 500) {
      message = 'Server error';
    }

    // Show toast automatically
    this.toastr.error(message, 'Error');
    return throwError(() => new Error(message));
  }
}
