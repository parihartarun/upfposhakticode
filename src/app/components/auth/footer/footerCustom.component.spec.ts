import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCustumComponent } from './footerCustom.component';

describe('FooterComponent', () => {
  let component: FooterCustumComponent;
  let fixture: ComponentFixture<FooterCustumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterCustumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCustumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
