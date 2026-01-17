import { CurrencyService, HeroService } from '../../../shared/services';

import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Gold } from '../../../shared/components';

@Component({
  selector: 'app-info-area',
  imports: [DecimalPipe, Gold],
  templateUrl: './info-area.html',
  styleUrl: './info-area.scss'
})
export class InfoArea {
  protected get GoldAmount(): number {
    return this.currencyService.Gold();
  }

  protected get PrestigeLevel(): number {
    return this.heroService.PrestigeLevel();
  }

  protected get MaxStage(): number {
    return this.heroService.HighestStageReached();
  }

  protected get MaxDamageDealt(): number {
    return this.heroService.HighestDamageDealt();
  }

  constructor(
    private currencyService: CurrencyService,
    private heroService: HeroService
  ) {}
}
