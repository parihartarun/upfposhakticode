import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFpoComponent } from './my-fpo.component';

describe('MyFpoComponent', () => {
  let component: MyFpoComponent;
  let fixture: ComponentFixture<MyFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
