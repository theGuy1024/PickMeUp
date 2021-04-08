import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MapModule } from './map/map.module'
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';

import { AppComponent } from './app.component';
import { LocationsService } from './locations.service';
import { DriversService } from './drivers/drivers.service'
import { DriversModule } from './drivers/drivers.module'
import { DriverStorageService } from './drivers/drivers-database.service'
import { PickupsModule } from './pickups/pickups.module'
import { PickupsService } from './pickups/pickups.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MapModule,
    DriversModule,
    FormsModule,
    PickupsModule,
    ReactiveFormsModule,      
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

  ],
  providers: [LocationsService, DriversService, DriverStorageService, PickupsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

