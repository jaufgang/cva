import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookerMultiCityComponent } from './booker-multi-city.component';

describe('BookerMultiCityComponent', () => {
  let component: BookerMultiCityComponent;
  let fixture: ComponentFixture<BookerMultiCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookerMultiCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookerMultiCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
