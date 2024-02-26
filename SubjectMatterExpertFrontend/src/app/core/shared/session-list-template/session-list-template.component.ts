import { Component, Input } from '@angular/core';

@Component({
  selector: 'sdw-card-list-template',
  templateUrl: './session-list-template.component.html',
  styleUrl: './session-list-template.component.scss'
})
export class SessionListTemplateComponent {
  @Input() list : any [] = [];
  @Input() entity : string = '';
  storageService: any

  getUniqueTraineeNames(trainees: any[]): string[] {
    const uniqueNames: string[] = [];
    
    for (const trainee of trainees) {
      const fullName = `${trainee.firstName} ${trainee.lastName}`;
      if (!uniqueNames.includes(fullName)) {
        uniqueNames.push(fullName);
      }
    }

    return uniqueNames;}

    exportCsv(selectedId: string): void {
      let csv = 'Session Id,Trainees,Topic,Sub-Topic,Description\n';
  
      const selectedItem = this.list.find(item => item.id === selectedId);
  
      if (selectedItem) {
          const sessionId = selectedItem.id || '';

          const uniqueTraineesSet = new Set();
  
          if (selectedItem.colleagues) {
              selectedItem.colleagues.forEach((trainee: { firstName: any; lastName: any; }) => {
                  const fullName = `${trainee.firstName} ${trainee.lastName}`;
                  uniqueTraineesSet.add(fullName);
              });
          }
  
          const trainees = Array.from(uniqueTraineesSet).join(', ');
  
          const topic = selectedItem.topic || '';
          const subTopic = selectedItem.subTopic || '';
          const description = selectedItem.description || '';
  
          csv += `${sessionId},"${trainees}",${topic},${subTopic},${description}\n`;
 
          let hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'session_details.csv';
          hiddenElement.click();
      } else {
          console.error(`Session with ID ${selectedId} not found`);
      }
  }

  getUniqueTrainees(colleagues: any[]): any[] {
    const uniqueTrainees = new Set();
    
    return colleagues.filter(trainee => {
      const fullName = `${trainee.firstName} ${trainee.lastName}`;
      if (!uniqueTrainees.has(fullName)) {
        uniqueTrainees.add(fullName);
        return true;
      }
      return false;
    });
  }
}
