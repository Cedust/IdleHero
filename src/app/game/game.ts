import { Component, signal } from '@angular/core';
import { TabDefinition, TabStrip } from '../../shared/components';

import { CharacterArea } from './character-area/character-area';
import { GameArea } from './game-area/game-area';
import { InfoArea } from './info-area/info-area';
import { InventoryArea } from './inventory-area/inventory-area';
import { Menu } from './menu/menu';
import { MenuService } from '../../shared/services';
import { SkillTree } from './skill-tree/skill-tree';

@Component({
  selector: 'app-game',
  imports: [GameArea, CharacterArea, InventoryArea, Menu, InfoArea, SkillTree, TabStrip],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  protected readonly title = signal('Idle Hero');

  protected get IsMenuOpen(): boolean {
    return this.menuService.IsMenuOpen();
  }

  protected get Tabs(): TabDefinition[] {
    return [
      { id: 'inventory', label: 'INVENTORY', disabled: false },
      { id: 'skills', label: 'SKILLS', disabled: true },
      { id: 'crafting', label: 'CRAFTING', disabled: true }
    ];
  }

  protected SelectedTab = signal<TabDefinition['id'] | null>('inventory');

  constructor(private menuService: MenuService) {}

  protected onTabSelected(tabId: TabDefinition['id']): void {
    this.SelectedTab.set(tabId);
  }
}
