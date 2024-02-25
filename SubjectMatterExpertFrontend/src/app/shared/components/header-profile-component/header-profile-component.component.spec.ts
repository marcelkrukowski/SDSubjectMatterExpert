import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProfileComponentComponent} from './header-profile-component.component';

describe('HeaderProfileComponentComponent', () => {
  let component: HeaderProfileComponentComponent;
  let fixture: ComponentFixture<HeaderProfileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderProfileComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
