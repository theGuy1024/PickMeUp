import { Loc } from "../locations.model"
export class Pickup {
	public id?: string;
	public cust?: string;
	public driver?: string;
	public dateTime: Date;
	public dateTimeSeconds?: number;
	public status: string;
	public dropOffStatus?: string;
	public rating?: string;
	public location: Loc;

	constructor(location: Loc, dateTime: Date){
		this.location = location;
		this.dateTime = dateTime;
		this.status = "unclaimed"		
	}
}