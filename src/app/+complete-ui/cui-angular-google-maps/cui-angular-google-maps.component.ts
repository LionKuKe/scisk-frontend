import { Component } from '@angular/core';

@Component({
  selector: 'cui-angular-google-maps', // tslint:disable-line
  templateUrl: './cui-angular-google-maps.component.html',
  styles: [`
    :host ::ng-deep agm-map {
      height: 300px;
      width: 100%;
    }
  `]
})
export class CuiAngularGoogleMapsComponent {
  lat = -12.043333;
  lng = -77.028333;
}
