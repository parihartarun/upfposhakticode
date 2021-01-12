import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandDetailsComponent } from './land-details.component';

describe('LandDetailsComponent', () => {
  let component: LandDetailsComponent;
  let fixture: ComponentFixture<LandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
