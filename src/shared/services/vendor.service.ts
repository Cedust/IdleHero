import { Gear, GearType } from '../models';

import { Injectable } from '@angular/core';
import { InventoryService } from './inventory.service';
import { ItemPriceService } from './item-price.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(
    private inventoryService: InventoryService,
    private itemPriceService: ItemPriceService
  ) {}

  public BuyItem(slot: GearType) {
    const price = this.itemPriceService.GetBuyPrice(slot);

    if (this.inventoryService.Gold() >= price) {
      this.inventoryService.Gold.update((gold) => gold - price);

      const item = Gear.Create(slot);

      this.inventoryService.SetGearForSlot(slot, item);
    }
  }

  public SellItem(slot: GearType) {
    const gear = this.inventoryService.GetGearForSlot(slot);

    if (gear !== null) {
      this.inventoryService.Gold.update((gold) => gold + gear.SellValue);
      this.inventoryService.RemoveGearFromSlot(slot);
    }
  }
}
