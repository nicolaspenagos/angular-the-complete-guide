import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    userService = fixture.debugElement.injector.get(UserService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display the user name if user is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      component.user.name
    );
  });

  it("should't display the user name if user is logged in", () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(
      component.user.name
    );
  });

  it("should't fetch data succesfully if not called asynchronously", () => {
    const dataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toBe(undefined);
  });

  // Mocking and testing async tasks
  it('should fetch data succesfully if called synchronously', waitForAsync(() => {
    const dataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, 'getDetails').and.returnValue(
      Promise.resolve('Data')
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toBe('Data');
    });
  }));

  // Get rid of the whenStable (not working as expected)
  // it('should fetch data succesfully if called synchronously', fakeAsync(() => {
  //   const dataService = fixture.debugElement.injector.get(DataService);
  //   spyOn(dataService, 'getDetails').and.returnValue(
  //     Promise.resolve('Data')
  //   );
  //   fixture.detectChanges();
  //   // In a fake asycn envioroment, finsihed all async tasks now
  //   tick();
  //   expect(component.data).toBe('Data');
  // }));
});
