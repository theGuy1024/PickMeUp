import { TestBed } from '@angular/core/testing';
import { DriversService } from './drivers.service';
import { Driver } from './drivers.model'

describe('DriversService', () => {
  let driversService: DriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DriversService] });
    driversService = TestBed.inject(DriversService)
  });

  it('#AddDriver', () => {
    expect(driversService.getDrivers().length).toBe(0)
    driversService.addDrivers(new Driver('test@email.com', 'test123', 'Active'))
    expect(driversService.getDriver('0').email).toBe('test@email.com')
  })

  it('#DeleteDriver', () => {
    driversService.addDrivers(new Driver('test@email.com', 'test123', 'Active'))
    expect(driversService.getDriver('0').email).toBe('test@email.com')
    driversService.deleteDriver(0)
    expect(driversService.getDrivers().length).toBe(0)
  })

  it('#UpdateDriver', () => {
    driversService.addDrivers(new Driver('test@email.com', 'test123', 'Active'))
    expect(driversService.getDriver('0').email).toBe('test@email.com')
    driversService.updateDriver(0, new Driver('another@email.com', 'another', 'Disabled'))
    expect(driversService.getDriver('0').email).toBe('another@email.com')
  })

  it('#GetDriver', () => {
    driversService.addDrivers(new Driver('test@email.com', 'test123', 'Active'))
    expect(driversService.getDriver('0').email).toBe('test@email.com')
  })

  it('#GetDriverLocation', () => {
    let d = new Driver('test@email.com', 'test123', 'Active')
    d.lkl = {lat: 17.1581323, lng: -89.06569329999999}
    driversService.addDrivers(d)

    expect(driversService.getDriver('0').lkl).toEqual({lat: 17.1581323, lng: -89.06569329999999})
  })

  it('Below Will Fail #####', () => {
    fail()
  })

  it('#AddDriver Missing Information', () => {
    expect(driversService.getDrivers().length).toBe(0)
    driversService.addDrivers(new Driver('', 'test123', 'Active'))
    expect(driversService.getDriver('0').email).toBe('test@email.com')
  })

  it('#UpdateDriver Missing Information', () => {
    driversService.addDrivers(new Driver('test@email.com', 'test123', 'Active'))
    expect(driversService.getDriver('0').email).toBe('test@email.com')
    driversService.updateDriver(0, new Driver('', 'another', 'Disabled'))
    expect(driversService.getDriver('0').email).toBe('another@email.com')
  })

  it('#GetDriverLocation User Denies Access', () => {
    let d = new Driver('test@email.com', 'test123', 'Active')
    driversService.addDrivers(d)

    expect(driversService.getDriver('0').lkl).toEqual({lat: 17.1581323, lng: -89.06569329999999})
  })
});
