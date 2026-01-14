import { ENCHANTING_CONFIG } from '../../constants';
import { Enchantment } from './enchantment';

export class EnchantmentSlot {
  public readonly Name: string;
  public Level: number = ENCHANTING_CONFIG.LEVEL.UNENCHANTED;
  public Enchantment: Enchantment | undefined = undefined;

  constructor(public Id: number) {
    this.Name = `Slot ${Id}`;
  }

  public get IsEnchanted(): boolean {
    return this.Level > ENCHANTING_CONFIG.LEVEL.UNENCHANTED;
  }

  public get CanUpgrade(): boolean {
    return this.IsEnchanted && this.Level < ENCHANTING_CONFIG.LEVEL.MAX;
  }

  public Enchant(enchantment: Enchantment, gearLevel: number) {
    this.Enchantment = enchantment;
    this.Level = ENCHANTING_CONFIG.LEVEL.BASE;

    // Apply gear upgrades to the new enchantment
    for (let i = 1; i < gearLevel; i++) {
      this.GearUpgrade(ENCHANTING_CONFIG.UPGRADE.STAT_MODIFIER);
    }
  }

  public Reroll(enchantment: Enchantment, gearLevel: number) {
    this.Enchant(enchantment, gearLevel);
  }

  public Upgrade() {
    if (!this.CanUpgrade) {
      return;
    }

    this.UpgradeEnchantmentValue(ENCHANTING_CONFIG.UPGRADE.STAT_MODIFIER);
    this.Level++;
  }

  public GearUpgrade(modifier: number) {
    if (!this.IsEnchanted) {
      return;
    }

    this.UpgradeEnchantmentValue(modifier);
  }

  private UpgradeEnchantmentValue(modifier: number) {
    // Decimal number values
    if (this.Enchantment!.Value < 1) {
      this.Enchantment!.Value = Math.ceil(this.Enchantment!.Value * modifier * 100) / 100;
    }
    // Whole number values
    else {
      this.Enchantment!.Value = Math.ceil(this.Enchantment!.Value * modifier);
    }
  }
}
