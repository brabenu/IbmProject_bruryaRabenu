import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {DataServiceService} from './data-service.service';
import { Ibm } from './Ibm';
import { DatePipe } from '@angular/common';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderByPrice} from './OrderByPrice';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 dataSource//משתנה המכיל את המידע הנדרש לתצוגת הטבלה
 allIbm=new Array<Ibm>();//מערך של כל המחירים +התאריך עבור כל יום
  displayedColumns: string[] = ['Date', 'OpenPrice', 'MaxPrice', 'MinPrice',
  'ClosurePrice','diffrent'];//כותרות הטבלה
@ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;//עבור יכולת הדפדוף

details
data//
selected
sum
buyDate
saleDate
selectOrderBy:OrderByPrice[]=[
  {value:'OpenPrice', viewValue: 'Open Price'},
  {value: 'MaxPrice', viewValue: ' Max Price '},
  {value: 'MinPrice', viewValue: 'Min Price'},
  {value: 'ClousePrice', viewValue: 'Closure Price'},
  {value: 'Difference', viewValue: 'The Diffrent'},

]
constructor(private dataService:DataServiceService,private datePipe: DatePipe){}  




ngOnInit(){

  

  
       this.dataService.getJSON().subscribe(data => {
         this.data={...data['Time Series (Daily)']};

    this.allIbm = Object.keys(this.data).map(key => {
     let keysOfValues= Object.keys(this.data[key])
      
        let ibm =new Ibm(this.datePipe.transform(new Date(key),"yyyy-MM-dd"),this.data[key][keysOfValues[0]],
        this.data[key][keysOfValues[3]],this.data[key][keysOfValues[1]],
        this.data[key][keysOfValues[2]]);

        return ibm;
    });
    console.log(this.allIbm[0]);
    this.dataSource = new MatTableDataSource<Ibm>(this.allIbm);
console.log(this.dataSource);
this.dataSource.paginator = this.paginator;
 this.collacateBuyAndSale(0,1,-1000,"0000-00-00","0000-00-00");

 this.dataSource.filterPredicate = (data: Ibm, filter: string) => {
   if(filter.length<10)
  return data.Date.includes(filter) ;
  else
  return data.Date == filter;

 };
       },err=>{console.log(err);})
   
    
  }
  onSelectPrice(select){
    
    function compare( a, b, ) {
      
      if ( a[select] < b[select] ){
        return -1;
      }
      if ( a[select] > b[select] ){
        return 1;
      }
      return 0;
    }
    
    this.allIbm.sort( compare );
    this.dataSource = new MatTableDataSource<Ibm>(this.allIbm);
    this.dataSource.paginator = this.paginator;
    this.collacateBuyAndSaleWithoutDate(0,1,-1000,'0000-00-00','0000-00-00');
  }
  collacateBuyAndSale(i:number,j:number,sum:number,buy:String,sale:String){
     if(i==this.allIbm.length-1)
     {
       this.buyDate=buy;
       this.saleDate=sale;
       this.sum=Math.round((sum + Number.EPSILON) * 100) / 100;

      return;

     }
     
     
     if(this.allIbm[j].Avg-this.allIbm[i].Avg>sum){
       
        sum=this.allIbm[j].Avg-this.allIbm[i].Avg;
        buy=this.allIbm[i].Date;
        sale=this.allIbm[j].Date;
     }
         if(j==this.allIbm.length-1)
       this.collacateBuyAndSale(i+1,i+2,sum,buy,sale);
       else
       this.collacateBuyAndSale(i,j+1,sum,buy,sale);

  }

  collacateBuyAndSaleWithoutDate(i:number,j:number,sum:number,buy:String,sale:String){
    if(i==this.allIbm.length-1&&j==this.allIbm.length-1)
    {
      this.buyDate=buy;
      this.saleDate=sale;
      this.sum=Math.round((sum + Number.EPSILON) * 100) / 100;

     return;

    }
    if(i!=j){
    let b=new Date(this.allIbm[i].Date);
    let s=new Date(this.allIbm[j].Date);
    if(this.allIbm[j].Avg-this.allIbm[i].Avg>sum&&s>b){
      
       sum=this.allIbm[j].Avg-this.allIbm[i].Avg;
       buy=this.allIbm[i].Date;
       sale=this.allIbm[j].Date;
    }
  }
        if(j==this.allIbm.length-1)
      this.collacateBuyAndSale(i+1,0,sum,buy,sale);
      else
      this.collacateBuyAndSale(i,j+1,sum,buy,sale);

 }
reverceArr(){
  for(let i=0; i<20;i++){
    let arrDeleate= this.allIbm.splice(i, 2);
 this.allIbm.splice(0, 0,arrDeleate[0],arrDeleate[1]);
  
  }
 
  
  this.dataSource = new MatTableDataSource<Ibm>(this.allIbm);
  this.dataSource.paginator = this.paginator;
  this.collacateBuyAndSaleWithoutDate(0,1,-1000,'0000-00-00','0000-00-00');

}
applyFilter(filterValue: string) {

  this.dataSource.filter = filterValue;
  
}
 
}


