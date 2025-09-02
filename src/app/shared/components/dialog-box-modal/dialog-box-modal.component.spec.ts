import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxModalComponent } from './dialog-box-modal.component';

describe('DialogBoxModalComponent', () => {
  let component: DialogBoxModalComponent;
  let fixture: ComponentFixture<DialogBoxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogBoxModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
