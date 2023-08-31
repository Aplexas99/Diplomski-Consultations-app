import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsTableComponent } from './professors-table.component';

describe('ProfessorsTableComponent', () => {
  let component: ProfessorsTableComponent;
  let fixture: ComponentFixture<ProfessorsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorsTableComponent]
    });
    fixture = TestBed.createComponent(ProfessorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
