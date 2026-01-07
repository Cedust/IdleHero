import { TimeoutUtils } from '../utils';

export class Level {
  private static readonly BASE_EXPERIENCE_TO_NEXT_LEVEL = 100;
  private static readonly EXPERIENCE_GROWTH_RATE = 1.15;
  private static readonly SKILL_POINTS_PER_LEVEL = 1;

  public Current: number = 1;
  public Experience: number = 0;
  public ExperienceToNextLevel: number = Level.BASE_EXPERIENCE_TO_NEXT_LEVEL;

  public UnspentSkillPoints: number = 0;

  constructor(private levelUpDelay: number) {}

  public async GainExperience(amount: number): Promise<void> {
    this.Experience += amount;

    while (this.Experience >= this.ExperienceToNextLevel) {
      await TimeoutUtils.wait(this.levelUpDelay);

      const currentExp = this.Experience;

      this.LevelUp();

      await TimeoutUtils.wait(this.levelUpDelay);

      this.SetNextLevelExperience(currentExp);
    }
  }

  private LevelUp(): void {
    this.Experience = 0;
    this.Current += 1;
    this.UnspentSkillPoints += Level.SKILL_POINTS_PER_LEVEL;
  }

  private SetNextLevelExperience(currentExp: number): void {
    this.Experience = currentExp - this.ExperienceToNextLevel;

    this.ExperienceToNextLevel = Math.round(
      this.ExperienceToNextLevel * Level.EXPERIENCE_GROWTH_RATE
    );
  }
}
