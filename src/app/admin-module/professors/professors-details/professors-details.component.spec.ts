import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsDetailsComponent } from './professors-details.component';

describe('ProfessorsDetailsComponent', () => {
  let component: ProfessorsDetailsComponent;
  let fixture: ComponentFixture<ProfessorsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorsDetailsComponent]
    });
    fixture = TestBed.createComponent(ProfessorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
