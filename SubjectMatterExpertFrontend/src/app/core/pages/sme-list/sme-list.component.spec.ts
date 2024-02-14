import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeListComponent } from './sme-list.component';

describe('SmeListComponent', () => {
  let component: SmeListComponent;
  let fixture: ComponentFixture<SmeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
