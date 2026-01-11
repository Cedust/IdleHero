import { Component, Input } from '@angular/core';
import { EnchantmentSlot, Gear, GearType } from '../../../shared/models';
import { GearSlotIconName, IconComponent, Separator } from '../../../shared/components';

import { EnchantingService } from '../../../shared/services';

@Component({
  selector: 'app-enchanting',
  imports: [IconComponent, Separator],
  templateUrl: './enchanting.html',
  styleUrl: './enchanting.scss'
})
export class Enchanting {
  @Input({ required: true }) item!: Gear;

  ngOnChanges() {
    this.Unselect();
  }

  protected get GearIcon(): GearSlotIconName {
    switch (this.item.Type) {
      case GearType.Weapon:
        return 'sword';
      case GearType.Shield:
        return 'shield';
      case GearType.Head:
        return 'head';
      case GearType.Chest:
        return 'chest';
      case GearType.Legs:
        return 'legs';
      case GearType.Boots:
        return 'boots';
    }
  }

  protected get CanEnchant(): boolean {
    return this.selectedSlot !== null && !this.selectedSlot.IsEnchanted;
  }

  protected get CanDisenchant(): boolean {
    return this.selectedSlot !== null && this.selectedSlot.IsEnchanted;
  }

  protected get CanUpgrade(): boolean {
    return this.selectedSlot !== null && this.selectedSlot.CanUpgrade;
  }

  protected selectedSlot: EnchantmentSlot | null = null;
  protected selectedSlotIndex: number | null = null;

  constructor(private enchantingService: EnchantingService) {}

  protected OnEnchantmentSlotSelected(slot: EnchantmentSlot, index: number) {
    this.selectedSlot = slot;
    this.selectedSlotIndex = index;
  }

  private Unselect() {
    this.selectedSlot = null;
    this.selectedSlotIndex = null;
  }

  protected GetSlotDescription(slot: EnchantmentSlot): string {
    if (slot.IsEnchanted) {
      return slot.Enchantment.DisplayName + ' ' + '[' + slot.EnchantmentLevel + ']';
    } else {
      return slot.Name;
    }
  }

  protected Enchant(): void {
    this.enchantingService.Enchant(this.item, this.selectedSlotIndex!);
  }

  protected Disenchant(): void {
    this.enchantingService.Disenchant(this.item, this.selectedSlotIndex!);
  }

  protected Upgrade(): void {
    this.enchantingService.Upgrade(this.item, this.selectedSlotIndex!);
  }
}
