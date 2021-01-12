import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropShowingDetailsComponent } from './crop-showing-details.component';

describe('CropShowingDetailsComponent', () => {
  let component: CropShowingDetailsComponent;
  let fixture: ComponentFixture<CropShowingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropShowingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropShowingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
