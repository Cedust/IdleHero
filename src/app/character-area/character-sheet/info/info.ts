import { HeroService, LevelService, StatsService } from '../../../../shared/services';

import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info {
  constructor(
    protected heroService: HeroService,
    protected statsService: StatsService,
    protected levelService: LevelService
  ) {}

  get SummaryStats(): { label: string; value: string }[] {
    return [
      {
        label: 'Attack Power',
        value: this.statsService.AttackPower().toString()
      },
      {
        label: 'Unspent Skill Points',
        value:
          this.levelService.TotalSkillPoints() > 0
            ? this.levelService.UnspentSkillPoints() + ' / ' + this.levelService.TotalSkillPoints()
            : '-'
      }
    ];
  }
}
