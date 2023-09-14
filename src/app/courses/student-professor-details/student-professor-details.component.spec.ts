import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfessorDetailsComponent } from './student-professor-details.component';

describe('StudentProfessorDetailsComponent', () => {
  let component: StudentProfessorDetailsComponent;
  let fixture: ComponentFixture<StudentProfessorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProfessorDetailsComponent]
    });
    fixture = TestBed.createComponent(StudentProfessorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
