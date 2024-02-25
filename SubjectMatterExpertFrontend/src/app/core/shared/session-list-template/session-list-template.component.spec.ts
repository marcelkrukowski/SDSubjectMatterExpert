import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListTemplateComponent } from './session-list-template.component';

describe('SessionListTemplateComponent', () => {
  let component: SessionListTemplateComponent;
  let fixture: ComponentFixture<SessionListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionListTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
