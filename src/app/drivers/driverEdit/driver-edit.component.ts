import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { DriversService } from '../drivers.service'
import { DriverStorageService } from '../drivers-database.service'
import { Driver } from '../drivers.model'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: []
})
export class DriverEditComponent implements OnInit {
	driver: Driver;
	id: string
	formCurrentCar: number;
  driverForm: FormGroup;

  constructor(private dsService: DriversService,
  			  private route: ActivatedRoute,
              private router: Router,
              private dbsService: DriverStorageService) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.driver = this.dsService.getDriver(this.id);
        // this.ndForm.value = this.driver;
        this.initForm();
      }
      )
  }

  private initForm() {
    let driverName = '';
    let driverEmail = '';
    let driverStatus = '';
    let driverCars = new FormArray([]);
    let driverCurrentCar = -1;
    

	const driver = this.dsService.getDriver(this.id);

	driverName = driver.name
	driverEmail = driver.email
	driverStatus = driver.status;
	driverCurrentCar = driver.currentCar;
	if(driver['cars']) {
	for ( let car of driver.cars) {
	  driverCars.push(
	    new FormGroup({
	      'model': new FormControl(car.model, Validators.required),
	      'year': new FormControl(car.year, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
		  'brand': new FormControl(car.brand, Validators.required),
		  'color': new FormControl(car.color, Validators.required)              
	    })
	    )
	}
	}	
    

    this.driverForm = new FormGroup({
      'name': new FormControl(driverName, Validators.required),
      'email': new FormControl(driverEmail, Validators.required),
      'status': new FormControl(driverStatus, Validators.required),
      'currentCar': new FormControl(driverCurrentCar, Validators.required),
      'cars': driverCars
    });
  }

  onSubmit() {
    const name = this.driverForm.value['name'];
    const email = this.driverForm.value['email'];
    const currentCar = this.formCurrentCar;
    const status = this.driverForm.value['status'];
    const cars = this.driverForm.value['cars'];

    const newDriver = new Driver(email, name, status)
    newDriver.cars = cars;
    newDriver.currentCar = currentCar;

    this.dbsService.updateDriverNonLocation(this.id, newDriver);

    this.onCancel();
  }
  
  getDriversCtrl(){
    return (<FormArray>this.driverForm.get('cars')).controls;
  }

  onDeleteCar(index: number) {
    (<FormArray>this.driverForm.get('cars')).removeAt(index);
  }

	makeCurrentCar(index: number) {
		this.formCurrentCar = index;
	}

  onAddCar() {
    (<FormArray>this.driverForm.get('cars')).push(
            new FormGroup({
              'model': new FormControl(null, Validators.required),
              'year': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
			  'brand': new FormControl(null, Validators.required),
			  'color': new FormControl(null, Validators.required)              
            })
            )
  }

  onCancel() {
    this.router.navigate(["./../.."], {relativeTo: this.route})
  }


}
