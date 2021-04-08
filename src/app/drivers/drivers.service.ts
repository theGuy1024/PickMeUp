import { Injectable } from '@angular/core';

import { Loc } from '../locations.model';
import { Driver } from './drivers.model'
import { Car } from './car.model'
import { Subject } from 'rxjs'

@Injectable()
export class DriversService {
	driversChanged = new Subject<Driver[]>();

	currentDriverId = 0;
	private drivers: Driver[] = [];

	constructor() {}

	setDrivers(drivers: Driver[]){
		this.drivers = drivers;
		this.driversChanged.next(this.drivers.slice());
	}

	getDrivers() {
		return this.drivers.slice();
	}

	getDriver(id: string) : Driver {

		return this.drivers[id];
	}

	getDriverLocation(id:string): {lat: number, lng: number}{
		return this.drivers[0].lkl;
	}

	addDrivers(driver: Driver) {
		this.drivers.push(driver);
		this.driversChanged.next(this.drivers.slice());
	}

	updateDriver(index: number, driver: Driver) {
		this.drivers[index] = driver;
		this.driversChanged.next(this.drivers.slice());
	}


	deleteDriver(index: number) {
		this.drivers.splice(index, 1);
		this.driversChanged.next(this.drivers.slice());
	}


}