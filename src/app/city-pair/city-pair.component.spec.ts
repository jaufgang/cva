import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPairComponent } from './city-pair.component';

describe('CityPairComponent', () => {
  let component: CityPairComponent;
  let fixture: ComponentFixture<CityPairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityPairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
