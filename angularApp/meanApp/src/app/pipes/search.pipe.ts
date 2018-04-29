import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class SearchPipe implements PipeTransform {

  transform(rowData: any, searchText: string, searchJob: string): any {
    
    //Check if array is null
    if(!rowData) return [];
   //Check if input is null
    if(!searchText) return rowData;
     return rowData.filter(function(item) {
      return item.CustomerName.toLowerCase().includes(searchText.toLowerCase());
     });
    }
  }
