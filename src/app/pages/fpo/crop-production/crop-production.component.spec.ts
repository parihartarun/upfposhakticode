import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropProductionComponent } from './crop-production.component';

describe('CropProductionComponent', () => {
  let component: CropProductionComponent;
  let fixture: ComponentFixture<CropProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
