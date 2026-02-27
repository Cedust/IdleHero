import { Injectable, inject, signal } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private router = inject(Router);

  public readonly LoadedExistingSaveGame = signal(false);
  public readonly CurrentArea = signal<'Town' | 'Dungeon'>('Dungeon');

  public SwitchAreaTo(area: 'Town' | 'Dungeon'): void {
    this.CurrentArea.set(area);
    this.router.navigate([`/game/${area.toLowerCase()}`]);
  }
}
