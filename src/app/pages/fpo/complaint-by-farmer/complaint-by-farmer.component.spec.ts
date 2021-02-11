import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintByFarmerComponent } from './complaint-by-farmer.component';

describe('ComplaintByFarmerComponent', () => {
  let component: ComplaintByFarmerComponent;
  let fixture: ComponentFixture<ComplaintByFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintByFarmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintByFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
