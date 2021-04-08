import { TestBed } from '@angular/core/testing';
import { PickupsService } from './pickups.service';
import { Pickup } from './pickup.model'
import { DriversService } from '../drivers/drivers.service';
import { Driver } from '../drivers/drivers.model'

import { AngularFireDatabase } from '@angular/fire/database'



describe('pickupsService', () => {
  let pickupsService: PickupsService;
  let dbServiceSpy: jasmine.SpyObj<AngularFireDatabase>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AngularFireDatabase', ['list']);

    TestBed.configureTestingModule({ providers: [PickupsService, DriversService, {provide: AngularFireDatabase, useValue: spy}] });
    pickupsService = TestBed.inject(PickupsService)
    dbServiceSpy = TestBed.inject(AngularFireDatabase) as jasmine.SpyObj<AngularFireDatabase>
  });

  it('#RequestPickup', () => {
    expect(pickupsService.getPickups().length).toBe(0)
    pickupsService.addPickup(new Pickup({lat: 0, lng: 0}, new Date()))
    expect(pickupsService.getPickup(0).status).toBe('unclaimed')
  })


  it('#ViewPickup', () => {
    pickupsService.addPickup(new Pickup({lat: 0, lng: 0}, new Date()))
    expect(pickupsService.getPickup(0).status).toBe('unclaimed')
  })

  it('#ClaimPickup', () => {
    pickupsService.addPickup(new Pickup({lat: 0, lng: 0}, new Date()))
    expect(pickupsService.getPickup(0).status).toBe('unclaimed')

    let driversService = TestBed.inject(DriversService)
    driversService.addDrivers(new Driver('test@email.com', 'test123', 'Active'))

    pickupsService.claimPickup(0, '0')
    expect(pickupsService.getPickup(0).driver).toBe('0')

    expect(driversService.getDriver('0').email).toBe('test@email.com')

    let driver = driversService.getDriver(pickupsService.getPickup(0).driver)
    driver.lkl = {lat: 17.1581323, lng: -89.06569329999999}
    driversService.updateDriver(0, driver)

    expect(driversService.getDriver(pickupsService.getPickup(0).driver).lkl.lat).toBe(17.1581323)
    expect(driversService.getDriver(pickupsService.getPickup(0).driver).lkl.lng).toBe(-89.06569329999999)

  })

  it('Below Will Fail #####', () => {
    fail()
  })

  it('#ViewPickup WrongId', () => {
    pickupsService.addPickup(new Pickup({lat: 0, lng: 0}, new Date()))
    expect(pickupsService.getPickup(1).status).toBe('unclaimed')
  })

});
