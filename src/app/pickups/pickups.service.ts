import { Injectable } from '@angular/core';
import { map, tap, toArray } from 'rxjs/operators'

import { Pickup } from './pickup.model';
import { Subject, Observable } from 'rxjs'

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class PickupsService {
	pickupsChanged = new Subject<Pickup[]>();

	dbPickups: Observable<any[]>;
	private pickups: Pickup[] = [];


	constructor(private db: AngularFireDatabase) {

	}

	initOb() {
		this.dbPickups = this.db.list('pickups').snapshotChanges().pipe(
			map(pickups=>
				pickups.map(p => {
					let k = { ...p.payload.val() as Pickup}
					let x : Pickup = { id: p.payload.key, ...k }
					x.dateTimeSeconds = (new Date(x.dateTime).valueOf())
					return (
						x
					)}
					
				)
			)
			);
	}

	getAllPickups(){
		return this.db.list('pickups').snapshotChanges()
		.pipe(
			map(pickups=>
				pickups.map(p => {
					let k = { ...p.payload.val() as Pickup}
					let x : Pickup = { id: p.payload.key, ...k }
					x.dateTimeSeconds = (new Date(x.dateTime).valueOf())
					return (
						x
					)}
				)
			)
			)
	}

	getPick(id: string){

		return this.db.list('pickups/'+id).snapshotChanges()
	}

	getUnclaimedPickups() : Observable<any[]>{
		return this.db.list('pickups').snapshotChanges().pipe(
			map(pickups=>
				pickups.map(p => {
					let k = { ...p.payload.val() as Pickup}
					let x : Pickup = { id: p.payload.key, ...k }
					x.dateTimeSeconds = (new Date(x.dateTime).valueOf())
					return (
						x
					)}
				)
			),
  			map((pick) => pick.filter((p) => p.status == 'unclaimed')),
			)
	}

	setPickups(pickups: Pickup[]){
		this.pickups = pickups;
		console.log(this.pickups.valueOf())
		this.pickupsChanged.next(this.pickups.slice());
	}

	getRef(id: string) {
		let pickup;
		return this.db.list('pickups/'+id).snapshotChanges().pipe(			
				tap(s => {console.log(s); pickup = s; return pickup})
			)
		
	}

	getPickups() {
		return this.pickups.slice();
	}

	getPickup(id: number) : Pickup {

		return this.pickups[id];
	}

	claimPickup(id:number, driverid: string) {
		this.pickups[id].status = 'claimed';
		this.pickups[id].driver = driverid
		this.pickupsChanged.next(this.pickups.slice());	
	}

	addPickup(pickup: Pickup) {
		this.pickups.push(pickup);
		this.pickupsChanged.next(this.pickups.slice());
	}

	updatePickup(index: number, pickup: Pickup) {
		this.pickups[index] = pickup;
		this.pickupsChanged.next(this.pickups.slice());
	}

	deletePickup(index: number) {
		this.pickups.splice(index, 1);
		this.pickupsChanged.next(this.pickups.slice());
	}


}