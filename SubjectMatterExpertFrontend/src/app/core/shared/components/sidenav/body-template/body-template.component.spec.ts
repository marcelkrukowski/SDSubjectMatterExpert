import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTemplateComponent } from './body-template.component';

describe('BodyTemplateComponent', () => {
  let component: BodyTemplateComponent;
  let fixture: ComponentFixture<BodyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
