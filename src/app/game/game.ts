import { AppStateService, GameService, MenuService } from '../../shared/services';
import { Component, inject, signal } from '@angular/core';
import { IconComponent, TabDefinition, TabStrip } from '../../shared/components';

import { CharacterArea } from './character-area/character-area';
import { CharacterLoadout } from './character-loadout/character-loadout';
import { CombatState } from '../../core/systems/combat';
import { InfoArea } from './info-area/info-area';
import { Menu } from './menu/menu';
import { RouterOutlet } from '@angular/router';
import { StatisticsFlyout } from './statistics-flyout/statistics-flyout';

@Component({
  selector: 'app-game',
  imports: [
    CharacterArea,
    Menu,
    InfoArea,
    RouterOutlet,
    IconComponent,
    TabStrip,
    CharacterLoadout,
    StatisticsFlyout
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  private appState = inject(AppStateService);
  private gameService = inject(GameService);
  private menuService = inject(MenuService);
  private combatState = inject(CombatState);

  protected readonly title = this.gameService.Title;
  protected readonly currentArea = this.appState.CurrentArea;

  // Tabs
  protected get Tabs(): TabDefinition[] {
    return [
      { id: 'character', label: 'CHARACTER', disabled: false },
      { id: 'loadout', label: 'LOADOUT', disabled: false }
    ];
  }

  protected SelectedTab = signal<TabDefinition['id']>('character');

  protected onTabSelected(tabId: TabDefinition['id']): void {
    this.SelectedTab.set(tabId);
  }

  // UI State
  protected get IsMenuOpen(): boolean {
    return this.menuService.IsMenuOpen();
  }

  protected get CanSwitchArea(): boolean {
    return !this.combatState.InProgress();
  }

  SwitchArea() {
    const switchTo = this.appState.CurrentArea() === 'Town' ? 'Dungeon' : 'Town';
    this.appState.SwitchAreaTo(switchTo);
    if (switchTo === 'Town') this.combatState.Leave();
  }
}
