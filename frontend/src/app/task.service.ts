import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addTask(task: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, task, { headers });
  }

  deleteTask(taskId: string): Observable<any> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.delete<any>(url);
  }



  updateTask(task: any): Observable<any> {
    const url = `${this.baseUrl}/${task._id}`;
    return this.http.put<any>(url, task);
  }

  

}
