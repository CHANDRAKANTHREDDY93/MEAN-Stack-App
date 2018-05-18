//imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms'; 

//component imports
import { AppComponent } from './app.component';
import { CustomerdataComponent } from './customerdata/customerdata.component';
import { CustomerService } from './customer.service';
import { HeaderComponent } from './header/header.component';

//Custom pipes
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CustomerdataComponent,
    SearchPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AgGridModule.withComponents([]), 
    ReactiveFormsModule
    ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
