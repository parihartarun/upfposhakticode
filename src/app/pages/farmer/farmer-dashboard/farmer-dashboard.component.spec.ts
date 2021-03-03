import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDashboardComponent } from './farmer-dashboard.component';

describe('FarmerDashboardComponent', () => {
  let component: FarmerDashboardComponent;
  let fixture: ComponentFixture<FarmerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
