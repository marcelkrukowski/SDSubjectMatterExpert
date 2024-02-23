import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFirstPageComponent } from './register-first-page.component';

describe('FirstPageComponent', () => {
  let component: RegisterFirstPageComponent;
  let fixture: ComponentFixture<RegisterFirstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFirstPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
