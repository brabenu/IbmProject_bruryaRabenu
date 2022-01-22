import { Injectable } from '@angular/core';
 import { HttpClient }   from '@angular/common/http';
 
 import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public getJSON(): Observable<any> {
    return this.http.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo");
}
  constructor(private http: HttpClient) {
            // this.getJSON().subscribe(data => {
            //     console.log(data);
            // });
        }
           
}
