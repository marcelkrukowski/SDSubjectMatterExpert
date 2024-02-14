import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFinalPageComponent } from './register-final-page.component';

describe('FinalPageComponent', () => {
  let component: RegisterFinalPageComponent;
  let fixture: ComponentFixture<RegisterFinalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFinalPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFinalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
