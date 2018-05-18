import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  onSearchData: string;
  searchForm: FormGroup;
  startDate: any;
  endDate: any;
  customerData: any;
  filteredData: any;
  @Input()
  searchCustomerData: any;
  @Output()
  selectedDate: EventEmitter<string> = new EventEmitter<string>()

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.customerService.getCustomerData().subscribe(data =>{
      this.customerData = data;
      this.filteredData = this.customerData;
    })
    this.searchForm = this.fb.group({
      startValue: ['', Validators.required],
      endValue: ['', Validators.required]
    })
  }
  searchCustomerByDate(){
    this.startDate = this.searchForm.controls['startValue'].value;
    this.endDate = this.searchForm.controls['endValue'].value;
    this.filteredData = this.customerData.filter(e => {
      return (e.DueDate <= this.endDate) && (e.DueDate >= this.startDate);
   });
    this.selectedDate.emit(this.filteredData); 
  }

}
