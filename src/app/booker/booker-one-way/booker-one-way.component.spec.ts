import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookerOneWayComponent } from './booker-one-way.component';

describe('BookerOneWayComponent', () => {
  let component: BookerOneWayComponent;
  let fixture: ComponentFixture<BookerOneWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookerOneWayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookerOneWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
