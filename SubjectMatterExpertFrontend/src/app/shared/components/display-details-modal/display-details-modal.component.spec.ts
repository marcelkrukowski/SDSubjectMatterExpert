import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDetailsModalComponent } from './display-details-modal.component';

describe('DisplayDetailsModalComponent', () => {
  let component: DisplayDetailsModalComponent;
  let fixture: ComponentFixture<DisplayDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
