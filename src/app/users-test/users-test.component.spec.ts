import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTestComponent } from './users-test.component';

describe('UsersTestComponent', () => {
  let component: UsersTestComponent;
  let fixture: ComponentFixture<UsersTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersTestComponent]
    });
    fixture = TestBed.createComponent(UsersTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
