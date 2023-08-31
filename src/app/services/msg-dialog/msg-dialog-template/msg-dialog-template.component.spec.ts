import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MsgDialogTemplateComponent } from './msg-dialog-template.component';

describe('MsgDialogTemplateComponent', () => {
  let component: MsgDialogTemplateComponent;
  let fixture: ComponentFixture<MsgDialogTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgDialogTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgDialogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
