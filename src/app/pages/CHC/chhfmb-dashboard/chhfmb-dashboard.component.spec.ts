import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChhfmbDashboardComponent } from './chhfmb-dashboard.component';

describe('ChhfmbDashboardComponent', () => {
  let component: ChhfmbDashboardComponent;
  let fixture: ComponentFixture<ChhfmbDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChhfmbDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChhfmbDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
