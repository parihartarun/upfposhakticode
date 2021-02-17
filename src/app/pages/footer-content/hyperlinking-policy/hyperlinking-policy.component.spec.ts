import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlinkingPolicyComponent } from './hyperlinking-policy.component';

describe('HyperlinkingPolicyComponent', () => {
  let component: HyperlinkingPolicyComponent;
  let fixture: ComponentFixture<HyperlinkingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperlinkingPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlinkingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
