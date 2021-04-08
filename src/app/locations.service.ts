import { Injectable } from '@angular/core';

import { Loc } from './locations.model';
import { Subject } from 'rxjs'

@Injectable()
export class LocationsService {
	locationsChanged = new Subject<Loc[]>();

	private locations: Loc[] = [];

	constructor() {}

	setLocations(locations: Loc[]){
		this.locations = locations;
		this.locationsChanged.next(this.locations.slice());
	}

	getLocations() {
		return this.locations.slice();
	}

	getLocation(id: number) : Loc {

		return this.locations[id];
	}

	addLocation(location: Loc) {
		this.locations.push(location);
		this.locationsChanged.next(this.locations.slice());
	}

	updateLocation(index: number, location: Loc) {
		this.locations[index] = location;
		this.locationsChanged.next(this.locations.slice());
	}

	deleteLocation(index: number) {
		this.locations.splice(index, 1);
		this.locationsChanged.next(this.locations.slice());
	}


}