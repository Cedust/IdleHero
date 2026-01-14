import {
  Boots,
  Chest,
  EnchantmentSlot,
  Gear,
  GearType,
  Head,
  Legs,
  Shield,
  Weapon
} from '../models';
import { ENCHANTING_CONFIG, GEAR_CONFIG } from '../constants';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemPriceService {
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

  public IncreaseSellValue(item: Gear, amount: number) {
    item.SellValue += Math.floor(amount * GEAR_CONFIG.PRICES.SELLVALUE_MULTIPLIER);
  }

  public GetGearUpgradeCost(item: Gear): number {
    return item.Level * GEAR_CONFIG.COSTS.UPGRADE_COST_PER_LEVEL;
  }

  public GetEnchantmentCost(item: Gear): number {
    return (
      (item.SlotAmount - item.Slots.filter((e) => !e.IsEnchanted).length + 1) *
      ENCHANTING_CONFIG.COSTS.ENCHANT_COST
    );
  }

  public GetRerollCost(): number {
    return ENCHANTING_CONFIG.COSTS.REROLL_COST;
  }

  public GetUpgradeCost(slot: EnchantmentSlot): number {
    return slot.Level * ENCHANTING_CONFIG.COSTS.UPGRADE_COST_PER_LEVEL;
  }
}
