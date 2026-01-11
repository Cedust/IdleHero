export class AttackSpeed {
  private static readonly BASE_ATTACK_SPEED: number = 1;
  private static readonly ATTACK_SPEED_PER_DEXTERITY: number = 0.01;

  /**
   * Berechnet die Angriffe pro Sekunde (APS)
   */
  public static Calculate(dexterity: number, bonus: number, modifier: number = 1): number {
    // // Formula: Base + (Faktor * (Dexterity - 1)) * Bonus * Modifier
    // return (
    //   (AttackSpeed.BASE_ATTACK_SPEED + AttackSpeed.ATTACK_SPEED_PER_DEXTERITY * (dexterity - 1)) *      (1 + bonus) *      modifier
    // );

    // 1. Dexterity Bonus berechnen (1% Speed pro Punkt)
    const dexBonus = (dexterity - 1) * AttackSpeed.ATTACK_SPEED_PER_DEXTERITY;

    // 2. Additive Boni zusammenrechnen (IAS - Increased Attack Speed)
    // Dex und Gear werden meist addiert, um extremen Power-Creep zu vermeiden
    const totalAdditiveBonus = 1 + dexBonus + bonus;

    // 3. Multiplikatoren anwenden
    const finalAps = AttackSpeed.BASE_ATTACK_SPEED * totalAdditiveBonus * modifier;

    return Number(finalAps.toFixed(2));
  }
}
