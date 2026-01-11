import { EnchantmentSlot } from './enchantment-slot';
import { GearType } from './gear-type';

export class Gear {
  public readonly EnchantmentSlots: EnchantmentSlot[] = [];

  constructor(
    public Type: GearType,
    public SlotAmount: number,
    public SellValue: number
  ) {
    for (let i = 0; i < SlotAmount; i++) {
      this.EnchantmentSlots.push(new EnchantmentSlot(`Slot ${i + 1}`));
    }
  }
}
