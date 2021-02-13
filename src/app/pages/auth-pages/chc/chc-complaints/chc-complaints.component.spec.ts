import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChcComplaintsComponent } from './chc-complaints.component';

describe('ChcComplaintsComponent', () => {
  let component: ChcComplaintsComponent;
  let fixture: ComponentFixture<ChcComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChcComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChcComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
