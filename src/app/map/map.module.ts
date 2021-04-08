import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map.component';

@NgModule({
	declarations: [MapComponent],
	imports: [
		GoogleMapsModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([
				{ path: '', component: MapComponent}
			])
	]
})

export class MapModule {}