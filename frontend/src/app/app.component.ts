import { Component } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  tasks:any[]=[]
  


  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;

    });
  }

  exportToCSV() {
    const csvData = this.convertTasksToCSV(this.tasks);
    this.downloadCSVFile(csvData, 'tasks.csv');
   

    
  }

  convertTasksToCSV(tasks: Task[]): string {
    // Convert tasks to CSV format
    console.log(tasks)
    const header = 'Title,Description,Due Date,Priority,Status\n';
    const rows = tasks.map(task => `${task.title},${task.description},${task.dueDate},${task.priority},${task.status}`);
    return header + rows.join('\n');
  }

  downloadCSVFile(csvData: string, filename: string) {
    // Create an anchor element and set its attributes to trigger the file download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    // Add the element to the document and click it to initiate the download
    document.body.appendChild(element);
    element.click();

    // Clean up by removing the element from the document
    document.body.removeChild(element);

  }



  
}
