import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataServiceService} from './data-service.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { HttpClient, HttpClientModule, } from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { MatTableModule } from '@angular/material/table'  
import { MatCardModule, MatPaginatorModule } from '@angular/material';
import {MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule,MatSelectModule } 
from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,BrowserAnimationsModule,MDBBootstrapModulesPro.forRoot(),
    MatTableModule,MatPaginatorModule , MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule ,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [DataServiceService,DatePipe,MDBSpinningPreloader],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MaterialModule {};