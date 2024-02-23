import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPictureTemplateComponent } from './edit-picture-template.component';

describe('EditPictureTemplateComponent', () => {
  let component: EditPictureTemplateComponent;
  let fixture: ComponentFixture<EditPictureTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPictureTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPictureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
