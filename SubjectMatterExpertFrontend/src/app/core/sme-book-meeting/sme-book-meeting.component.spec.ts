import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeBookMeetingComponent } from './sme-book-meeting.component';

describe('SmeBookMeetingComponent', () => {
  let component: SmeBookMeetingComponent;
  let fixture: ComponentFixture<SmeBookMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeBookMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmeBookMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
