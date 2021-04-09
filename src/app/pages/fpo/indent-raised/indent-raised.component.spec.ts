import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentRaisedComponent } from './indent-raised.component';

describe('IndentRaisedComponent', () => {
  let component: IndentRaisedComponent;
  let fixture: ComponentFixture<IndentRaisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentRaisedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentRaisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
