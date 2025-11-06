import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-box-modal',
  templateUrl: './dialog-box-modal.component.html',
  styleUrl: './dialog-box-modal.component.scss',
  standalone: false
})
export class DialogBoxModalComponent {
  @Input() message: string = '';
  @Input() isYesNo = false;
  @Output() close = new EventEmitter();
  @Output() confirm = new EventEmitter();

  onModalClose() {
    if (!this.isYesNo)
      this.close.emit();
  }
  onClickYes() {
    this.confirm.emit();
    this.close.emit();
  }
  onClickNo() {
    this.close.emit();
  }
}
