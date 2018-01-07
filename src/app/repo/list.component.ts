import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RepoService } from '../services/repo.service';
import { ToastComponent } from '../shared/toast/toast.component';
import * as _ from 'lodash';
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
    this.getRepos();
  }

  getRepos() {
    this.repoService.getLastSevenDays().subscribe(
      data => {
        this.barChartLabels = this.mapCols(data, "date");
        this.cardDetails = this.mapCols(data, 'card');
        this.retailDetails = this.mapCols(data, 'retail');
        this.totalDetails = this.mapCols(data, 'total');
        this.barChartData = [
          {data: this.cardDetails, label: 'Card'},
          {data: this.retailDetails, label: 'Retail'},
          {data: this.totalDetails, label: 'Total'}
        ];

      },
      error => console.log(error),
      () => this.isLoading = false
    );
    this.repoService.getToday().subscribe(
      data => this.count = data.count,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  mapCols(data, col) {
    const labelList = _.map(data.sales,(item) => {
      if (col === 'date') {
        return new Date(_.get(item, col)).toISOString().split('T')[0];
      } else {
        return _.get(item, col);
      }
    }) 
    return labelList;
  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[];
  public cardDetails:string[] ; 
  public retailDetails: string[]; 
  public totalDetails: string[];

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [1,1,1,1,1,1,1], label: 'Card'},
    {data: [1,1,1,1,1,1,1], label: 'Retail'},
    {data: [1,1,1,1,1,1,1], label: 'Total'}
  ];
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public print():void {

  }
}
