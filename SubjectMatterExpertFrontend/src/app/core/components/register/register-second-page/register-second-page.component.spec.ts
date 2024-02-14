import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSecondPageComponent } from './register-second-page.component';

describe('SecondPageComponent', () => {
  let component: RegisterSecondPageComponent;
  let fixture: ComponentFixture<RegisterSecondPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSecondPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSecondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
