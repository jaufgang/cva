import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookerReturnComponent } from './booker-return.component';

describe('BookerReturnComponent', () => {
  let component: BookerReturnComponent;
  let fixture: ComponentFixture<BookerReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookerReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookerReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
