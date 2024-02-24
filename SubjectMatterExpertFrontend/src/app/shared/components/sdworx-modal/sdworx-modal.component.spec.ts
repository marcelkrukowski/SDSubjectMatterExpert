import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdworxModalComponent } from './sdworx-modal.component';

describe('SdworxModalComponent', () => {
  let component: SdworxModalComponent;
  let fixture: ComponentFixture<SdworxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdworxModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SdworxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
