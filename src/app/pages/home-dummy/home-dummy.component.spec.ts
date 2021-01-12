import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDummyComponent } from './home-dummy.component';

describe('HomeDummyComponent', () => {
  let component: HomeDummyComponent;
  let fixture: ComponentFixture<HomeDummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDummyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
