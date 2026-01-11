export class Gold {
  private static BASE_GOLD_REWARD = 10;
  private static GOLD_GROWTH_RATE = 0.15;

  public static GetForStage(stage: number): number {
    // Formula: Base + (Stage - 1) * GrowthRate
    return Math.round(
      this.BASE_GOLD_REWARD + (stage - 1) * this.BASE_GOLD_REWARD * this.GOLD_GROWTH_RATE
    );
  }
}
