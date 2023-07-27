import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { tap ,catchError} from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  newTask: any = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'to-do'
  };
  isAlertVisible = false;
  

  constructor(private taskService: TaskService,private router: Router) { }

  ngOnInit() {



  
  }

  onSubmit() {
    // Implement form submission and add task to the backend here
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
    const dueDate = (document.getElementById('dueDate') as HTMLInputElement).value;
    const priority = (document.getElementById('priority') as HTMLSelectElement).value;
    const status = (document.getElementById('status') as HTMLSelectElement).value;

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      status
    };
    this.isAlertVisible = true;
       
       

    if (this.newTask && this.newTask.title && this.newTask.description && this.newTask.dueDate) {
      this.taskService.addTask(this.newTask).pipe(
        tap((response) => {
          console.log('New task added:', response);
          this.isAlertVisible=true

          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 1000);
          // Optionally, you can redirect to the task list page or show a success message
        }),
        catchError((error) => {
          console.error('Error adding task:', error);
          // Handle the error or show an error message to the user
          // Return an empty observable to suppress the deprecation warning
          return [];
        })
      ).subscribe();
    }
    else{
      alert("Enter all fields")
    }
  }
   
  }


