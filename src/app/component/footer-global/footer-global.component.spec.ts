import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterGlobalComponent } from './footer-global.component';

describe('FooterGlobalComponent', () => {
  let component: FooterGlobalComponent;
  let fixture: ComponentFixture<FooterGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
