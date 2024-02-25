import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-learning-and-development',
  templateUrl: './learning-and-development.component.html',
  styleUrl: './learning-and-development.component.scss'
})
export class LearningAndDevelopmentComponent {
  smeBarChartOptions : any;
  subjectPieChartOptions : any;
  highcharts : typeof Highcharts = Highcharts;
  smeAreas : SMEAreas[]=[];
  SMEContacted: SMEContacted[]=[];
  subjects : string[]=[];
  subjectCounts : number[]=[];
  areaCounts: number[]=[];
  username : string[]=[];
  CombinedData : CombinedData[]=[];

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
      this.smeAreas=result;
      this.subjects = this.smeAreas.map(entry => entry.topic);
      this.subjectCounts = this.smeAreas.map(entry => entry.count);
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
      this.areaCounts = this.SMEContacted.map(entry => entry.count);
      console.log("Username: ", this.username);
      console.log("Counts: ", this.areaCounts);

      this.subjectBarChart();
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
        categories : this.subjects,
        
      },
      credits:{
        enabled : false,
      },
      yAxis: {
        title: {
          text: 'Subjects'
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


  subjectBarChart(){
    this.subjectPieChartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Most Contacted SME'
      },
      xAxis: {
        categories : this.username,
        
      },
      credits:{
        enabled : false,
      },
      yAxis: {
        title: {
          text: 'Subjects'
        }
      },
      colors: ['#e94e0f'],
      series: [{
        name: 'Number of persons who contacted SME for this subject',
        
        data: this.areaCounts,
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
    let csv = 'Most Contacted Subjects,Username,Count of Subjects\n';

    for (let i = 0; i < this.subjects.length; i++) {
        csv += `${this.subjects[i]},${this.subjectCounts[i]}\n`;
    }

    // Create download link
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'data.csv';
    hiddenElement.click();
}

associateTopicsWithUsernames() {
  const combinedData: CombinedData[] = [];

  for (let i = 0; i < this.SMEContacted.length; i++) {
    const sme = this.SMEContacted[i];
    const area = this.smeAreas[i];

    combinedData.push({
      topic: area.topic,
      smeUserName: sme.userName,
      count: area.count,
    });
  }

  console.log("Combined Data:", combinedData);
}
}

export interface SMEAreas{
  topic: string;
  count: number;
}

export interface SMEContacted{
  userName: string;
  count: number;
}

export interface CombinedData {
  topic: string;
  smeUserName: string;
  count: number;
}