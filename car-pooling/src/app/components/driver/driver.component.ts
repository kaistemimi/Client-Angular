import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import {Router} from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RideService } from 'src/app/services/ride.service';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  
  driver: any;
  car:any;
  rides: any[];
  validatingForm: FormGroup;
  headElements = ['Departure', 'Destination','Date', 'Time', 'Seats','Passengers', 'Status'];
  now = Date.now() / 1000 / 3600;
  constructor(private tokenStorageService: TokenStorageService, private router : Router, private rideService: RideService,
              private driverService: DriverService
    ) { }

  ngOnInit(): void {
    this.driver = this.tokenStorageService.getUser();
    // console.log(this.driver)
    this.driverService.getOneCar(this.driver.id).subscribe((car:any) => { 
      if(!car)this.router.navigate(['car'])
      this.car= car})
    this.rideService.getDriverRides(this.driver.id).subscribe((rides: any[]) => {
      for(let i = 0; i < rides.length; i++) {
        let time = rides[i].time.split(':').reduce((acc,time) => (60 * acc) + +time);
        rides[i].Date = ((Date.parse(rides[i].date) / 1000) + time) / 3600;
      }
      console.log(rides)
      this.rides = rides
    
    })
    
    this.validatingForm = new FormGroup({
      departure: new FormControl('', [Validators.required, Validators.minLength(3)]),
      destination: new FormControl('', [Validators.required, Validators.minLength(3)]),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      seats: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });

  }

  get departure() {
    return this.validatingForm.get('departure');
  }

  get destination() {
    return this.validatingForm.get('destination');
  }

  get date() {
    return this.validatingForm.get('date');
  }

  get time() {
    return this.validatingForm.get('time');
  }
  get seats() {
    return this.validatingForm.get('seats');
  }

  get price() {
    return this.validatingForm.get('price');
  }

  addRide() {
    this.validatingForm.value.driverId = this.driver.id;
    console.log(this.validatingForm.value);
    this.rideService.addRide(this.validatingForm.value).subscribe(ride => {console.log(ride);})
    this.router.navigate(['driver/profile'])
  }

  giveFeedback(rideId) {
    this.router.navigate([`driver/feedback/${rideId}`]);
  }

}
