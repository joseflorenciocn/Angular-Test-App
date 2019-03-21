import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  dataSub: any;
  data: any;
  numberNotDone: any;
  modal = {
    name: 'Nothing Selected',
    priority: 'No Priority',
    dueDate: 'No Date',
    issueBy: 'Donna',
    isDone: false
  };

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.subscribeToDataService();
    this.dataService.initializeUserLogged();
    this.numberNotDone = this.checkNumberNotDone();
  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

  subscribeToDataService() {
    this.dataSub = this.dataService.getUserData()
      .subscribe(response => {
        this.data = response;
    });
  }

  setModal(task) {
    this.modal = task;
  }

  taskToBeDone(task) {
    const toggleIsDone = element => {
      if (task.name === element.name) {
        element.isDone = !element.isDone;
      }

      return element;
    };

    this.data.tasks.map(toggleIsDone);
    this.numberNotDone = this.checkNumberNotDone();
  }

  checkNumberNotDone(): number {
    let numberNotDone = 0;
    const incrementNotDone = element => {
      if (element.isDone !== true) {
        numberNotDone++;
      }
    };

    this.data.tasks.forEach(incrementNotDone);

    return numberNotDone;
  }
}
