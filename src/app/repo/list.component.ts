import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RepoService } from '../services/repo.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-repos',
  templateUrl: './list.component.html'
})
export class RepoListComponent implements OnInit {

  repos = [];
  count = 0;
  isLoading = true;

  constructor(private repoService: RepoService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) { }

  ngOnInit() {
    console.log('getting repos......');
    this.getRepos();
  }

  getRepos() {
    this.repoService.getLastSevenDays().subscribe(
      data => this.repos = data,
      error => console.log(error),
      () => this.isLoading = false
    );
    this.repoService.getToday().subscribe(
      data => this.count = data.count,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  encodeURIComponent(url) {
    return encodeURIComponent(url);
    // return encodeURI(url);
  }
}
