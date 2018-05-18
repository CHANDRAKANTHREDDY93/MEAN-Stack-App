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
        children:[{
          headerName: "Search",
          field: "TN",
          width:150
        }],
      },
      {
        headerName: "Customer Name",
        children:[{
        headerName: "Search",
        field: "CustomerName",
        width:150
        }],  
      },
      {
        headerName: "Job ID",
        children:[{
          headerName: "Search",
          field: "JobID",
          width:100
        }],
      },
      {
        headerName: "Correlation ID",
        children:
        [{
          headerName: "Search",
          field: "CorrelationID",
          width:120
        }],
      },
      {
        headerName: "Task Type",
        children:
        [{
          headerName: "Search",
          field: "TaskType",
          width:120
        }],
      },
      {
          headerName: "Task Status",
          children:[{
            headerName: "Search",
            field: "TaskStatus",
            width:150
          }],
      },
      {
        headerName: "Due Date",
        children:[{
        headerName: "Search",
        field: "DueDate",
        width:120
        }],
      },
      {
        headerName: "Miss Commit",
        children:[{
        headerName: "Search",
        field: "MissCommit",
        width:100
        }],
      },
      {
        headerName: "State",
        children:[{
        headerName: "Search",
        field: "State",
        width:100
        }],
      },
      {
        headerName: "Primary Contact Num",
        children: [{
        headerName: "Search",
        field: "PrimaryContactNum",
        width:150
        }],
      },
      {
        headerName: "Notification Sent",
        children:[{
        headerName: "Search", 
        field: "NotificationSent",
        width:100
        }],
      },
      {
        headerName: "Return Message",
        children:[{
        headerName: "Search",
        field: "ReturnMessage",
        width:100
        }],
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
