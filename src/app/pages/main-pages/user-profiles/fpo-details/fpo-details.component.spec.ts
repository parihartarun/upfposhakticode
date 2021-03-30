import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoDetailsComponent } from './fpo-details.component';

describe('FpoDetailsComponent', () => {
  let component: FpoDetailsComponent;
  let fixture: ComponentFixture<FpoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
