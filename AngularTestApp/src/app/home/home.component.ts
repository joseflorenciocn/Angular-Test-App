import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  dataSub: any;
  users: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.configForm();
    this.subscribeToFullData();
    this.dataService.initializeData();
  }

  subscribeToFullData() {
    this.dataSub = this.dataService.getFullData()
      .subscribe(response => {
        this.users = response;
    });
  }

  configForm() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  signIn() {
    const checkUser = () => {
      const userFound = this.users.filter(user => user.username === this.form.value.username);
      const checkPassword = () => {
        return userFound[0].password === this.form.value.password
          ? true
          : false;
      };

      return userFound[0] === undefined
        ? false
        : checkPassword();
    };

    this.dataService.setUserData(this.form.value.username);

    checkUser()
      ? this.router.navigate(['tasks'])
      : alert('Invalid credentials');
  }
}
