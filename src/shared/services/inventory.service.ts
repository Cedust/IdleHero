import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  public Gold = signal<number>(1337);

  constructor() {}
}
