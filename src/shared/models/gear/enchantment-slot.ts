import { StatType } from '../stats/stat-type';

export class EnchantmentSlot {
  private readonly MAX_ENCHANTMENT_LEVEL = 5;
  private readonly ENCHANTMENT_MODIFIER = 0.2;

  public get IsEnchanted(): boolean {
    return this.EnchantmentLevel > 0;
  }

  public get CanUpgrade(): boolean {
    return this.IsEnchanted && this.EnchantmentLevel < this.MAX_ENCHANTMENT_LEVEL;
  }

  public EnchantmentLevel: number = 0;
  public Type!: StatType;
  public Value: number = 0;

  constructor(public Name: string) {}

  public Enchant(stat: StatType, value: number) {
    if (this.IsEnchanted) {
      return;
    }

    this.Type = stat;
    this.Value = value;
    this.EnchantmentLevel = 1;
  }

  public Disenchant() {
    this.Type = undefined!;
    this.Value = 0;
    this.EnchantmentLevel = 0;
  }

  public Upgrade() {
    if (this.CanUpgrade) {
      this.Value += Math.ceil(this.Value * this.ENCHANTMENT_MODIFIER);
      this.EnchantmentLevel++;
    }
  }
}
