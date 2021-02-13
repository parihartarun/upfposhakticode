import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerNotifictionByFpoComponent } from './farmer-notifiction-by-fpo.component';

describe('FarmerNotifictionByFpoComponent', () => {
  let component: FarmerNotifictionByFpoComponent;
  let fixture: ComponentFixture<FarmerNotifictionByFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerNotifictionByFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerNotifictionByFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
