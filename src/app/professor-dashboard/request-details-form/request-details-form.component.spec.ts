import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsFormComponent } from './request-details-form.component';

describe('RequestDetailsFormComponent', () => {
  let component: RequestDetailsFormComponent;
  let fixture: ComponentFixture<RequestDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDetailsFormComponent]
    });
    fixture = TestBed.createComponent(RequestDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
