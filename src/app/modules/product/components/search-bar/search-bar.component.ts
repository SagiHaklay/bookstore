import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  @Input() initialQuary: string = '';
  searchForm!: FormGroup;
  @Output() searchSubmit = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: this.fb.control(this.initialQuary, [Validators.required])
    });
  }
  onSearch() {
    const query = this.searchForm.get('query')?.value || '';
    // console.log(query);
    this.searchSubmit.emit(query);
  }
}
