import { Gear, GearType } from '../models';

import { Injectable } from '@angular/core';
import { InventoryService } from './inventory.service';
import { ItemPriceService } from './item-price.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private DEFAULT_SELL_MULTIPLIER = 0.5;
  private DEFAULT_SLOT_AMOUNT = 3;

  constructor(
    private inventoryService: InventoryService,
    private itemPriceService: ItemPriceService
  ) {}

  public BuyItem(slot: GearType) {
    const price = this.itemPriceService.GetBuyPrice(slot);
    if (this.inventoryService.Gold() >= price) {
      this.inventoryService.Gold.update((gold) => gold - price);

      const sellValue = this.CalculateSellValue(price);
      const item = new Gear(slot, this.DEFAULT_SLOT_AMOUNT, sellValue);

      this.inventoryService.SetGearForSlot(slot, item);
    }
  }

  public SellItem(slot: GearType) {
    const gear = this.inventoryService.GetGearForSlot(slot);

    if (gear !== null) {
      this.inventoryService.Gold.update((gold) => gold + gear.SellValue);
      this.inventoryService.SetGearForSlot(slot, null as any);
    }
  }

  private CalculateSellValue(price: number): number {
    return Math.floor(price * this.DEFAULT_SELL_MULTIPLIER);
  }
}
