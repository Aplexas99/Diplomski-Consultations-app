import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationRequestFormComponent } from './consultation-request-form.component';

describe('ConsultationRequestFormComponent', () => {
  let component: ConsultationRequestFormComponent;
  let fixture: ComponentFixture<ConsultationRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationRequestFormComponent]
    });
    fixture = TestBed.createComponent(ConsultationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
