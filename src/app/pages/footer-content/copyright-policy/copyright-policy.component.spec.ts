import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightPolicyComponent } from './copyright-policy.component';

describe('CopyrightPolicyComponent', () => {
  let component: CopyrightPolicyComponent;
  let fixture: ComponentFixture<CopyrightPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
