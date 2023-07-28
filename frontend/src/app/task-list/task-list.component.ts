import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks:any[] =[];
  editTaskDetails: Task | null = null; 
  isAlertDel=false
  sortBy: string = '';

  constructor(private taskService: TaskService,private router:Router) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;

    });
  }

  onDelete(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        console.log('Task deleted successfully.');
        this.isAlertDel=true;
        setTimeout(() => {
          this.getTasks(); 
          this.isAlertDel=false
        }, 2000);
      });
    }
  }


  onEdit(task: Task) {
    this.editTaskDetails={...task};
    this.router.navigate(['/edit-task', task._id],{ state: { task } });
  }

  isFirstTaskDefined(): boolean {
    return this.tasks.length > 0 && this.tasks[0] !== undefined;
  }

  onSortChange() {
    switch (this.sortBy) {
      case 'dueDate':
        this.tasks.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
        break;
      case 'priority':
        this.tasks.sort((a, b) => (a.priority > b.priority ? 1 : -1));
        break;
      case 'status':
        this.tasks.sort((a, b) => (a.status > b.status ? 1 : -1));
        break;
      default:
        // No sorting
        break;
    }
  }


 
}
