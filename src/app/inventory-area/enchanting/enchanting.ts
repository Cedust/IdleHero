import { Component, Input } from '@angular/core';
import { EnchantmentSlot, Gear, GearType } from '../../../shared/models';
import { GearSlotIconName, IconComponent, Separator } from '../../../shared/components';

@Component({
  selector: 'app-enchanting',
  imports: [IconComponent, Separator],
  templateUrl: './enchanting.html',
  styleUrl: './enchanting.scss'
})
export class Enchanting {
  @Input({ required: true }) item!: Gear;

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

  protected onEnchantmentSlotSelected(slot: EnchantmentSlot, index: number) {
    this.selectedSlot = slot;
    this.selectedSlotIndex = index;
  }

  protected GetSlotDescription(slot: EnchantmentSlot): string {
    if (slot.IsEnchanted) {
      return '+' + slot.Value + ' ' + slot.Type + ' ' + '[' + slot.EnchantmentLevel + ']';
    } else {
      return slot.Name;
    }
  }

  protected Enchant(): void {
    this.item.EnchantmentSlots[this.selectedSlotIndex!].Enchant('Strength', 10);
  }

  protected Disenchant(): void {
    this.item.EnchantmentSlots[this.selectedSlotIndex!].Disenchant();
  }

  protected Upgrade(): void {
    this.item.EnchantmentSlots[this.selectedSlotIndex!].Upgrade();
  }
}
