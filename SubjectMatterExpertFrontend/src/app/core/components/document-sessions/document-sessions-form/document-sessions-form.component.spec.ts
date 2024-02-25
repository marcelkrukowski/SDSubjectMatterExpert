import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSessionsFormComponent } from './document-sessions-form.component';

describe('DocumentSessionsFormComponent', () => {
  let component: DocumentSessionsFormComponent;
  let fixture: ComponentFixture<DocumentSessionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSessionsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentSessionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
