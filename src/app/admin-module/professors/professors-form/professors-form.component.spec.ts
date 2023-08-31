import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsFormComponent } from './professors-form.component';

describe('ProfessorsFormComponent', () => {
  let component: ProfessorsFormComponent;
  let fixture: ComponentFixture<ProfessorsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorsFormComponent]
    });
    fixture = TestBed.createComponent(ProfessorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
