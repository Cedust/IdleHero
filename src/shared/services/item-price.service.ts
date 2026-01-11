import { Boots, Chest, GearType, Head, Legs, Shield, Weapon } from '../models';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemPriceService {
  constructor() {}

  public GetBuyPrice(itemSlot: GearType): number {
    switch (itemSlot) {
      case GearType.Weapon:
        return Weapon.BuyPrice;
      case GearType.Shield:
        return Shield.BuyPrice;
      case GearType.Head:
        return Head.BuyPrice;
      case GearType.Chest:
        return Chest.BuyPrice;
      case GearType.Legs:
        return Legs.BuyPrice;
      case GearType.Boots:
        return Boots.BuyPrice;
      default:
        return 0;
    }
  }
}
