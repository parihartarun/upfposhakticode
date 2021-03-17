import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChcfmbDetailsComponent } from './chcfmb-details.component';

describe('ChcfmbDetailsComponent', () => {
  let component: ChcfmbDetailsComponent;
  let fixture: ComponentFixture<ChcfmbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChcfmbDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChcfmbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
