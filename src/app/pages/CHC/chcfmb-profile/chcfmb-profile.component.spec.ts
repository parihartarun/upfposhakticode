import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChcfmbProfileComponent } from './chcfmb-profile.component';

describe('ChcfmbProfileComponent', () => {
  let component: ChcfmbProfileComponent;
  let fixture: ComponentFixture<ChcfmbProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChcfmbProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChcfmbProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
