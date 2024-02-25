import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentSessionsFormComponent } from './edit-document-sessions-form.component';

describe('EditDocumentSessionsFormComponent', () => {
  let component: EditDocumentSessionsFormComponent;
  let fixture: ComponentFixture<EditDocumentSessionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDocumentSessionsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDocumentSessionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
