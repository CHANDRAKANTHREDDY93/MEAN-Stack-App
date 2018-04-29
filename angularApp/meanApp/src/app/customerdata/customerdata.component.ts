import { Component, OnInit } from '@angular/core';
import {  CustomerService } from '../customer.service';
import { GridOptions} from 'ag-grid/main';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';

@Component({
  selector: 'app-customerdata',
  templateUrl: './customerdata.component.html',
  styleUrls: ['./customerdata.component.css']
})
export class CustomerdataComponent implements OnInit{


  customerData: any;
  filteredData: any;
  searchText: any;
  private gridOptions: GridOptions;
  columnDefs: any=[];
  rowData: any=[];
  searchForm: FormGroup;
  startDate: any;
  endDate: any;
  constructor(private customerService : CustomerService, private fb: FormBuilder) {
    this.customerService.getCustomerData().subscribe(data =>{
      this.customerData = data;
      this.filteredData = this.customerData;
      this.rowData = this.filteredData;
    });
   }
  ngOnInit() {
    this.gridOptions = <GridOptions>{headerHeight: 50};
    this.columnDefs = [
      {
        headerName: "TN (Receiver ID)",
        field: "TN",
        width:150,
      },
      {
        headerName: "Customer Name",
        field: "CustomerName",
        width:150
      },
      {
        headerName: "Job ID",
        field: "JobID",
        width:100
      },
      {
        headerName: "Correlation ID",
        field: "CorrelationID",
        width:120
      },
      {
        headerName: "Task Type",
        field: "TaskType",
        width:120
      },
      {
          headerName: "Task Status",
          field: "TaskStatus",
          width:150
      },
      {
        headerName: "Due Date",
        field: "DueDate",
        width:120
      },
      {
        headerName: "Miss Commit",
        field: "MissCommit",
        width:100
      },
      {
        headerName: "State",
        field: "State",
        width:100
      },
      {
        headerName: "Primary Contact Num",
        field: "PrimaryContactNum",
        width:150
      },
      {
        headerName: "Notification Sent",
        field: "NotificationSent",
        width:100
      },
      {
        headerName: "Return Message",
        field: "ReturnMessage",
        width:100
      },
    ];
   this.gridOptions.getRowHeight = function(params){
    if (params.node.floating) {
      return 50;
      } else {
      return 80;
      }
   }
    this.gridOptions.rowStyle = {background: 'white'};
    this.gridOptions.rowClass = 'directory-class';
    this.gridOptions.getRowStyle = function(params) {
      if (params.node.rowIndex % 2 != 0) {
        return { background : '#e3e3e3' }
     }
    }
    this.searchForm = this.fb.group({
      startValue: ['', Validators.required],
      endValue: ['', Validators.required]
    })

  }
  searchData(){
    this.rowData = [];
    this.startDate = this.searchForm.controls['startValue'].value;
    this.endDate = this.searchForm.controls['endValue'].value;
    this.filteredData = this.customerData.filter(e => {
       return (e.DueDate <= this.endDate) && (e.DueDate >= this.startDate);
    })
    this.rowData = this.filteredData;
  }
}
