import { GearType } from '../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemPriceService {
  constructor() {}

  public GetBuyPrice(itemSlot: GearType): number {
    switch (itemSlot) {
      case GearType.Weapon:
        return 100;
      case GearType.Shield:
        return 80;
      case GearType.Head:
        return 50;
      case GearType.Chest:
        return 20;
      case GearType.Legs:
        return 30;
      case GearType.Boots:
        return 30;
      default:
        return 0;
    }
  }
}
