import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: Task = {
    _id:"",
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'to-do'
  };
  taskId: string | null = null;
  isAlert=false;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    console.log(taskId)
    if (taskId) {
      this.task._id = taskId;
    


    } else {
      console.log('Task ID is undefined');
    }
     console.log(history.state.task)
    this.task = history.state.task; // Fetch the task object from the state
    if (!this.task) {
      this.router.navigate(['/tasks']);
    }



  }


  onSubmit() {
    if (this.task) {
      console.log(this.task)
      this.taskService.updateTask(this.task).subscribe(() => {
        console.log('Task updated successfully:', this.task);
  this.isAlert=true;

        setTimeout(() => {
          this.router.navigate(['/tasks'])
        }, 1000);
      });
    } else {
      console.error('Error updating task:');

    }
  }
}


