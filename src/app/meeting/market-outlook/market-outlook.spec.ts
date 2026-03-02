import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketOutlook } from './market-outlook';

describe('MarketOutlook', () => {
  let component: MarketOutlook;
  let fixture: ComponentFixture<MarketOutlook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketOutlook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketOutlook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
