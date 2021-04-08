import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DriverComponent } from './drivers.component';
import { DriverEditComponent } from './driverEdit/driver-edit.component'

@NgModule({
	declarations: [DriverComponent, DriverEditComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([
				{ path: '', component: DriverComponent},
				{ path: ':id/edit', component: DriverEditComponent},
			])
	]
})

export class DriversModule {}

