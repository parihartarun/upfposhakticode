import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSupperComplaintsComponent } from './input-supper-complaints.component';

describe('InputSupperComplaintsComponent', () => {
  let component: InputSupperComplaintsComponent;
  let fixture: ComponentFixture<InputSupperComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSupperComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSupperComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
