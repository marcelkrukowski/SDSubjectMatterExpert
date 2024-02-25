import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../services/api.service';

export interface SMESubjects{
  topic: string;
  count: number;
}

export interface SMEContacted{
  userName: string;
  count: number;
}

@Component({
  selector: 'app-learning-and-development',
  templateUrl: './learning-and-development.component.html',
  styleUrl: './learning-and-development.component.scss'
})

export class LearningAndDevelopmentComponent {
  smeBarChartOptions : any;
  subjectBarChart2Options : any;
  highcharts : typeof Highcharts = Highcharts;
  SMESubjects : SMESubjects[]=[];
  SMEContacted: SMEContacted[]=[];
  subjects : string[]=[];
  subjectCounts : number[]=[];
  username : string[]=[];
  smeCounts: number[]=[];

  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit():void{
    this.getMostContactedAreas();
    this.getMostContactedSme();
  }

  getMostContactedAreas(){
    this.apiService.request('mostContactedAreas', 'get')
    .subscribe((result: {topic:string, count:number}[] | any) => {
      console.log("Most Contacted Areas: ", result);
      this.SMESubjects=result;
      this.subjects = this.SMESubjects.map(entry => entry.topic);
      this.subjectCounts = this.SMESubjects.map(entry => entry.count);
      console.log("Subjects: ", this.subjects);
      console.log("Counts: ", this.subjectCounts);
  
      this.smeBarChart(); 
    });
  }

  getMostContactedSme(){
    this.apiService.request('mostContactedSME', 'get')
    .subscribe((result: {userName:string, count:number}[] | any) => {
      console.log("Most Contacted Sme: ", result);
      this.SMEContacted=result;
      this.username = this.SMEContacted.map(entry => entry.userName);
      this.smeCounts = this.SMEContacted.map(entry => entry.count);
      console.log("Username: ", this.username);
      console.log("Counts: ", this.smeCounts);

      this.subjectBarChart();
    })
  }

  //Bar Chart for topics in which SME's has been most contacted
  smeBarChart(){

    this.smeBarChartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Subjects in which SMEs has been most contacted'
      },
      xAxis: {
        categories : this.subjects, //topics
      },
      credits:{
        enabled : false, //disable watermark
      },
      yAxis: {
        title: {
          text: 'Subject Counts'
        }
      },
      colors: ['#e94e0f'],
      series: [{
        name: 'Number of persons who contacted SME for this subject',
        
        data : this.subjectCounts,
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

  //Bar Chart for the SME's who has been most contacted!"
  subjectBarChart(){
    this.subjectBarChart2Options = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Most Contacted SME'
      },
      xAxis: {
        categories : this.username, //SME Name
      },
      credits:{
        enabled : false, //disable watermark
      },
      yAxis: {
        title: {
          text: 'SME Counts'
        }
      },
      colors: ['#e94e0f'],
      series: [{
        name: 'Number of persons who contacted this SME',
        
        data: this.smeCounts,
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
  exportCsv(): void {
    let csv = 'Subjects,Count of Subjects,Most Contacted SME,Number of person who contacted SME\n';

    for (let i = 0; i < this.subjects.length; i++) {
        const subject = this.subjects[i] || ''; 
        const subjectCount = this.subjectCounts[i] !== undefined ? this.subjectCounts[i] : ''; 
        const username = this.username[i] || '';
        const areaCount = this.smeCounts[i] !== undefined ? this.smeCounts[i] : ''; 

        csv += `${subject},${subjectCount},${username},${areaCount}\n`;
    }

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'data.csv';
    hiddenElement.click();
}
}


