import { CharactersIconName, IconComponent } from '../../../../shared/components';
import { Component, computed, inject } from '@angular/core';

import { GameStateService } from '../../../../shared/services';
import { Info } from './info/info';
import { PlayerHeroService } from '../../../../core/services';

@Component({
  selector: 'app-character-sheet',
  imports: [Info, IconComponent],
  templateUrl: './character-sheet.html',
  styleUrl: './character-sheet.scss'
})
export class CharacterSheet {
  private readonly heroService = inject(PlayerHeroService);
  private readonly gameState = inject(GameStateService);

  protected get HeroIcon(): CharactersIconName {
    return this.heroService.CharacterIcon();
  }

  public readonly IsGameCompleted = computed<boolean>(() => this.gameState.IsGameCompleted());
}
