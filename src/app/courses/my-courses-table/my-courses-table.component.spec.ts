import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesTableComponent } from './my-courses-table.component';

describe('MyCoursesTableComponent', () => {
  let component: MyCoursesTableComponent;
  let fixture: ComponentFixture<MyCoursesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCoursesTableComponent]
    });
    fixture = TestBed.createComponent(MyCoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
