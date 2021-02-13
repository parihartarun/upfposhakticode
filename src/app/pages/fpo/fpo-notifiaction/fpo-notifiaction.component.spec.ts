import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoNotifiactionComponent } from './fpo-notifiaction.component';

describe('FpoNotifiactionComponent', () => {
  let component: FpoNotifiactionComponent;
  let fixture: ComponentFixture<FpoNotifiactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpoNotifiactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoNotifiactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
