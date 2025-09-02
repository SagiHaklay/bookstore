import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../../../core/models/book.model';
import { BookData } from '../../../../core/models/book-data.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  @Input() productToEdit: Book | null = null;
  @Output() productSubmit = new EventEmitter<BookData>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      bookName: this.fb.control(this.productToEdit?.name || '', [Validators.required]),
      author: this.fb.control(this.productToEdit?.author || '', [Validators.required]),
      publisher: this.fb.control(this.productToEdit?.publisher || '', []),
      price: this.fb.control(this.productToEdit?.price || 0, [Validators.required, Validators.min(0)]),
      discount: this.fb.control(this.productToEdit?.discount || 0, [Validators.min(0), Validators.max(100)])
    });
  }
  getPriceErrorMessage() {
    const errors = this.productForm.get('price')?.errors;
    if (errors && errors['required']) {
      return 'Price required!';
    }
    if (errors && errors['min']) {
      return 'Price cannot be negative!';
    }
    return 'Invalid price';
  }
  onFormSubmit() {
    const submitProduct: BookData = {
      name: this.productForm.get('bookName')?.value || '',
      author: this.productForm.get('author')?.value || '',
      publisher: this.productForm.get('publisher')?.value || undefined,
      price: this.productForm.get('price')?.value || 0,
      discount: this.productForm.get('discount')?.value || undefined,
    };
    this.productSubmit.emit(submitProduct);
  }

}
