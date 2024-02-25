import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSessionsComponent } from './document-sessions.component';

describe('DocumentSessionsComponent', () => {
  let component: DocumentSessionsComponent;
  let fixture: ComponentFixture<DocumentSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSessionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
