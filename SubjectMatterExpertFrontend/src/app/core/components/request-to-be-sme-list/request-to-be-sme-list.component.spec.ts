import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToBeSmeListComponent } from './request-to-be-sme-list.component';

describe('RequestToBeSmeListComponent', () => {
  let component: RequestToBeSmeListComponent;
  let fixture: ComponentFixture<RequestToBeSmeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestToBeSmeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestToBeSmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
