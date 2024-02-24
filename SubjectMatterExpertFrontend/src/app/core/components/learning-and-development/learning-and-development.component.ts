import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-learning-and-development',
  templateUrl: './learning-and-development.component.html',
  styleUrl: './learning-and-development.component.scss'
})
export class LearningAndDevelopmentComponent {
  smeBarChartOptions : any;
  subjectPieChartOptions : any;
  highcharts : typeof Highcharts = Highcharts;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ){}

  ngOnInit():void{
    this.smeBarChart();
    this.subjectBarChart();
  }

  getMostContactedSme(){
    this.apiService.request('mostContactedSME', 'get')
    .subscribe((result) => {
      console.log("Result: ", result);
    })
  }

  smeBarChart(){
    this.smeBarChartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Subjects in which SME has been most contacted!'
      },
      xAxis: {
        categories: ['Programming', 'Payroll', 'Testing', 'Salesforce', 'SAP']
      },
      yAxis: {
        title: {
          text: 'Subjects'
        }
      },
      colors: ['#e94e0f'],
      series: [{
        name: 'Number of persons who contacted SME for this subject',
        
        data: [
          30,
          40,
          20,
          10,
          50
        ]
      }] as Highcharts.SeriesOptionsType[],
      plotOptions: {
        pie: {
          animation: {
            duration: 1000,
            easing: 'easeOutBounce'
          }
        }
      }
    }
  }

  subjectBarChart(){
    this.subjectPieChartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Most Contacted SME'
      },
      series: [{
        name: 'Number of person who contacted the SME',
        data: [
          { name: 'Henish', y: 30, color: '#e94e0f' },
          { name: 'Marcel', y: 40, color: '#870b58' },
          { name: 'Filip', y: 20, color: '#e4003a' },
          { name: 'Dhananjay', y: 10, color: '#f8ad07' },
          { name: 'Koushal', y: 5, color: '#aabbcc' },
        ]
      }] as Highcharts.SeriesOptionsType[],
      plotOptions: {
        pie: {
          animation: {
            duration: 1000,
            easing: 'easeOutBounce'
          }
        }
      }
    }
  }
}
