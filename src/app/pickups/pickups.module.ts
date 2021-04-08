import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PickupsComponent } from './pickups.component';
import { PickupComponent } from './pickup/pickup.component';

@NgModule({
	declarations: [PickupsComponent, PickupComponent],
	imports: [
		CommonModule,
		FormsModule,
		GoogleMapsModule,
		ReactiveFormsModule,
		RouterModule.forChild([
				{ path: '', component: PickupsComponent},
				{ path: ':id', component: PickupComponent},
			])
	]
})

export class PickupsModule {}

