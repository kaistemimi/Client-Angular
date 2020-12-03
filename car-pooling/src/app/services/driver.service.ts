import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const carUrl = 'http://localhost:3000/car/';
const DriverUrl = 'http://localhost:3000/driver/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class DriverService {

  currentDriver : any
  constructor(private http: HttpClient) { }
  
  public getCar() : Observable<any[]> {
   return  this.http.get<any[]>('http://localhost:3000/car')
     
}
public addCar(car): Observable<any> {
  return this.http.post(carUrl + 'create', {
    model: car.model,
    color : car.color,
    fuelType: car.fuelType,
    maxSeats: car.maxSeats,
    VKT: car.VKT,
    VIN: car.VIN,
    driverId: car.driverId
  }, httpOptions);
}

public getOneCar(driverId): Observable<any> {
  console.log(driverId)
  return this.http.get(carUrl + driverId , httpOptions);
}

public sendImage(driverId , data){ 
  return  this.http.put(DriverUrl + driverId, data, httpOptions);
}

public uploadImage(obj, pic): Observable<any> {
let data = pic;
return  this.http.put('http://localhost:3000/file/upload/' + obj.id, data);
}

public getDriver(driverId): Observable<any> {
  console.log(driverId)
  return this.http.get(DriverUrl + driverId , httpOptions);
}


}
