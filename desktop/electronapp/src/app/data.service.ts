import { Injectable } from '@angular/core';
import { Scheme } from './scheme';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public editScheme : Scheme;
  public editFormat : String;
  DeviceArary =[];

  
  constructor() { }

  
}
