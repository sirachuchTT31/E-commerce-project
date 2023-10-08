import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuFlagComponent } from './header-menu-flag.component';

describe('HeaderMenuFlagComponent', () => {
  let component: HeaderMenuFlagComponent;
  let fixture: ComponentFixture<HeaderMenuFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMenuFlagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMenuFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
